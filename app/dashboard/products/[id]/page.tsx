"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ProductInventoryHistory } from "@/components/dashboard/products/product-inventory-history"

const BACKEND_URL = "http://localhost:8080/api"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: string
  stock: number
  status: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const productId = params.id as string

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)

        // Uncomment and modify this to connect to your actual Spring Boot API
        // const response = await fetch(`${BACKEND_URL}/products/${productId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch product details')
        // const data = await response.json()
        // setProduct(data)

        // Mock data for demonstration
        setTimeout(() => {
          setProduct({
            id: productId,
            name: "Wireless Headphones",
            sku: "WH-100",
            category: "Electronics",
            price: "$129.99",
            stock: 23,
            status: "In Stock",
            description:
              "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals alike.",
            createdAt: "2023-01-15T10:30:00Z",
            updatedAt: "2023-04-20T14:45:00Z",
          })
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching product details:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details. Please try again.",
        })
        setIsLoading(false)
      }
    }

    // fetchProduct()
  }, [productId, toast])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      // Uncomment and modify this to connect to your actual Spring Boot API
      // await fetch(`${BACKEND_URL}/products/${productId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully.",
      })

      router.push("/dashboard/products")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product. Please try again.",
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

  if (!product) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg font-medium">Product not found</p>
          <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
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
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <Badge
            variant={
              product.status === "In Stock" ? "success" : product.status === "Low Stock" ? "warning" : "destructive"
            }
          >
            {product.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/products/${productId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="inventory">Inventory History</TabsTrigger>
          <TabsTrigger value="orders">Related Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Basic details about the product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">SKU</p>
                    <p>{product.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p>{product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stock</p>
                    <p>{product.stock} units</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="mt-1">{product.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
                <CardDescription>Additional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created At</p>
                    <p>{new Date(product.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p>{new Date(product.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Restock Product</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory History</CardTitle>
              <CardDescription>Track stock level changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductInventoryHistory productId={productId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Orders</CardTitle>
              <CardDescription>Orders containing this product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">No orders found for this product</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
