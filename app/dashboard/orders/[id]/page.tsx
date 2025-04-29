"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Printer, Truck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const BACKEND_URL = "http://localhost:8080/api"

interface OrderItem {
  id: string
  product: string
  quantity: number
  price: string
  total: string
}

interface Order {
  id: string
  customer: string
  email: string
  date: string
  status: string
  total: string
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  notes: string
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const orderId = params.id as string

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true)

        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch order details')
        // const data = await response.json()
        // setOrder(data)

        // Mock data for demonstration
        setTimeout(() => {
          setOrder({
            id: orderId,
            customer: "John Doe",
            email: "john.doe@example.com",
            date: "2023-04-23T14:30:00Z",
            status: "Processing",
            total: "$245.99",
            items: [
              {
                id: "ITEM-001",
                product: "Wireless Headphones",
                quantity: 1,
                price: "$129.99",
                total: "$129.99",
              },
              {
                id: "ITEM-002",
                product: "Bluetooth Speaker",
                quantity: 1,
                price: "$79.99",
                total: "$79.99",
              },
              {
                id: "ITEM-003",
                product: "USB-C Cable",
                quantity: 2,
                price: "$19.99",
                total: "$39.98",
              },
            ],
            shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
            paymentMethod: "Credit Card (Visa ending in 4242)",
            notes: "Please leave package at the door.",
          })
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching order details:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load order details. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, toast])

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      // Uncomment and modify this to connect to your actual Spring Boot API
      // await fetch(`${BACKEND_URL}/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ status: newStatus })
      // })

      // Optimistic update
      if (order) {
        setOrder({
          ...order,
          status: newStatus,
        })
      }

      toast({
        title: "Order updated",
        description: `Order status changed to ${newStatus}.`,
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status. Please try again.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg font-medium">Order not found</p>
          <p className="text-muted-foreground">The order you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order {order.id}</h1>
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
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Link href={`/dashboard/orders/${orderId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order placed on {new Date(order.date).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.product}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.price}</TableCell>
                          <TableCell className="text-right">{item.total}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                  </div>
                  <div className="space-x-2">
                    {order.status === "Processing" && (
                      <Button onClick={() => handleUpdateStatus("Shipped")}>
                        <Truck className="mr-2 h-4 w-4" />
                        Mark as Shipped
                      </Button>
                    )}
                    {order.status === "Shipped" && (
                      <Button onClick={() => handleUpdateStatus("Delivered")}>Mark as Delivered</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Details about the customer who placed this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{order.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="mt-1">{order.notes || "No notes provided"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Delivery details for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                <p className="mt-1">{order.shippingAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipping Status</p>
                <Badge
                  variant={
                    order.status === "Delivered" ? "success" : order.status === "Shipped" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tracking Information</p>
                <p className="mt-1">
                  {order.status === "Shipped" || order.status === "Delivered" ? "TRK123456789" : "Not available yet"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
