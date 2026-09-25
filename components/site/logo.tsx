import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  /** Accessible name of the home link. */
  label: string
  productName: string
  tone?: "dark" | "light"
  /** Preload the image — only for the header logo. */
  priority?: boolean
  className?: string
}

/** smiit logo + product name. `tone="light"` for dark backgrounds. */
export function Logo({ label, productName, tone = "dark", priority, className }: LogoProps) {
  return (
    <Link href="/" prefetch={false} aria-label={label} className={cn("inline-flex items-center gap-2.5 rounded-md", className)}>
      <Image
        src={tone === "dark" ? "/brand/logo_black_trim.webp" : "/brand/logo_white_trim.webp"}
        alt=""
        width={57}
        height={32}
        priority={priority}
        className="h-8 w-auto"
      />
      <span
        aria-hidden="true"
        className={cn("h-5 w-px", tone === "dark" ? "bg-ink/20" : "bg-white/30")}
      />
      <span className={cn("font-serif text-[1.35rem] leading-none tracking-tight", tone === "light" && "text-white")}>
        {productName}
      </span>
    </Link>
  )
}
