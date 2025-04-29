import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    customerInitials: "JD",
    date: "2023-04-23",
    status: "Delivered",
    total: "$245.99",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    customerInitials: "JS",
    date: "2023-04-22",
    status: "Processing",
    total: "$129.50",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    customerInitials: "RJ",
    date: "2023-04-21",
    status: "Shipped",
    total: "$79.99",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    customerInitials: "ED",
    date: "2023-04-20",
    status: "Pending",
    total: "$349.99",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    customerInitials: "MW",
    date: "2023-04-19",
    status: "Delivered",
    total: "$189.00",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{order.customerInitials}</AvatarFallback>
                </Avatar>
                <span>{order.customer}</span>
              </div>
            </TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "Delivered"
                    ? "success"
                    : order.status === "Processing"
                      ? "default"
                      : order.status === "Shipped"
                        ? "secondary"
                        : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{order.total}</TableCell>
            <TableCell className="text-right">
              <Link href={`/dashboard/orders/${order.id}`}>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View order {order.id}</span>
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
