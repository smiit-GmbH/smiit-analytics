import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"

/* Shared by both root layouts ([lang] and the 404 page). */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })

/** CSS variables of all site fonts, for the `<html>` class. */
export const fontVariables = `${geist.variable} ${geistMono.variable} ${playfair.variable}`
