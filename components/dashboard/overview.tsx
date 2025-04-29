"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 4000,
    inventory: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    inventory: 1398,
  },
  {
    name: "Mar",
    sales: 2000,
    inventory: 9800,
  },
  {
    name: "Apr",
    sales: 2780,
    inventory: 3908,
  },
  {
    name: "May",
    sales: 1890,
    inventory: 4800,
  },
  {
    name: "Jun",
    sales: 2390,
    inventory: 3800,
  },
  {
    name: "Jul",
    sales: 3490,
    inventory: 4300,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#3b82f6" name="Sales ($)" />
        <Bar dataKey="inventory" fill="#10b981" name="Inventory (units)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
