"use client"

import * as React from "react"
import { portfolio } from "~/portfolio.config";
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
    LayoutDashboard,
    FileText,
    Moon,
    Sun,
    Laptop,
    Code,
    ArrowUp,
    ArrowDown,
    CornerDownLeft,
    Copy,
    Briefcase,
    BookOpen,
    Trophy,
    Binary,
    GraduationCap,
    Sparkles,
    Music,
    Mail,
    Download,
    CalendarDays,
    Send,
    MessageSquare,
} from "lucide-react"
import { SiGithub, SiX, SiLeetcode } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { projectsData } from "@/data/projectsData"
import { handles, bookingLink, email, resume } from "@/data/links"

const itemClass = "rounded-lg py-3 cursor-pointer"
const kbdClass =
    "font-mono text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700"

const SECTIONS = [
    { id: "experience", label: "Experience", icon: Briefcase, key: "E" },
    // Hidden while portfolio.config.ts has sections.blog = false.
    ...(portfolio.sections.blog
        ? [{ id: "blogs", label: "Blogs", icon: FileText, key: "B" } as const]
        : []),
    { id: "projects", label: "Projects", icon: Code, key: "P" },
    { id: "hackathons", label: "Hackathons", icon: Trophy, key: "H" },
    { id: "dsa", label: "DSA / CP", icon: Binary, key: "D" },
    { id: "skills", label: "Skills", icon: BookOpen, key: "S" },
    { id: "education", label: "Education", icon: GraduationCap, key: "G" },
    { id: "anime", label: "Anime & Music", icon: Music, key: "A" },
    { id: "contact", label: "Socials", icon: Send, key: "O" },
    { id: "guestbook", label: "Guestbook", icon: MessageSquare, key: "N" },
] as const

const PROFILES = [
    { label: "GitHub", icon: SiGithub, href: `https://github.com/${handles.github}`, handle: handles.github },
    { label: "LinkedIn", icon: FaLinkedin, href: `https://www.linkedin.com/in/${handles.linkedin}/`, handle: handles.linkedin },
    { label: "X", icon: SiX, href: `https://x.com/${handles.x}`, handle: `@${handles.x}` },
    { label: "LeetCode", icon: SiLeetcode, href: `https://leetcode.com/u/${handles.leetcode}`, handle: handles.leetcode },
].filter((profile) => Boolean(profile.handle)) as Array<{ label: string; icon: typeof SiGithub; href: string; handle: string }>

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const { setTheme } = useTheme()
    const router = useRouter()

    const openExternal = React.useCallback((url: string) => {
        const opened = window.open(url, "_blank", "noopener,noreferrer")
        if (!opened) window.location.assign(url)
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (!open || !e.shiftKey) return

            const key = e.key.toUpperCase()
            const section = SECTIONS.find((s) => s.key === key)
            if (section) {
                e.preventDefault()
                runCommand(() => { window.location.hash = `#${section.id}` })
                return
            }

            if (key === "C") {
                e.preventDefault()
                runCommand(() => navigator.clipboard.writeText(email))
            } else if (key === "R") {
                e.preventDefault()
                runCommand(() => openExternal(resume))
            } else if (key === "T") {
                e.preventDefault()
                runCommand(() => setTheme("light"))
            } else if (key === "Y") {
                e.preventDefault()
                runCommand(() => setTheme("dark"))
            } else if (key === "U") {
                e.preventDefault()
                runCommand(() => setTheme("system"))
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [open, openExternal, runCommand, setTheme])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative group cursor-pointer transition-all duration-300 active:scale-95"
            >
                {/* Outer border wrapper matching View All style */}
                <div className="absolute -inset-[4.5px] border border-black/5 dark:border-white/5 rounded-[9px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />

                <div className="relative flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[5px] text-[11px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 font-mono">
                    <span className="leading-none mt-[0.5px]">⌘</span>
                    <span className="leading-none mt-[0.5px]">K</span>
                </div>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                {/* Header Section */}
                <div className="flex items-center gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Navigation Menu</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Jump to a section, project, profile or action</p>
                    </div>
                </div>

                <CommandInput placeholder="Search sections, projects, profiles..." className="border-none focus:ring-0" />

                <CommandList className="p-2">
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Sections">
                        {SECTIONS.map((s) => {
                            const Icon = s.icon
                            return (
                                <CommandItem
                                    key={s.id}
                                    value={`section ${s.label}`}
                                    onSelect={() => runCommand(() => { window.location.hash = `#${s.id}` })}
                                    className={itemClass}
                                >
                                    <Icon className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{s.label}</span>
                                    {s.key && <CommandShortcut className={kbdClass}>shift + {s.key}</CommandShortcut>}
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Projects">
                        {projectsData.map((p) => (
                            <CommandItem
                                key={p.slug}
                                value={`project ${p.title} ${p.tech.join(" ")}`}
                                onSelect={() => runCommand(() => router.push(`/projects/${p.slug}`))}
                                className={itemClass}
                            >
                                <Code className="mr-2 h-4 w-4 text-zinc-500" />
                                <span>{p.title}</span>
                                <CommandShortcut className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 capitalize">
                                    {p.status}
                                </CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Pages">
                        <CommandItem value="page all projects" onSelect={() => runCommand(() => router.push("/projects"))} className={itemClass}>
                            <Code className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>All projects</span>
                        </CommandItem>
                        <CommandItem value="page all experience timeline" onSelect={() => runCommand(() => router.push("/experience"))} className={itemClass}>
                            <Briefcase className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Experience timeline</span>
                        </CommandItem>
                        <CommandItem value="page all highlights archive" onSelect={() => runCommand(() => router.push("/highlights"))} className={itemClass}>
                            <Sparkles className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Highlights archive</span>
                        </CommandItem>
                        <CommandItem value="page anime music rap pop watchlist" onSelect={() => runCommand(() => router.push("/anime"))} className={itemClass}>
                            <Music className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Anime &amp; Music</span>
                        </CommandItem>
                        <CommandItem value="page guestbook notes comments sign" onSelect={() => runCommand(() => router.push("/guestbook"))} className={itemClass}>
                            <MessageSquare className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Guestbook</span>
                        </CommandItem>
                        <CommandItem value="page contact form" onSelect={() => runCommand(() => router.push("/contact"))} className={itemClass}>
                            <Send className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Contact page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Profiles">
                        {PROFILES.map((p) => {
                            const Icon = p.icon
                            return (
                                <CommandItem
                                    key={p.label}
                                    value={`profile ${p.label} ${p.handle}`}
                                    onSelect={() => runCommand(() => openExternal(p.href))}
                                    className={itemClass}
                                >
                                    <Icon className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{p.label}</span>
                                    <CommandShortcut className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                                        {p.handle}
                                    </CommandShortcut>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Actions">
                        <CommandItem value="action copy email address" onSelect={() => runCommand(() => navigator.clipboard.writeText(email))} className={itemClass}>
                            <Copy className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy email</span>
                            <CommandShortcut className={kbdClass}>shift + C</CommandShortcut>
                        </CommandItem>
                        <CommandItem value="action send email write" onSelect={() => runCommand(() => openExternal(`mailto:${email}`))} className={itemClass}>
                            <Mail className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Send an email</span>
                        </CommandItem>
                        <CommandItem value="action book a call meeting cal" onSelect={() => runCommand(() => openExternal(bookingLink))} className={itemClass}>
                            <CalendarDays className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Book an intro call</span>
                        </CommandItem>
                        <CommandItem value="action resume cv download" onSelect={() => runCommand(() => openExternal(resume))} className={itemClass}>
                            <Download className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Download résumé</span>
                            <CommandShortcut className={kbdClass}>shift + R</CommandShortcut>
                        </CommandItem>
                        <CommandItem value="action copy link url share" onSelect={() => runCommand(() => navigator.clipboard.writeText(window.location.href))} className={itemClass}>
                            <Copy className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy link to page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Theme">
                        <CommandItem value="theme light" onSelect={() => runCommand(() => setTheme("light"))} className={itemClass}>
                            <Sun className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Light Mode</span>
                            <CommandShortcut className={kbdClass}>shift + T</CommandShortcut>
                        </CommandItem>
                        <CommandItem value="theme dark" onSelect={() => runCommand(() => setTheme("dark"))} className={itemClass}>
                            <Moon className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Dark Mode</span>
                            <CommandShortcut className={kbdClass}>shift + Y</CommandShortcut>
                        </CommandItem>
                        <CommandItem value="theme system auto" onSelect={() => runCommand(() => setTheme("system"))} className={itemClass}>
                            <Laptop className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>System</span>
                            <CommandShortcut className={kbdClass}>shift + U</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                        <div className="flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" />
                            <ArrowDown className="w-3 h-3" />
                            <span>to navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CornerDownLeft className="w-3 h-3" />
                            <span>to select</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                        <span className="font-mono">esc</span>
                        <span>to close</span>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}
