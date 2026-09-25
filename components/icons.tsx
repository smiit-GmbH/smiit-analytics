import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Database,
  Clock,
  Download,
  EyeOff,
  FileClock,
  FileSpreadsheet,
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

/** Icon names used in content/*.ts, mapped to components. */
export const ICONS: Record<string, LucideIcon> = {
  sheet: FileSpreadsheet,
  clock: Clock,
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
  alert: AlertTriangle,
  server: Server,
  shield: ShieldCheck,
  key: KeyRound,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? LayoutDashboard
  return <Cmp className={className} aria-hidden="true" />
}
