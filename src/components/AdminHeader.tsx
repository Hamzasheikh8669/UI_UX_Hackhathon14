
import {  LayoutDashboard } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex items-center gap-2 font-semibold">
        <div className="size-8 rounded bg-primary text-primary-foreground grid place-items-center"><LayoutDashboard size={24}/></div>
        Dashboard
      </div>
      <div className="flex-1">
        <form className="w-full max-w-[600px]">
          <div className="relative">

          </div>
        </form>
      </div>

      <UserButton/>      
    </header>
  )
}
