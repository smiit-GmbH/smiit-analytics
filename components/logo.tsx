import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  /** Home page of the current language. */
  href: string
  /** Accessible name of the home link. */
  label: string
  productName: string
  tone?: "dark" | "light"
  /** Preload the image — only for the header logo. */
  priority?: boolean
  className?: string
}

/** App icon + "smiit Analytics", as in the product. `tone="light"` for dark backgrounds. */
export function Logo({ href, label, productName, tone = "dark", priority, className }: LogoProps) {
  return (
    <Link href={href} prefetch={false} aria-label={label} className={cn("inline-flex items-center gap-2.5 rounded-md", className)}>
      <Image
        src="/brand/app-icon.webp"
        alt=""
        width={32}
        height={32}
        priority={priority}
        className={cn("size-8 rounded-[0.55rem]", tone === "light" && "ring-1 ring-white/40")}
      />
      <span className={cn("text-[1.08rem] font-medium tracking-tight", tone === "light" ? "text-white" : "text-ink")}>
        {productName}
      </span>
    </Link>
  )
}
