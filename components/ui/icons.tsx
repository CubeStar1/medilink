import {
  Loader2,
  Mail,
  User,
  Lock,
  LogOut,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  Check,
  Plus,
  X,
  type LucideIcon,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export type Icon = LucideIcon;

export const Icons = {
  spinner: Loader2,
  mail: Mail,
  user: User,
  lock: Lock,
  logout: LogOut,
  settings: Settings,
  chevronDown: ChevronDown,
  chevronsUpDown: ChevronsUpDown,
  check: Check,
  plus: Plus,
  close: X,
  google: FcGoogle,
} as const; 