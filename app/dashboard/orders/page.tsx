import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrdersTable } from "@/components/dashboard/orders/orders-table"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Link href="/dashboard/orders/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search orders..." className="max-w-sm" />
      </div>

      <OrdersTable />
    </div>
  )
}
