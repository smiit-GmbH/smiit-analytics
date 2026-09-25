"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MEDIA, type MediaId } from "@/config/media"

/*
 * Asset slots. The labelled placeholder box always sits underneath the media.
 * Media stays invisible until it has actually loaded, so a missing file shows
 * the placeholder (never a broken-image icon) and a file dropped into
 * /public/media under the same name replaces it without any code change.
 */

export function PlaceholderBox({ id, spec, className }: { id: string; spec?: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center",
        "bg-[repeating-linear-gradient(135deg,#e7e7e2_0_12px,#ecece7_12px_24px)] text-ink-muted",
        className,
      )}
    >
      <span className="font-mono text-[0.7rem] font-semibold tracking-wide text-navy sm:text-xs">{id}</span>
      {spec && <span className="font-mono text-[0.65rem] sm:text-[0.7rem]">{spec}</span>}
    </div>
  )
}

type MediaImageProps = {
  id: string
  src: string
  ratio: string
  spec?: string
  alt: string
  fit?: "cover" | "contain"
  sizes?: string
  priority?: boolean
  className?: string
}

export function MediaImage({ id, src, ratio, spec, alt, fit = "cover", sizes, priority, className }: MediaImageProps) {
  const ref = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState(false)

  // The image may finish (or fail) before hydration, when React handlers are not attached yet.
  React.useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio: ratio }}>
      {!loaded && <PlaceholderBox id={id} spec={spec} />}
      <Image
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        priority={priority}
        // next/image also fires onLoad for already-complete *failed* images, so check for real pixels.
        onLoad={(e) => e.currentTarget.naturalWidth > 0 && setLoaded(true)}
        className={cn(
          "transition-opacity duration-500",
          fit === "cover" ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

function usePosterLoaded(poster: string, enabled = true) {
  const [ok, setOk] = React.useState(false)
  React.useEffect(() => {
    if (!enabled) return
    const img = new window.Image()
    img.onload = () => setOk(true)
    img.src = poster
  }, [poster, enabled])
  return ok
}

type VideoPlayerProps = {
  id: string
  /** Base path without extension. Expects <src>.webm, <src>.mp4 and <src>-poster.webp. */
  src: string
  ratio: string
  spec?: string
  alt: string
  className?: string
}

/**
 * Silent looping product clip (autoplay muted loop playsinline).
 * Sources are only attached once the clip scrolls into view, it pauses when
 * it leaves, and with prefers-reduced-motion only the poster is shown.
 */
export function VideoPlayer({ id, src, ratio, spec, alt, className }: VideoPlayerProps) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const reduced = usePrefersReducedMotion()
  const poster = `${src}-poster.webp`
  const [near, setNear] = React.useState(false)
  const posterOk = usePosterLoaded(poster, near)
  const boxRef = React.useRef<HTMLDivElement>(null)

  // Nothing (not even the poster) is requested until the clip approaches the viewport.
  React.useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: "400px 0px" })
    io.observe(box)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  // <source> children are added after mount, so the element must re-read them.
  React.useEffect(() => {
    const el = ref.current
    if (!activated || !el) return
    el.load()
    el.play().catch(() => {})
  }, [activated])

  const showMedia = playing || posterOk

  return (
    <div ref={boxRef} role="img" aria-label={alt} className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio: ratio }}>
      {!showMedia && <PlaceholderBox id={id} spec={spec} />}
      {reduced ? (
        posterOk && (
          // eslint-disable-next-line @next/next/no-img-element -- poster still for reduced motion
          <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
        )
      ) : (
        <video
          ref={ref}
          className={cn("absolute inset-0 size-full object-cover", !showMedia && "opacity-0")}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterOk ? poster : undefined}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        >
          {activated && <source src={`${src}.webm`} type="video/webm" />}
          {activated && <source src={`${src}.mp4`} type="video/mp4" />}
        </video>
      )}
    </div>
  )
}

/** Full demo video with sound and controls, for the modal. Starts on open. */
export function DemoVideo({ id, src, ratio, spec, title }: { id: string; src: string; ratio: string; spec?: string; title: string }) {
  const [ready, setReady] = React.useState(false)
  const poster = `${src}-poster.webp`
  const posterOk = usePosterLoaded(poster)
  return (
    <div className="relative w-full bg-navy" style={{ aspectRatio: ratio }}>
      {!ready && !posterOk && <PlaceholderBox id={id} spec={spec} className="bg-none bg-navy-800 text-white/70 [&>span:first-child]:text-white" />}
      <video
        className={cn("absolute inset-0 size-full", !ready && !posterOk && "opacity-0")}
        controls
        autoPlay
        playsInline
        preload="metadata"
        poster={posterOk ? poster : undefined}
        title={title}
        onLoadedData={() => setReady(true)}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

type MediaProps = {
  id: MediaId
  alt: string
  fit?: "cover" | "contain"
  sizes?: string
  priority?: boolean
  className?: string
}

/** Renders a registered media slot (config/media.ts) as image or looping video. */
export function Media({ id, alt, ...rest }: MediaProps) {
  const entry = MEDIA[id]
  if (entry.kind === "video") {
    return <VideoPlayer id={id} src={entry.file} ratio={entry.ratio} spec={entry.spec} alt={alt} className={rest.className} />
  }
  return <MediaImage id={id} src={entry.file} ratio={entry.ratio} spec={entry.spec} alt={alt} {...rest} />
}
