/**
 * Professional VMU Sidebar - Redesigned by UX/UI Expert
 *
 * Design Philosophy: "Maritime Excellence Interface"
 * - Clean, professional layout with clear visual hierarchy
 * - Enhanced spacing and typography for better readability
 * - Sophisticated color system with maritime-inspired palette
 * - Professional-grade interactions and animations
 *
 * Key Improvements:
 * - Larger, more prominent navigation items
 * - Refined toggle mechanism with smooth animations
 * - Clear section divisions using subtle visual cues
 * - Professional LED accent border
 * - Optimized spacing and layout proportions
 */

import type { FC } from "react"
import { useState, useEffect } from "react"
import { useView } from "../../../shared/lib/viewManager"
import { useSidebar } from "../model/useSidebar"
import { SidebarHeader } from "./SidebarHeader"
import { UserInfoCard } from "./UserInfoCard"
import { NavList } from "./NavList"
import { SecondaryActions } from "./SecondaryActions"

export interface SidebarProps {
  className?: string
}

/**
 * Get initial collapsed state from localStorage with SSR safety
 */
const getInitialCollapsedState = (): boolean => {
  if (typeof window === "undefined") return false
  const savedState = localStorage.getItem("vmu-sidebar-collapsed")
  return savedState ? JSON.parse(savedState) : false
}

export const Sidebar: FC<SidebarProps> = ({ className = "" }) => {
  const { currentView, setView } = useView()
  const { navItems, secondaryActions, userInfo } = useSidebar()

  // Enhanced state management with smooth transitions
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Professional toggle handler with transition management
  const handleToggle = () => {
    setIsTransitioning(true)
    const newCollapsedState = !isCollapsed

    // Smooth transition timing
    setTimeout(() => {
      setIsCollapsed(newCollapsedState)
      localStorage.setItem("vmu-sidebar-collapsed", JSON.stringify(newCollapsedState))

      // Notify host application
      window.dispatchEvent(
        new CustomEvent("vmu:sidebar:toggle", {
          detail: { isCollapsed: newCollapsedState },
        }),
      )

      setTimeout(() => setIsTransitioning(false), 150)
    }, 50)
  }

  // Initial state notification
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("vmu:sidebar:toggle", {
        detail: { isCollapsed },
      }),
    )
  }, [])

  return (
    <div className="relative h-full overflow-visible">
      {/* Toggle Button - Positioned absolutely relative to the container */}
      <button
        onClick={handleToggle}
        className={`
          absolute top-6 z-[100] 
          w-8 h-12 bg-gradient-to-b from-[#1A3BAD] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1A3BAD]
          text-white rounded-r-xl shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-500 ease-in-out
          border border-l-0 border-[#FFC107]/30 hover:border-[#FFC107]/60
          ${isCollapsed ? "left-[76px]" : "left-[302px]"}
        `}
        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
      >
        <div className={`transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </div>
      </button>

      {/* Professional VMU Sidebar - Static Layout */}
      <aside
        className={`
          relative h-full bg-white flex flex-col shadow-xl border-r border-gray-200/80
          transition-all duration-500 ease-in-out overflow-hidden
          ${isCollapsed ? "w-20" : "w-80"}
          ${isTransitioning ? "pointer-events-none" : ""}
          ${className}
        `}
      >

        {/* Professional LED Accent Border */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1A3BAD] via-[#FFC107] to-[#1A3BAD] shadow-lg shadow-[#1A3BAD]/30 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
        </div>

        {/* Enhanced Sidebar Content */}
        <div className="flex flex-col h-full overflow-hidden relative z-0">
          {/* VMU Maritime Header */}
          <SidebarHeader isCollapsed={isCollapsed} onToggle={handleToggle} isTransitioning={isTransitioning} />

          {/* Enhanced User Information Section */}
          <UserInfoCard userInfo={userInfo} isCollapsed={isCollapsed} />

          {/* Professional Section Divider */}
          <div
            className={`
            flex items-center transition-all duration-300 bg-gradient-to-r from-gray-50 to-white
            ${isCollapsed ? "px-4 py-4" : "px-6 py-5"}
          `}
          >
            {!isCollapsed ? (
              <>
                <div className="w-2.5 h-2.5 bg-[#1A3BAD] rounded-full animate-pulse" />
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wider ml-4 mr-5">
                  Điều hướng chính
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#1A3BAD]/40 to-transparent" />
              </>
            ) : (
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1A3BAD]/50 to-transparent" />
            )}
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-[#1A3BAD]/50">
            {/* Enhanced Main Navigation */}
            <NavList navItems={navItems} currentView={currentView} onViewChange={setView} isCollapsed={isCollapsed} />
          </div>

          {/* Enhanced Secondary Actions */}
          <SecondaryActions secondaryActions={secondaryActions} isCollapsed={isCollapsed} />

          {/* Professional Maritime Footer */}
          <footer
            className={`
            flex-shrink-0 bg-gradient-to-r from-[#1A3BAD]/5 to-[#FFC107]/5 
            border-t border-gray-200/50 transition-all duration-300 relative overflow-hidden
            ${isCollapsed ? "px-4 py-5" : "px-6 py-6"}
          `}
          >
            <div className="relative z-10">
              {!isCollapsed ? (
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1A3BAD] rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2L3 7v11h14V7l-7-5zM8 16H6v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-[#1A3BAD]">VMU Portal</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Trường Đại học Hàng hải Việt Nam</p>
                  <p className="text-xs text-gray-400">© 2024 VMU Portal v2.0</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A3BAD] to-[#2563eb] rounded-xl flex items-center justify-center shadow-md group hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11h14V7l-7-5z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A3BAD]/10 via-transparent to-[#FFC107]/10" />
            </div>
          </footer>

          {/* Professional Bottom Accent Line */}
          <div className="h-1 bg-gradient-to-r from-[#1A3BAD] via-[#FFC107] to-[#1A3BAD] shadow-inner">
            <div className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
