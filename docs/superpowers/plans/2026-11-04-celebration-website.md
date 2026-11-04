# Kutlama odaklı site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Gerçek ürünleri kullanımda gösteren ve seçilen ürünlerle talep hazırlatan siteyi localhost'ta tamamlamak.

**Architecture:** Ürün grupları ortak içerikte tanımlanır. Ürün seçimi küçük bir React context ile oturum boyunca korunur; doğrulama ve mesaj oluşturma saf fonksiyonlarda kalır. Mevcut pasta stüdyosu yeniden kullanılır, magnet ve kapı süsüne ortak bir fotoğraf/video inceleme bileşeni eklenir.

**Tech Stack:** Next.js 14, React 18, TypeScript, mevcut Tailwind/CSS modülleri, Node yerleşik test koşucusu.

**Spec:** `docs/superpowers/specs/2026-11-04-celebration-website.md`

## Global Constraints

- Yeni bağımlılık eklenmez.
- Kullanıcının seçimiyle mevcut `codex/v3` dalında ve localhost'ta çalışılır.
- Önceden silinen belgeler ve ham medya arşivleri commit kapsamına alınmaz.
- İsim ve telefon oturum deposuna yazılmaz.
- Doğrulanmamış ticari iddialar yeni ana akışta kullanılmaz.
- Pasta stüdyosunun kabul edilen iki görünümü korunur.
- Form otomatik dış mesaj göndermez; paylaşım öncesi taslağı gösterir.

## Review Focus

- Bozuk veya eski oturum verisi sayfayı kilitlememeli; Task 1 restore testleri.
- Seçim değişince kaldırılan ürün/adet mesajda kalmamalı; Task 1 mesaj testleri, Task 3 tarayıcı kontrolü.
- Sayfa geçişi ve yenileme seçimi kaybetmemeli; Task 2/3 gerçek tarayıcı kontrolü.
- Telefon eksik veya örnek olduğunda WhatsApp'a geçersiz link verilmemeli; Task 1 iletişim testleri.
- Mobil gezinme, medya yüklenmesi ve kopyalama reddi müşteri yolunu kapatmamalı; Task 3 tarayıcı kontrolü.

### Task 1: Talep davranışı ve gerçek medya

**Files:**
- Create: `lib/inquiry.ts`, `tests/inquiry.test.mjs`, `content/celebrations.ts`, `public/images/celebrations/`, `public/videos/celebrations/`.
- Modify: `package.json` (yalnızca yerleşik test komutu).

**Interfaces:**
- Consumes: Spec'teki üç grup, gerçek kaynak medya ve onaylanan test sınırları.
- Produces: `GroupId`, `InquiryDraft`, `InquiryFields`, `restoreDraft`, `buildInquiryMessage`, `getContactTarget`; `productGroups` ve optimize edilmiş medya.

- [x] **Step 1:** Bozuk oturum verisi ve bilinmeyen ürünleri güvenle ele alma testi yaz.
- [x] **Step 2:** Run `node --test tests/inquiry.test.mjs`. Expected: FAIL, davranış henüz yok.
- [x] **Step 3:** Yalnızca bu davranışı uygula; sonraki doğrulama/mesaj/iletişim durumlarını birer RED→GREEN döngüsüyle ekle.
- [x] **Step 4:** Gerçek kaynakları web boyutlarına dönüştür; kaynak dosyalara dokunma.
- [x] **Step 5:** Run `npm test`. Expected: bütün talep davranışı testleri PASS.
- [x] **Step 6:** Bu task'a ait dosyaları commit et.

### Task 2: Ana sayfa, ürünler ve ortak gezinme

**Files:**
- Create: `components/celebration/` altında context, ana sayfa, ürün deneyimi ve ortak stiller; `app/urun-gruplari/[slug]/page.tsx`.
- Modify: `app/page.tsx`, `app/layout.tsx`, `components/layout/{Navbar,Footer,AnnouncementBar,StickyMobileCTA}.tsx`, `components/sections/SetStudio.tsx`, `app/sitemap.ts`, `components/seo/JsonLd.tsx`.
- Preserve: Önceki set sayfaları, optimize afişler ve pasta katmanları.

**Interfaces:**
- Consumes: Task 1 `productGroups`, `InquiryDraft`, `restoreDraft`, medya yolları.
- Produces: `InquiryProvider`, `useInquiry`, `SelectProductLink`; ana sayfa ve üç ürün yolu. Talep sayfasına seçilmiş ürün/konsept aktarılır.

- [x] **Step 1:** Task 1 testlerinin geçtiğini ve TypeScript başlangıç durumunu doğrula. Run `npm test` and `npx tsc --noEmit --incremental false`. Expected: PASS.
- [x] **Step 2:** Onaylanan müşteri yolunu ana sayfaya ve üç ürün sayfasına uygula; mevcut stüdyoyu koru.
- [x] **Step 3:** Gezinmeyi gerçek sayfalara bağla, metadata ve schema metinlerini doğrulanmış içerikle güncelle.
- [x] **Step 4:** Run `npx tsc --noEmit --incremental false`. Expected: PASS.
- [x] **Step 5:** Tarayıcıda seçimden başka sayfaya geç; seçimin korunduğunu ve iki inceleme görünümünü kontrol et. Expected: seçim ve görünüm çalışır.
- [x] **Step 6:** Bu task'a ait dosyaları commit et.

### Task 3: Talep oluşturma ve uçtan uca doğrulama

**Files:**
- Create: `app/talep-olustur/page.tsx`, `components/celebration/InquiryForm.tsx`.
- Modify: Müşteri yolundaki çağrılar ve gerekli form stilleri.

**Interfaces:**
- Consumes: Task 1 doğrulama, mesaj ve iletişim fonksiyonları; Task 2 context seçimi.
- Produces: Paylaşılabilir taslak, WhatsApp bağlantısı veya Instagram için kopyalama.

- [x] **Step 1:** Eksik seçim, eksik isim/etkinlik ve sıfır/ondalık adetlerin reddedildiğini birer RED→GREEN testiyle tamamla.
- [x] **Step 2:** Formu ve paylaşım öncesi taslak görünümünü uygula; gönderildi iddiası kullanma.
- [x] **Step 3:** Tarayıcıda grup seç, talebe geç, yenile, seçimi kaldır, taslağı hazırla. Expected: yalnızca son seçimler mesajda bulunur.
- [x] **Step 4:** Mobil 390 px ve tablet 768 px görünümünü kontrol et; kopyalama reddi için manuel kopyalama alanı bulunduğunu doğrula.
- [x] **Step 5:** Run `npm test`, `npx tsc --noEmit --incremental false`, `npm run build`. Expected: PASS.
- [x] **Step 6:** Bu task'a ait dosyaları commit et; iki eksenli taze bağlam incelemesini çalıştır ve önemli bulguları bir RED→GREEN düzeltme geçişinde kapat.
