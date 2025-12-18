import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./contexts/AuthContext";

export function Management() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b">
        <h1 className="text-xl font-bold">Management</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Product Management</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="Enter product name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productPrice">Price</Label>
                <Input id="productPrice" type="number" placeholder="Enter price" />
              </div>
              <Button className="w-full">Add Product</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
               <div className="grid gap-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input id="productId" placeholder="Enter product ID to edit" />
              </div>
              <Button className="w-full" variant="outline">Search Product</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delete Product</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deleteProductId">Product ID</Label>
                <Input id="deleteProductId" placeholder="Enter product ID to delete" />
              </div>
              <Button className="w-full" variant="destructive">Delete Product</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
