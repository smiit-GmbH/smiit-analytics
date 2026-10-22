import {
  TriangleAlert,
  Bell,
  CalendarDays,
  Database,
  Clock,
  Code,
  Download,
  EyeOff,
  FileClock,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  Mail,
  MailWarning,
  Server,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

/** Icon names used in lib/dictionary/, mapped to components. */
export const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  code: Code,
  eyeOff: EyeOff,
  layout: LayoutDashboard,
  download: Download,
  users: Users,
  fileClock: FileClock,
  mail: Mail,
  mailWarning: MailWarning,
  database: Database,
  branch: GitBranch,
  bell: Bell,
  calendar: CalendarDays,
  alert: TriangleAlert,
  server: Server,
  shield: ShieldCheck,
  key: KeyRound,
}

/**
 * LinkedIn logo in the lucide style (24 × 24, 2px stroke). lucide-react 1.0
 * dropped brand icons; the paths are those of its former `Linkedin` icon (ISC).
 */
export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? LayoutDashboard
  return <Cmp className={className} aria-hidden="true" />
}
