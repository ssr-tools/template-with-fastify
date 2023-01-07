import { createWebpackConfig } from "@ssr-tools/core/createWebpackConfig";
import dotenv from "dotenv";

dotenv.config();

const appHost = process.env.HOST;

if (!appHost) {
  throw new Error("Missing env HOST");
}

const appPort = Number(process.env.PORT);

if (Number.isNaN(appPort)) {
  throw new Error("Missing or malformed env PORT");
}

export const webpackConfig = createWebpackConfig(({ resolvePath }) => ({
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  clientEntryPath: resolvePath(["src", "client.tsx"]),
  clientOutputPath: resolvePath(["dist", "client"]),
  serverEntryPath: resolvePath(["src", "server.tsx"]),
  serverOutputPath: resolvePath(["dist", "server"]),
  devServerPort: 8080,
  appHost,
  appPort,
  assetsPrefix: "public",
}));
