"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useToast } from "@/components/ui/use-toast"

const BACKEND_URL = "http://localhost:8080/api"

// Sample data - will be replaced with API data in production
const sampleData = [
  { name: "Wireless Headphones", revenue: 12500 },
  { name: "Bluetooth Speaker", revenue: 8700 },
  { name: "Mechanical Keyboard", revenue: 7300 },
  { name: "External SSD", revenue: 6800 },
  { name: "Wireless Mouse", revenue: 5200 },
]

export function ProductPerformance() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true)
        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/analytics/products/performance`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch product performance data')
        // const data = await response.json()
        // setData(data)

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching product performance data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product performance data. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchProductData()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
