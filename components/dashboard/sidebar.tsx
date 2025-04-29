"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    products: false,
    orders: false,
  })

  const toggleItem = (item: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Products",
      icon: Package,
      href: "#",
      active: pathname.includes("/dashboard/products"),
      subitems: [
        {
          label: "All Products",
          href: "/dashboard/products",
          active: pathname === "/dashboard/products",
        },
        {
          label: "Add Product",
          href: "/dashboard/products/new",
          active: pathname === "/dashboard/products/new",
        },
        {
          label: "Categories",
          href: "/dashboard/products/categories",
          active: pathname === "/dashboard/products/categories",
        },
      ],
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "#",
      active: pathname.includes("/dashboard/orders"),
      subitems: [
        {
          label: "All Orders",
          href: "/dashboard/orders",
          active: pathname === "/dashboard/orders",
        },
        {
          label: "New Order",
          href: "/dashboard/orders/new",
          active: pathname === "/dashboard/orders/new",
        },
      ],
    },
    {
      label: "Users",
      icon: Users,
      href: "/dashboard/users",
      active: pathname === "/dashboard/users",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              {routes.map((route, index) => {
                if (!route.subitems) {
                  return (
                    <Link
                      key={index}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                        route.active ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  )
                }

                return (
                  <div key={index} className="space-y-1">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between px-3 py-2 text-left font-medium",
                        route.active ? "text-accent-foreground" : "text-muted-foreground",
                      )}
                      onClick={() => toggleItem(route.label.toLowerCase())}
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </div>
                      {openItems[route.label.toLowerCase()] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>

                    {openItems[route.label.toLowerCase()] && (
                      <div className="pl-6 pt-1">
                        {route.subitems.map((subitem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subitem.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                              subitem.active ? "bg-accent text-accent-foreground" : "transparent",
                            )}
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
