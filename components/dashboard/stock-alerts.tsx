import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, ArrowUpDown } from "lucide-react"
import Link from "next/link"

const stockAlerts = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    sku: "WH-100",
    currentStock: 3,
    minStock: 10,
    status: "Low Stock",
  },
  {
    id: "PRD-002",
    name: "USB-C Cable",
    sku: "USB-C-01",
    currentStock: 0,
    minStock: 15,
    status: "Out of Stock",
  },
  {
    id: "PRD-003",
    name: "Bluetooth Speaker",
    sku: "BS-200",
    currentStock: 5,
    minStock: 8,
    status: "Low Stock",
  },
  {
    id: "PRD-004",
    name: "Laptop Stand",
    sku: "LS-100",
    currentStock: 2,
    minStock: 5,
    status: "Low Stock",
  },
]

export function StockAlerts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
        <span className="text-sm text-muted-foreground">{stockAlerts.length} products require attention</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Stock
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockAlerts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                {product.currentStock} / {product.minStock}
              </TableCell>
              <TableCell>
                <Badge variant={product.status === "Out of Stock" ? "destructive" : "warning"}>{product.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/products/${product.id}`}>
                  <Button size="sm" variant="outline">
                    Restock
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
