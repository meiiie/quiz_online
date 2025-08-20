// ========================================================================
// FILE: src/layouts/StudentLayout.tsx
// PURPOSE: Minimal wrapper cho Student MFE - để MFE tự quản lý layout
// DESIGN: Clean wrapper pattern - không can thiệp vào MFE internal layout
// FEATURES: MFE autonomy, event listening for future extensions
// ========================================================================

import { type ReactNode, useEffect } from "react"

interface StudentLayoutProps {
  children: ReactNode
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  // Optional: Lắng nghe các sự kiện từ Student MFE để có thể xử lý trong tương lai
  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ isCollapsed: boolean }>
      console.log("🏛️ Host-shell received sidebar toggle:", customEvent.detail.isCollapsed)

      document.body.classList.toggle("sidebar-collapsed", customEvent.detail.isCollapsed)
    }

    // Listen for events from Student MFE (optional, for future use)
    window.addEventListener("sidebar:toggle", handleSidebarToggle)

    return () => {
      window.removeEventListener("sidebar:toggle", handleSidebarToggle)
    }
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Student MFE renders its own complete layout here */}
      {children}
    </div>
  )
}

