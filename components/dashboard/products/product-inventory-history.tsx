"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

const BACKEND_URL = "http://localhost:8080/api"

interface InventoryHistoryItem {
  date: string
  quantity: number
  type: "in" | "out"
  reason: string
}

interface InventoryHistoryProps {
  productId: string
}

export function ProductInventoryHistory({ productId }: InventoryHistoryProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [historyData, setHistoryData] = useState<InventoryHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchInventoryHistory = async () => {
      try {
        setIsLoading(true)

        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/products/${productId}/inventory-history`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch inventory history')
        // const data = await response.json()
        // setHistoryData(data.history)
        // setChartData(data.chartData)

        // Mock data for demonstration
        setTimeout(() => {
          const mockHistory = [
            { date: "2023-04-20", quantity: 10, type: "in", reason: "Initial stock" },
            { date: "2023-04-22", quantity: 2, type: "out", reason: "Order #ORD-001" },
            { date: "2023-04-25", quantity: 5, type: "in", reason: "Restocked" },
            { date: "2023-04-27", quantity: 3, type: "out", reason: "Order #ORD-003" },
            { date: "2023-04-30", quantity: 15, type: "in", reason: "Bulk restock" },
            { date: "2023-05-02", quantity: 2, type: "out", reason: "Order #ORD-005" },
          ] as InventoryHistoryItem[]

          setHistoryData(mockHistory)

          const mockChartData = [
            { date: "Apr 20", stock: 10 },
            { date: "Apr 22", stock: 8 },
            { date: "Apr 25", stock: 13 },
            { date: "Apr 27", stock: 10 },
            { date: "Apr 30", stock: 25 },
            { date: "May 02", stock: 23 },
          ]

          setChartData(mockChartData)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching inventory history:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load inventory history. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchInventoryHistory()
  }, [productId, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} units`, "Stock Level"]} />
            <Line type="monotone" dataKey="stock" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.type === "in" ? (
                    <span className="text-emerald-500">Stock In</span>
                  ) : (
                    <span className="text-rose-500">Stock Out</span>
                  )}
                </TableCell>
                <TableCell>{item.quantity} units</TableCell>
                <TableCell>{item.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
