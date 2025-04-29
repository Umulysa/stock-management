"use client"

import { useEffect, useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"
import { useToast } from "@/components/ui/use-toast"

const BACKEND_URL = "http://localhost:8080/api"

// Sample data - will be replaced with API data in production
const sampleData = [
  { name: "New Customers", value: 540, color: "#3b82f6" },
  { name: "Returning Customers", value: 620, color: "#10b981" },
  { name: "Inactive Customers", value: 210, color: "#f59e0b" },
]

export function CustomerMetrics() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true)
        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/analytics/customers`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch customer metrics')
        // const data = await response.json()
        // setData(data)

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching customer metrics:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load customer metrics. Please try again.",
        })
        setIsLoading(false)
      }
    }

    fetchCustomerData()
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
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} customers`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
