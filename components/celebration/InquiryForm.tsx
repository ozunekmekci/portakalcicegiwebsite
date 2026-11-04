"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
import { useInquiry } from "./InquiryContext";
import { buildInquiryMessage, getContactTarget, groupLabels, validateInquiry, type GroupId, type InquiryErrors, type InquiryFields } from "@/lib/inquiry";
import styles from "./InquiryForm.module.css";

const groupIds = Object.keys(groupLabels) as GroupId[];
const initialFields: InquiryFields = { name: "", occasion: "", date: "", phone: "", notes: "" };

export default function InquiryForm({ contactPhone }: { contactPhone: string }) {
  const { draft, ready, toggleProduct, setQuantity, setConcept } = useInquiry();
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [prepared, setPrepared] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const message = buildInquiryMessage(draft, fields);
  const currentVersion = JSON.stringify([draft, fields]);
  const showPreview = prepared === currentVersion;
  const contact = getContactTarget(contactPhone, message);

  function updateField(key: keyof InquiryFields, value: string) {
    setFields(previous => ({ ...previous, [key]: value }));
    setCopyStatus("idle");
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiry(draft, fields);
    setErrors(nextErrors);
    setCopyStatus("idle");
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      const target = first === "products" ? "product-magnet" : groupIds.includes(first as GroupId) ? `quantity-${first}` : first;
      document.getElementById(target)?.focus();
      return;
    }
    setPrepared(currentVersion);
    requestAnimationFrame(() => document.getElementById("draft-title")?.focus());
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("manual");
      previewRef.current?.focus();
      previewRef.current?.select();
    }
  }

  return <div className={styles.page}>
    <div className={styles.container}>
      <Link href="/#urunler" className={styles.back}><ArrowLeft size={16} /> Ürünleri incele</Link>
      <div className={styles.heading}><p className={styles.eyebrow}>BİRLİKTE HAZIRLAYALIM</p><h1>Kutlamanı anlat.</h1><p>İlgilendiğin parçaları seç, aklındakileri yaz. Ayrıntıları hazırladığın mesaj üzerinden konuşabiliriz.</p></div>
      {!ready ? <p role="status">Ürün seçimlerin yükleniyor…</p> : <div className={styles.layout}>
        <form noValidate onSubmit={prepare} className={styles.form}>
          <fieldset className={styles.productFieldset} aria-describedby={errors.products ? "products-error" : undefined}>
            <legend><span>01</span> Hangi parçalar olsun?</legend>
            <p>Birini, ikisini veya üçünü seçebilirsin. Adetler henüz belli değilse boş bırak.</p>
            {errors.products && <p className={styles.error} id="products-error" role="alert">{errors.products}</p>}
            {groupIds.map(id => <div className={`${styles.product} ${draft.products.includes(id) ? styles.selected : ""}`} key={id}>
              <label className={styles.productLabel}><input type="checkbox" id={`product-${id}`} checked={draft.products.includes(id)} onChange={() => toggleProduct(id)} /><span>{groupLabels[id]}</span></label>
              {draft.products.includes(id) && <div className={styles.quantity}>
                <label htmlFor={`quantity-${id}`}>Adet <span>(isteğe bağlı)</span></label>
                <input id={`quantity-${id}`} aria-label={`${groupLabels[id]} adedi (isteğe bağlı)`} inputMode="numeric" type="text" maxLength={12} value={draft.quantities[id] || ""} onChange={event => setQuantity(id, event.target.value)} placeholder="Henüz belli değil" aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-error` : undefined} />
                {errors[id] && <p id={`${id}-error`} className={styles.error} role="alert">{errors[id]}</p>}
              </div>}
            </div>)}
          </fieldset>
          <fieldset><legend><span>02</span> Biraz kutlamandan bahset.</legend>
            <div className={styles.fields}>
              <div><label htmlFor="name">İsmin <span>(gerekli)</span></label><input id="name" autoComplete="given-name" required maxLength={100} value={fields.name} onChange={e => updateField("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p id="name-error" className={styles.error} role="alert">{errors.name}</p>}</div>
              <div><label htmlFor="occasion">Kutlama türü <span>(gerekli)</span></label><input id="occasion" placeholder="Babyshower, doğum günü…" required maxLength={100} value={fields.occasion} onChange={e => updateField("occasion", e.target.value)} aria-invalid={!!errors.occasion} aria-describedby={errors.occasion ? "occasion-error" : undefined} />{errors.occasion && <p id="occasion-error" className={styles.error} role="alert">{errors.occasion}</p>}</div>
              <div><label htmlFor="date">Kutlama tarihi <span>(isteğe bağlı)</span></label><input type="date" id="date" value={fields.date} onChange={e => updateField("date", e.target.value)} /></div>
              <div><label htmlFor="phone">Telefonun <span>(isteğe bağlı)</span></label><input type="tel" id="phone" autoComplete="tel" maxLength={30} value={fields.phone} onChange={e => updateField("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{errors.phone && <p id="phone-error" className={styles.error} role="alert">{errors.phone}</p>}</div>
            </div>
            <label htmlFor="concept">İsim, renk veya konsept <span>(isteğe bağlı)</span></label><input id="concept" maxLength={160} placeholder="Örneğin: pembe tonları, ay ve güneş" value={draft.concept} onChange={e => setConcept(e.target.value)} />
            <label htmlFor="notes">Eklemek istediklerin <span>(isteğe bağlı)</span></label><textarea id="notes" rows={4} maxLength={2000} value={fields.notes} onChange={e => updateField("notes", e.target.value)} placeholder="Beğendiğin bir örnek veya sormak istediğin bir şey var mı?" />
          </fieldset>
          <p className={styles.note}>Sonraki adımda mesajını görebilir, ardından kendin paylaşabilirsin.</p>
          <button className={styles.primary} type="submit">Talep taslağımı hazırla <ArrowUpRight size={18} /></button>
        </form>
        <aside className={styles.aside}>
          {showPreview ? <section className={styles.preview} aria-labelledby="draft-title">
            <p className={styles.eyebrow}>PAYLAŞMADAN ÖNCE</p><h2 id="draft-title" tabIndex={-1}>Talep taslağın hazır.</h2>
            <p>Mesaj henüz gönderilmedi. Kontrol edip aşağıdan paylaşabilirsin.</p>
            <label htmlFor="message-preview" className={styles.previewLabel}>Mesajın</label><textarea id="message-preview" ref={previewRef} readOnly rows={14} value={message} />
            {contact.channel === "whatsapp" ? <a href={contact.href} target="_blank" rel="noopener noreferrer" className={styles.primary}>WhatsApp’ta mesajı aç <ArrowUpRight size={18} /></a> : <>
              <button type="button" className={styles.primary} onClick={copyMessage}>{copyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}{copyStatus === "copied" ? "Mesaj kopyalandı" : "Mesajı kopyala"}</button>
              <a href={contact.href} target="_blank" rel="noopener noreferrer" className={styles.instagram}>Instagram’da mesaj yaz <ArrowUpRight size={16} /></a>
              <p className={styles.note} role="status">{copyStatus === "manual" ? "Otomatik kopyalama açılamadı. Yukarıdaki seçili metni elle kopyalayıp Instagram mesajına yapıştırabilirsin." : copyStatus === "copied" ? "Instagram’da yeni mesaja yapıştırıp gönderebilirsin." : "Mesajını kopyala, Instagram’da bize göndermek için yapıştır."}</p>
            </>}
          </section> : <section className={styles.summary}><p className={styles.eyebrow}>SENİN KUTLAMAN</p><h2>Parçaları sen seç.</h2><p>Magnet konuklarına bir hatıra, kapı süsü karşılamaya bir detay, pasta süsleri de kutlama masasına eşlik edebilir.</p><div className={styles.selectionList}>{groupIds.map(id => <div key={id}><span>{groupLabels[id]}</span><span>{draft.products.includes(id) ? "Seçildi" : "—"}</span></div>)}</div><p className={styles.note}>Bu form fiyat veya sipariş onayı oluşturmaz. Tasarım ve adet ayrıntılarını mesajlaşarak netleştirebiliriz.</p></section>}
        </aside>
      </div>}
    </div>
  </div>;
}
