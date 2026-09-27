/**
 * Registry of every media slot on the site. MEDIA.md documents the same list
 * for production. Files live in /public/media — dropping in a file with the
 * listed name replaces the grey placeholder automatically.
 *
 * Videos expect three files: <file>.webm, <file>.mp4 and <file>-poster.webp.
 * Images expect one file: <file> (WebP, or PNG/SVG if you change the name here).
 * Alt texts are content and live in lib/dictionary.ts under `media`.
 *
 * `localized: true` → one file per language: /media/<lang>/<file> (e.g. images
 * with UI text). Everything else is shared by all languages.
 */
export type MediaKind = "video" | "image"

export type MediaEntry = {
  kind: MediaKind
  /** Path in /public without extension for videos, with extension for images. */
  file: string
  /** CSS aspect-ratio value. */
  ratio: string
  /** Short spec printed on the placeholder box. */
  spec: string
  /** One file per language in /media/<lang>/. */
  localized?: boolean
}

export const MEDIA = {
  VIDEO_HERO: { kind: "video", file: "/media/video_hero", ratio: "16 / 9", spec: "16:9 · 15–20 s · Loop" },
  VIDEO_DEMO_FULL: { kind: "video", file: "/media/video_demo_full", ratio: "16 / 9", spec: "16:9 · ca. 2 min · mit Ton" },

  LOGO_1: { kind: "image", file: "/media/logo_1.webp", ratio: "3 / 1", spec: "3:1 · transparent" },
  LOGO_2: { kind: "image", file: "/media/logo_2.webp", ratio: "3 / 1", spec: "3:1 · transparent" },
  LOGO_3: { kind: "image", file: "/media/logo_3.webp", ratio: "3 / 1", spec: "3:1 · transparent" },
  LOGO_4: { kind: "image", file: "/media/logo_4.webp", ratio: "3 / 1", spec: "3:1 · transparent" },
  LOGO_5: { kind: "image", file: "/media/logo_5.webp", ratio: "3 / 1", spec: "3:1 · transparent" },

  IMG_STEP_1: { kind: "image", file: "/media/img_step_1.webp", ratio: "4 / 3", spec: "4:3 · 1200×900", localized: true },
  IMG_STEP_2: { kind: "image", file: "/media/img_step_2.webp", ratio: "4 / 3", spec: "4:3 · 1200×900", localized: true },
  IMG_STEP_3: { kind: "image", file: "/media/img_step_3.webp", ratio: "4 / 3", spec: "4:3 · 1200×900", localized: true },

  VIDEO_DRAGDROP: { kind: "video", file: "/media/video_dragdrop", ratio: "16 / 10", spec: "16:10 · 15–20 s · Loop" },
  IMG_MULTI_COMPANY: { kind: "image", file: "/media/img_multi_company.webp", ratio: "4 / 3", spec: "4:3 · 1200×900", localized: true },

  VIDEO_AI_CHAT: { kind: "video", file: "/media/video_ai_chat", ratio: "16 / 10", spec: "16:10 · 20–25 s · Loop" },

  IMG_PERSONA_MANAGEMENT: { kind: "image", file: "/media/img_persona_management.webp", ratio: "3 / 2", spec: "3:2 · 1200×800", localized: true },
  IMG_PERSONA_TRUSTEE: { kind: "image", file: "/media/img_persona_trustee.webp", ratio: "3 / 2", spec: "3:2 · 1200×800", localized: true },
  IMG_PERSONA_TEAM_LEAD: { kind: "image", file: "/media/img_persona_team_lead.webp", ratio: "3 / 2", spec: "3:2 · 1200×800", localized: true },
} as const satisfies Record<string, MediaEntry>

export type MediaId = keyof typeof MEDIA

/** Public path of a media file in a language ("/media/fr/img_step_1.webp" for localized slots). */
export function mediaPath(id: MediaId, lang: string) {
  const entry: MediaEntry = MEDIA[id]
  return entry.localized ? entry.file.replace(/^\/media\//, `/media/${lang}/`) : entry.file
}
