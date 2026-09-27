"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Accessible modal on the native <dialog> element: showModal() makes the rest
 * of the page inert, Esc closes, focus returns to the trigger. Content is only
 * mounted while open, so a video inside stops when the modal closes.
 */
type Ctx = { open: boolean; setOpen: (v: boolean) => void; titleId: string }
const ModalContext = React.createContext<Ctx | null>(null)

function useModal() {
  const ctx = React.useContext(ModalContext)
  if (!ctx) throw new Error("Modal components must be used inside <Modal>")
  return ctx
}

export function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const titleId = React.useId()
  return <ModalContext.Provider value={{ open, setOpen, titleId }}>{children}</ModalContext.Provider>
}

export function ModalTrigger({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen } = useModal()
  const Comp = asChild ? Slot : "button"
  return <Comp aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)} {...props} />
}

export function ModalClose({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpen } = useModal()
  const Comp = asChild ? Slot : "button"
  return <Comp onClick={() => setOpen(false)} {...props} />
}

type ModalContentProps = {
  title: string
  /** Visually hide the title (it stays available to screen readers). */
  hideTitle?: boolean
  size?: "md" | "lg" | "video"
  closeLabel?: string
  className?: string
  children: React.ReactNode
}

export function ModalContent({ title, hideTitle, size = "md", closeLabel = "Schliessen", className, children }: ModalContentProps) {
  const { open, setOpen, titleId } = useModal()
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={() => setOpen(false)}
      // A click on the backdrop lands on the <dialog> element itself.
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className={cn(
        "m-auto w-[calc(100%-2rem)] rounded-card bg-white text-ink shadow-frame outline-none backdrop:bg-navy/80 backdrop:backdrop-blur-sm",
        "open:animate-in open:fade-in-0 open:zoom-in-95 motion-reduce:animate-none",
        size === "md" && "max-w-lg p-7",
        size === "lg" && "max-w-3xl p-7",
        size === "video" && "max-w-5xl overflow-hidden bg-navy p-0",
        className,
      )}
    >
      {open && (
        <>
          <h2 id={titleId} className={cn("font-serif text-2xl tracking-tight", hideTitle && "sr-only")}>
            {title}
          </h2>
          {children}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={cn(
              "absolute right-3 top-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors",
              "outline-none focus-visible:ring-2 focus-visible:ring-brand",
              size === "video" ? "bg-white/90 text-navy hover:bg-white" : "text-ink hover:bg-black/5",
            )}
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">{closeLabel}</span>
          </button>
        </>
      )}
    </dialog>
  )
}
