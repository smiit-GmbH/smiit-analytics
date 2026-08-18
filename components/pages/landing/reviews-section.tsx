"use client"

import { useEffect, useState } from "react"
import { Star, BadgeCheck, ExternalLink } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

interface ReviewItem {
  author: string
  company: string
  rating: number
  date: string
  title: string
  quote: string
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${i < rating ? "fill-[#F5A623] text-[#F5A623]" : "fill-black/10 text-black/10"}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({
  review,
  verifiedBadge,
  formatDate,
}: {
  review: ReviewItem
  verifiedBadge: string
  formatDate: (iso: string) => string
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-8">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-[#21569c]">
          <BadgeCheck className="h-3.5 w-3.5" />
          {verifiedBadge}
        </span>
      </div>
      <h3 className="mt-4 font-semibold leading-snug text-black">{review.title}</h3>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-black/60">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <div className="mt-6 border-t border-slate-200/70 pt-5">
        <p className="text-sm font-semibold text-black">{review.author}</p>
        <p className="text-xs text-black/55">{review.company}</p>
        <p className="mt-1 text-xs text-black/40">{formatDate(review.date)}</p>
      </div>
    </article>
  )
}

export function ReviewsSection({ dict, lang }: { dict: any; lang: Locale }) {
  const reviews = dict.landing.reviews
  const heading = useRevealOnScroll()
  const cards = useRevealOnScroll({ margin: "-80px" })
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSelected(api.selectedScrollSnap())
      setSnapCount(api.scrollSnapList().length)
    }
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  if (!reviews?.items?.length) return null

  const items: ReviewItem[] = reviews.items
  const dateFormatter = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formatDate = (iso: string) => dateFormatter.format(new Date(iso))

  return (
    <section className="relative pt-20 md:pt-28 pb-8 md:pb-12">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`text-center mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {reviews.heading.lead}{" "}
            <span className="text-[#21569c]">{reviews.heading.highlight}</span>
          </h2>
          <div className="mt-5 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Stars rating={5} />
              <span className="font-semibold text-black">5.0</span>
              <span className="text-sm text-black/55">
                · {items.length} {lang === "de" ? "Bewertungen" : "reviews"}
              </span>
            </div>
            <a
              href={reviews.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#21569c] transition-colors hover:text-[#1a457d]"
            >
              <BadgeCheck className="h-4 w-4" />
              {reviews.sourceLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div
          ref={cards.ref}
          className={`reveal-fade-up ${cards.isRevealed ? "revealed" : ""}`}
        >
          {/* >=1000px — static grid */}
          <div className="hidden grid-cols-3 gap-5 min-[1000px]:grid">
            {items.map((r) => (
              <ReviewCard
                key={r.author}
                review={r}
                verifiedBadge={reviews.verifiedBadge}
                formatDate={formatDate}
              />
            ))}
          </div>

          {/* <1000px — carousel, at least one card fully visible */}
          <div className="min-[1000px]:hidden">
            <Carousel
              opts={{ align: "start", containScroll: "trimSnaps", loop: false }}
              setApi={(a) => setApi(a ?? null)}
            >
              <CarouselContent className="-ml-4">
                {items.map((r) => (
                  <CarouselItem key={r.author} className="basis-full pl-4 sm:basis-1/2">
                    <ReviewCard
                      review={r}
                      verifiedBadge={reviews.verifiedBadge}
                      formatDate={formatDate}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {snapCount > 1 && (
              <div
                role="tablist"
                aria-label={lang === "de" ? "Bewertungen" : "Reviews"}
                className="mt-8 flex items-center justify-center gap-2"
              >
                {Array.from({ length: snapCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === selected}
                    aria-label={`${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === selected ? "w-10 bg-[#0B162D]" : "w-6 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {reviews.translatedNote && (
          <p className="mt-8 text-center text-xs text-black/40">{reviews.translatedNote}</p>
        )}
      </div>
    </section>
  )
}
