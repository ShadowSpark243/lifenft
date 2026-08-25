"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items, className }: NavBarProps) {
    const location = useLocation()

    // Find which tab is active based on the URL path
    const currentItem = items.find(item => item.url === location.pathname)
        || items.find(item => location.pathname.startsWith(item.url) && item.url !== '/')
        || items[0]

    const [activeTab, setActiveTab] = useState(currentItem.name)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setActiveTab(currentItem.name)
    }, [location.pathname, currentItem])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className={cn(
                "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 sm:mb-0 hidden sm:block",
                className,
            )}
            style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                boxShadow: 'none',
                border: 'none',
                borderBottom: 'none',
            }}
        >
            <div className="flex items-center gap-5 border-b border-slate-700/80 py-1 px-1">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-xs font-semibold uppercase tracking-wider px-2 py-2 transition-colors border-b",
                                "border-transparent text-slate-400 hover:text-white hover:border-slate-500",
                                isActive && "text-secondary-light font-bold border-secondary",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-transparent -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-secondary" />
                                </motion.div>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
