import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const source = await readFile(new URL("../components/seo/JsonLd.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
const exports = {};
new Function("require", "exports", compiled)(createRequire(import.meta.url), exports);

test("ürün açıklaması yapılandırılmış veri üzerinden sayfaya HTML ekleyemez", () => {
  const html = renderToStaticMarkup(React.createElement(exports.default, { type: "product", productData: { name: "Ürün", description: "</script><img src=x onerror=alert(1)>", image: "/photo.webp", price: "100", slug: "urun" } }));
  assert.equal(html.includes("<img"), false);
  assert.equal((html.match(/<script/g) || []).length, 3);
});
