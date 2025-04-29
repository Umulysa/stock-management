"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Printer } from "lucide-react"
import Link from "next/link"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-04-23",
    status: "Delivered",
    total: "$245.99",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-04-22",
    status: "Processing",
    total: "$129.50",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-04-21",
    status: "Shipped",
    total: "$79.99",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-04-20",
    status: "Pending",
    total: "$349.99",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-04-19",
    status: "Delivered",
    total: "$189.00",
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Sarah Brown",
    date: "2023-04-18",
    status: "Cancelled",
    total: "$59.99",
    items: 1,
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    date: "2023-04-17",
    status: "Delivered",
    total: "$149.99",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Jennifer Taylor",
    date: "2023-04-16",
    status: "Processing",
    total: "$89.99",
    items: 1,
  },
]

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const toggleAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedOrders.length === orders.length && orders.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all orders"
              />
            </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => toggleOrder(order.id)}
                  aria-label={`Select order ${order.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Processing"
                        ? "default"
                        : order.status === "Shipped"
                          ? "secondary"
                          : order.status === "Cancelled"
                            ? "destructive"
                            : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/orders/${order.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" />
                      Print Invoice
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
