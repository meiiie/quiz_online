/**
 * Professional VMU Sidebar Header
 *
 * Enhanced with:
 * - Refined toggle button with micro-interactions
 * - Professional university branding
 * - Smooth animations and transitions
 * - Maritime-inspired design elements
 */

import type { FC } from "react"

interface SidebarHeaderProps {
  isCollapsed: boolean
  onToggle?: () => void
  isTransitioning?: boolean
}

export const SidebarHeader: FC<SidebarHeaderProps> = ({ isCollapsed }) => {
  return (
    <header
      className={`
      flex-shrink-0 bg-gradient-to-br from-[#1A3BAD] via-[#2563eb] to-[#1A3BAD] text-white relative overflow-hidden
      transition-all duration-500 ease-in-out
      ${isCollapsed ? "px-4 py-5" : "px-6 py-6"}
    `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFC107]/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFC107]/10 rounded-full -translate-y-10 translate-x-10"></div>

      <div className="relative z-10 flex items-center justify-between">
        {/* VMU Logo & Branding */}
        <div
          className={`flex items-center transition-all duration-500 ${isCollapsed ? "justify-center w-full" : "gap-3"}`}
        >
          <div
            className={`
            bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center 
            shadow-lg border border-white/20 transition-all duration-500 group hover:bg-white/20
            ${isCollapsed ? "w-12 h-12" : "w-14 h-14"}
          `}
          >
            <div className="text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h14V7l-7-5zM8 16H6v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0 transition-all duration-500">
              <h1 className="text-xl font-bold tracking-tight truncate mb-1">
                <span className="text-white">VMU </span>
                <span className="text-[#FFC107]">Portal</span>
              </h1>
              <p className="text-sm text-blue-100/90 truncate font-medium tracking-wide">Hệ thống quản lý sinh viên</p>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-3 h-px bg-gradient-to-r from-transparent via-[#FFC107]/60 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
      </div>
    </header>
  )
}
