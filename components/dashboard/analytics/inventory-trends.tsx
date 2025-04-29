"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useToast } from "@/components/ui/use-toast"

const BACKEND_URL = "http://localhost:8080/api"

// Sample data - will be replaced with API data in production
const sampleData = [
  { month: "Jan", stock: 120 },
  { month: "Feb", stock: 140 },
  { month: "Mar", stock: 160 },
  { month: "Apr", stock: 180 },
  { month: "May", stock: 200 },
  { month: "Jun", stock: 220 },
  { month: "Jul", stock: 240 },
  { month: "Aug", stock: 220 },
  { month: "Sep", stock: 200 },
  { month: "Oct", stock: 180 },
  { month: "Nov", stock: 160 },
  { month: "Dec", stock: 140 },
]

export function InventoryTrends() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setIsLoading(true)
        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/analytics/inventory/trends`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch inventory trend data')
        // const data = await response.json()
        // setData(data)

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching inventory trend data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load inventory trend data. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchInventoryData()
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
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} units`, "Stock Level"]} />
        <Area type="monotone" dataKey="stock" stroke="#10b981" fill="#10b98133" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
