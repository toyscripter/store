import * as esbuild from "npm:esbuild@^0.24.0";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.11.0";

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./mod.ts"],
  outfile: "./docs/dist/mod.esm.js",
  bundle: true,
  minify: true,
  sourcemap: true,
  format: "esm",
});

console.log(`mod.ts bundled.`);

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./docs/main.ts"],
  outfile: "./docs/dist/main.js",
  bundle: true,
  minify: true,
  sourcemap: true,
  format: "iife",
});

console.log(`docs/main.ts bundled.`);

esbuild.stop();