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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    sku: "WH-100",
    category: "Electronics",
    price: "$129.99",
    stock: 23,
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "USB-C Cable",
    sku: "USB-C-01",
    category: "Accessories",
    price: "$19.99",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-003",
    name: "Bluetooth Speaker",
    sku: "BS-200",
    category: "Electronics",
    price: "$79.99",
    stock: 15,
    status: "In Stock",
  },
  {
    id: "PRD-004",
    name: "Laptop Stand",
    sku: "LS-100",
    category: "Accessories",
    price: "$49.99",
    stock: 8,
    status: "In Stock",
  },
  {
    id: "PRD-005",
    name: "Mechanical Keyboard",
    sku: "KB-300",
    category: "Electronics",
    price: "$149.99",
    stock: 12,
    status: "In Stock",
  },
  {
    id: "PRD-006",
    name: "Wireless Mouse",
    sku: "WM-100",
    category: "Electronics",
    price: "$39.99",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "PRD-007",
    name: "Monitor Stand",
    sku: "MS-200",
    category: "Accessories",
    price: "$59.99",
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "PRD-008",
    name: "External SSD",
    sku: "SSD-500",
    category: "Storage",
    price: "$89.99",
    stock: 20,
    status: "In Stock",
  },
]

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === products.length && products.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleProduct(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.status === "In Stock"
                      ? "success"
                      : product.status === "Low Stock"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {product.status}
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
                      <Link href={`/dashboard/products/${product.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
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
