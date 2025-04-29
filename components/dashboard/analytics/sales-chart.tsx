"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useToast } from "@/components/ui/use-toast"

const BACKEND_URL = "http://localhost:8080/api"

// Sample data - will be replaced with API data in production
const sampleData = [
  { month: "Jan", sales: 4000, target: 4500 },
  { month: "Feb", sales: 3000, target: 3500 },
  { month: "Mar", sales: 5000, target: 4500 },
  { month: "Apr", sales: 2780, target: 3000 },
  { month: "May", sales: 1890, target: 2000 },
  { month: "Jun", sales: 2390, target: 2500 },
  { month: "Jul", sales: 3490, target: 3000 },
  { month: "Aug", sales: 4000, target: 3500 },
  { month: "Sep", sales: 5000, target: 4500 },
  { month: "Oct", sales: 6000, target: 5500 },
  { month: "Nov", sales: 7000, target: 6500 },
  { month: "Dec", sales: 9000, target: 8000 },
]

export function SalesChart() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setIsLoading(true)
        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/analytics/sales`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch sales data')
        // const data = await response.json()
        // setData(data)

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching sales data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load sales data. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Sales ($)" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#10b981"
          name="Target ($)"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
