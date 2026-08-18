import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

interface ContactInfoProps {
  dict: any
}

export default function ContactInfo({ dict }: ContactInfoProps) {
  const info = dict.contact.info
  const team = dict.contact.team

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="space-y-4 lg:space-y-5">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm text-black/60">{info.emailLabel}</p>
          <a
            href={`mailto:${info.email}`}
            className="block font-bold text-base sm:text-lg text-black hover:text-[#F703EB] transition-colors"
          >
            {info.email}
          </a>
        </div>

        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs sm:text-sm text-black/60">{info.phoneLabel}</p>
          <a
            href={info.phoneHref}
            className="block font-bold text-base sm:text-lg text-black hover:text-[#F703EB] transition-colors"
          >
            {info.phone}
          </a>
        </div>

        <div className="space-y-0.5 sm:space-y-1 pt-2 lg:pt-3">
          <p className="text-xs sm:text-sm text-black/60">{info.bookText}</p>
          <Link
            href="#book"
            className="inline-block font-bold text-sm sm:text-base text-black underline underline-offset-4 hover:text-[#F703EB] transition-colors"
          >
            {info.bookLink}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-6 lg:pt-8 border-t border-black/10">
        {team.map((member: { name: string; role: string; image: string; email: string }) => (
          <div key={member.name} className="flex flex-col items-start">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg mb-2 sm:mb-3">
              <Image
                src={member.image}
                alt={`${member.name} – ${member.role}`}
                fill
                sizes="(max-width: 640px) 64px, 96px"
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-black leading-tight">{member.name}</h3>
            <p className="text-[11px] sm:text-sm text-black/60 mt-0.5">{member.role}</p>
            <a
              href={`mailto:${member.email}`}
              className="mt-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-black/60 hover:text-black transition-colors break-all"
            >
              <Mail className="w-3 h-3 shrink-0" />
              <span className="truncate">{member.email}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
