# Implementation Plan — Dynamic Category Cards (Emoji or Image Selector)

This plan outlines the design and implementation steps to allow category (collection) cards to display either a custom uploaded image or an emoji. 

## User Review Required

> [!IMPORTANT]
> - **Self-migrating Database Columns**: We will add `image_type` and `image_url` columns to the `categories` table. Self-migrating SQL code will be added in both `lib/db.ts` (SQLite) and `lib/db-init.ts` (Postgres) to avoid any data loss during deployment.
> - **Cloudinary Upload Preset & Folder**: The newly uploaded category images will be saved inside the `categories` folder on Cloudinary, reusing the existing `CloudinaryUpload` component.

## Proposed Changes

---

### Component 1: Database Schema & CRUD Helpers

We will add columns to the `categories` table and update the database bootstrap queries and type definitions.

#### [MODIFY] [db-queries-types.ts](file:///home/abc/Masaüstü/PortakalCicegiWebsite/lib/db-queries-types.ts)
- Add `image_type: string | null` and `image_url: string | null` to the `Category` interface.

#### [MODIFY] [db.ts](file:///home/abc/Masaüstü/PortakalCicegiWebsite/lib/db.ts)
- Update `categories` table creation block:
  - Add `image_type TEXT DEFAULT 'emoji'`
  - Add `image_url TEXT`
- Add safe SQLite migrations:
  - `ALTER TABLE categories ADD COLUMN image_type TEXT DEFAULT 'emoji'` if missing.
  - `ALTER TABLE categories ADD COLUMN image_url TEXT` if missing.

#### [MODIFY] [db-init.ts](file:///home/abc/Masaüstü/PortakalCicegiWebsite/lib/db-init.ts)
- Update Postgres table creation schema to include `image_type` and `image_url`.
- Add Postgres migration steps:
  - `ALTER TABLE categories ADD COLUMN image_type TEXT DEFAULT 'emoji'` if missing.
  - `ALTER TABLE categories ADD COLUMN image_url TEXT` if missing.

#### [MODIFY] [db-categories.ts](file:///home/abc/Masaüstü/PortakalCicegiWebsite/lib/db-categories.ts)
- Update `createCategory` to insert `image_type` and `image_url` fields for both Vercel Postgres and local SQLite paths.
- *Note: `updateCategory` is already dynamic and uses `Object.entries(category)` to generate sets, so it will support updates to these columns without change.*

---

### Component 2: API Route Adapters

We will update category creation and modification APIs to receive and save the new fields.

#### [MODIFY] [categories POST API](file:///home/abc/Masaüstü/PortakalCicegiWebsite/app/api/admin/categories/route.ts)
- Parse `image_type` (default to `'emoji'`) and `image_url` (default to `null`) from request body.
- Pass these fields into `createCategory`.

#### [MODIFY] [categories PUT API](file:///home/abc/Masaüstü/PortakalCicegiWebsite/app/api/admin/categories/[id]/route.ts)
- Parse `image_type` and `image_url` from the JSON payload.
- Append them to `updateData` if they are defined.

---

### Component 3: Admin Forms (Emoji vs. Image Toggle)

We will modify the category add/edit forms in the admin panel to provide a selection toggle.

#### [MODIFY] [add category form](file:///home/abc/Masaüstü/PortakalCicegiWebsite/app/admin/kategori-ekle/page.tsx)
- Add form states: `image_type: "emoji"` and `image_url: null`.
- Add a beautiful Radio/Toggle selector: **Emoji Kullan** and **Fotoğraf Yükle**.
- Conditionally render:
  - If **Emoji Kullan** is selected: Show the Emoji Input field.
  - If **Fotoğraf Yükle** is selected: Show the `CloudinaryUpload` component (set to `maxImages={1}`, `label="Koleksiyon Kart Görseli"`, `folder="categories"`).
- Submit `image_type` and `image_url` to the POST endpoint.

#### [MODIFY] [edit category form](file:///home/abc/Masaüstü/PortakalCicegiWebsite/app/admin/kategori-duzenle/[id]/page.tsx)
- Load `image_type` and `image_url` values during data fetch inside `useEffect`.
- Add the same selection Toggle UI and conditional inputs (`CloudinaryUpload` / Emoji Input).
- Include `image_type` and `image_url` in the PUT request body.

---

### Component 4: Public Page Category Cards

We will update the homepage categories grid and collection cards to render the image if configured.

#### [MODIFY] [CollectionCard.tsx](file:///home/abc/Masaüstü/PortakalCicegiWebsite/components/ui/CollectionCard.tsx)
- Accept `imageType` (`image_type`) and `imageUrl` (`image_url`) in component properties.
- Check if `imageType === 'image'` and `imageUrl` is present:
  - Render Next.js `<Image>` component with optimized Cloudinary URL via `getOptimizedUrl(imageUrl, { width: 400, height: 300, crop: "fill" })`.
  - Otherwise, render the category's `emoji` (or the default fallback category emoji).

#### [MODIFY] [CollectionsGrid](file:///home/abc/Masaüstü/PortakalCicegiWebsite/components/sections/Collections.tsx)
- Map categories from the database query response to include:
  - `imageType: cat.image_type`
  - `imageUrl: cat.image_url`
  - `emoji: cat.emoji`
- Forward these props to `<CollectionCard>`.

---

## Verification Plan

### Automated Tests
- Run `npm run build` locally to verify that TypeScript types, imports, and compilation succeeds.

### Manual Verification
1. **Admin Verification**:
   - Go to `/admin/kategori-ekle` and select **Fotoğraf Yükle**. Upload a cover photo using the widget and save the category.
   - Go to `/admin/kategori-duzenle/[id]` for an existing category. Change its type to **Fotoğraf Yükle**, select a picture, save, then change it back to **Emoji Kullan** to test both flows.
   - Verify that data persists correctly in the local SQLite db.
2. **Homepage Verification**:
   - Go to the homepage and verify that the newly edited/created categories render their respective images or emojis correctly within the `CollectionCard` layout.
   - Verify that the card's aspect ratio and visual styling remain premium and consistent.
