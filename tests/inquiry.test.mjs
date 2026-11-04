import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../lib/inquiry.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const domain = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("bozuk oturum verisi müşterinin yeniden ürün seçmesini engellemez", () => {
  assert.equal(typeof domain.restoreDraft, "function", "ürün seçimini geri yükleme davranışı eksik");
  assert.deepEqual(domain.restoreDraft("bozuk veri"), { products: [], quantities: {}, concept: "" });
});

test("sayfa yenilendiğinde yalnızca bilinen ürünler ve seçili ürün adetleri geri gelir", () => {
  const stored = JSON.stringify({ products: ["magnet", "bilinmeyen", "magnet", "kapi-susu"], quantities: { magnet: "25", "kapi-susu": "", "pasta-susleri": "3" }, concept: "Mihrimah", name: "saklanmamalı" });
  assert.deepEqual(domain.restoreDraft(stored), { products: ["magnet", "kapi-susu"], quantities: { magnet: "25", "kapi-susu": "" }, concept: "Mihrimah" });
  assert.deepEqual(domain.restoreDraft("null"), { products: [], quantities: {}, concept: "" });
});

test("boş ve örnek telefon numaraları müşteriyi Instagram paylaşımına yönlendirir", () => {
  assert.equal(typeof domain.getContactTarget, "function");
  assert.deepEqual(domain.getContactTarget("", "Talebim"), { channel: "instagram", href: "https://www.instagram.com/portakalcicegi.atolye/" });
  assert.equal(domain.getContactTarget("905555555555", "Talebim").channel, "instagram");
});

test("kayıtlı telefon normalize edilir ve talep mesajı WhatsApp bağlantısında korunur", () => {
  const target = domain.getContactTarget("+90 (532) 123 45 67", "Mihrimah & özel istek\n25 magnet");
  assert.equal(target.channel, "whatsapp");
  assert.equal(new URL(target.href).pathname, "/905321234567");
  assert.equal(new URL(target.href).searchParams.get("text"), "Mihrimah & özel istek\n25 magnet");
  assert.equal(new URL(domain.getContactTarget("0532 123 45 67", "").href).pathname, "/905321234567");
  assert.equal(domain.getContactTarget("123", "").channel, "instagram");
});

test("talep mesajı yalnızca seçili ürünleri ve müşterinin belirttiği adetleri içerir", () => {
  assert.equal(typeof domain.buildInquiryMessage, "function");
  const message = domain.buildInquiryMessage({ products: ["magnet", "kapi-susu"], quantities: { magnet: "25", "pasta-susleri": "10" }, concept: "Mihrimah gibi" }, { name: "Ayşe", occasion: "Babyshower", date: "2026-12-15", phone: "", notes: "Pembe ve ay detayları" });
  assert.ok(message.includes("Magnet: 25 adet"));
  assert.ok(message.includes("Kapı süsü: Adet netleşecek"));
  assert.ok(message.includes("15.12.2026"));
  assert.ok(message.includes("Ayşe"));
  assert.ok(message.includes("Mihrimah gibi"));
  assert.ok(!message.includes("topper"));
  assert.ok(!message.includes("Telefon:"));
});

const fields = { name: "Ayşe", occasion: "Babyshower", date: "", phone: "", notes: "" };
test("ürün seçimi ve isim veya etkinlik eksikken paylaşılabilir talep oluşmaz", () => {
  assert.equal(typeof domain.validateInquiry, "function");
  const errors = domain.validateInquiry({ products: [], quantities: {}, concept: "" }, { ...fields, name: "  ", occasion: "" });
  assert.ok(errors.products);
  assert.ok(errors.name);
  assert.ok(errors.occasion);
});

test("adet boş bırakılabilir; girildiğinde pozitif tam sayı olmalıdır", () => {
  for (const quantity of ["0", "-1", "2.5", "abc", "99999999999999999999"]) {
    assert.ok(domain.validateInquiry({ products: ["magnet"], quantities: { magnet: quantity }, concept: "" }, fields).magnet, quantity);
  }
  for (const quantity of ["", "25", "1"]) {
    assert.deepEqual(domain.validateInquiry({ products: ["magnet"], quantities: { magnet: quantity, "kapi-susu": "-2" }, concept: "" }, fields), {});
  }
});

test("isteğe bağlı telefon boş kalabilir; girilirse geçerli uzunlukta olmalıdır", () => {
  const draft = { products: ["magnet"], quantities: {}, concept: "" };
  for (const phone of ["123", "abc", "+1234567890123456789"]) assert.ok(domain.validateInquiry(draft, { ...fields, phone }).phone);
  for (const phone of ["", "+90 (532) 123 45 67"]) assert.deepEqual(domain.validateInquiry(draft, { ...fields, phone }), {});
});
