import Fastify from "fastify";
import { renderToStream } from "@ssr-tools/core/renderToStream";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { webpackConfig } from "./config/webpackConfig";
import { URL } from "url";
import { Document } from "./components/Document.server";
import path from "path";
import dotenv from "dotenv";

import { Providers } from "./components/Providers.server";
import { loadManifest } from "@ssr-tools/core/loadManifest";
import { App } from "./components/App";
import { renderToStaticMarkup } from "react-dom/server";
import { ErrorOccurred } from "./pages/ErrorOccurred";

dotenv.config();

const assetsPrefix =
  webpackConfig.assetsPrefix instanceof URL
    ? webpackConfig.assetsPrefix.pathname
    : webpackConfig.assetsPrefix;

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCompress);

fastify.register(fastifyStatic, {
  root: webpackConfig.clientOutputPath,
  prefix: "/" + webpackConfig.assetsPrefix,
});

fastify.get("*", async (request, reply) => {
  const protocol =
    // When hosting the app on cloud application platform
    // (e.g. heroku or render.com) we won't get access to the original request,
    // since it's covered by internal network requests.
    // We can receive details like original request's protocol via
    // custom headers in this case: "x-forwarded-proto".
    request.headers["x-forwarded-proto"] ?? request.protocol;

  const appUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  const assetsUrl = new URL(assetsPrefix, appUrl);

  const manifestPath = path.join(
    webpackConfig.clientOutputPath,
    "manifest.json"
  );

  const manifest = await loadManifest(manifestPath);

  const mainScriptUrl = `${assetsUrl}/${manifest.main}`;

  const { stream, abort } = renderToStream({
    jsx: (
      <Providers url={appUrl}>
        <Document>
          <App />
        </Document>
      </Providers>
    ),
    pipeableStreamOptions: {
      bootstrapScripts: [mainScriptUrl.toString()],
      onShellError: (error) => {
        abort();
        reply
          .type("text/html; charset=UTF-8")
          .status(500)
          .send(
            "<!DOCTYPE html>" +
              renderToStaticMarkup(
                <Document>
                  <ErrorOccurred error={error} />
                </Document>
              )
          );
      },
    },
  });

  return reply.type("text/html; charset=UTF-8").send(stream);
});

(async () => {
  try {
    await fastify.listen({
      port: webpackConfig.appPort,
      host: webpackConfig.appHost,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
