import Fastify from "fastify";
import { renderToStream } from "@ssr-tools/core/renderToStream";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { webpackConfig } from "./config/webpackConfig";
import { URL } from "url";
import { Document } from "./components/Document.server";

import { Providers } from "./components/Providers.server";
import { fetchManifest } from "@ssr-tools/core/fetchManifest";
import { App } from "./components/App";
import { renderToStaticMarkup } from "react-dom/server";
import { ErrorOccurred } from "./pages/ErrorOccurred";

let manifestCache: ReturnType<typeof fetchManifest> | null = null;

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCompress);

fastify.register(fastifyStatic, {
  root: webpackConfig.clientOutputPath,
  prefix: "/" + webpackConfig.assetsPrefix,
});

fastify.get("*", async (request, reply) => {
  const protocol = request.protocol;

  const appUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  const assetsUrl = new URL("/" + webpackConfig.assetsPrefix, appUrl);

  const manifestUrl = `${assetsUrl}/manifest.json`;

  manifestCache =
    process.env.NODE_ENV !== "development" && manifestCache
      ? manifestCache
      : fetchManifest(manifestUrl);

  const manifest = await manifestCache;

  if (!manifest) {
    return reply
      .type("text/html; charset=UTF-8")
      .status(500)
      .send(
        "<!DOCTYPE html>" +
          renderToStaticMarkup(
            <Document>
              <ErrorOccurred
                error={new Error(`Cannot load manifest from "${manifestUrl}"`)}
              />
            </Document>
          )
      );
  }

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
