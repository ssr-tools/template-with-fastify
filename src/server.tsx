import Fastify from "fastify";
import { renderToStream } from "@ssr-tools/core/renderToStream";
import fastifyStatic from "@fastify/static";
import { webpackConfig } from "./config/webpackConfig";
import { URL } from "url";
import { Document } from "./components/Document.server";

import { Providers } from "./components/Providers.server";
import { fetchManifest } from "@ssr-tools/core/fetchManifest";
import { App } from "./components/App";
import { renderToStaticMarkup } from "react-dom/server";
import { ErrorOccured } from "./pages/ErrorOccured";

const fastify = Fastify({
  logger: true,
});

const staticAssetsPrefix = "/public";

fastify.register(fastifyStatic, {
  root: webpackConfig.clientOutputPath,
  prefix: staticAssetsPrefix,
});

fastify.get("*", async (request, reply) => {
  const appUrl = new URL(request.url, `http://${request.headers.host}`);

  const assetsUrl =
    process.env.NODE_ENV === "production"
      ? new URL(staticAssetsPrefix, appUrl)
      : `http://localhost:${webpackConfig.devServerPort}`;

  const manifestUrl = `${assetsUrl}/manifest.json`;

  manifestPromise =
    process.env.NODE_ENV !== "development" && manifestPromise
      ? manifestPromise
      : fetchManifest(manifestUrl);

  const manifest = await manifestPromise;

  if (!manifest) {
    return reply
      .type("text/html; charset=UTF-8")
      .status(500)
      .send(
        "<!DOCTYPE html>" +
          renderToStaticMarkup(
            <Document>
              <ErrorOccured
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
                  <ErrorOccured error={error} />
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
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

let manifestPromise: ReturnType<typeof fetchManifest> | null = null;
