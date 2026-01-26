import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle , CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./contexts/AuthContext";
// import LiquidEther from "./components/LiquidEther";
import {useEffect , useState} from "react";

interface Product {
  id: number,
  sku: string,
  name: string,
  description: string,
  price: number,
  stock_quantity: number,
  category_id: number,
  image_url: string,
  created_at: string,
  updated_at: string
}

export function Management() {
  const { logout , token } = useAuth();
  // const [ information , setInformation] = useState(null);
  const [_id , setId ] = useState('');
  const [_name , setName ] = useState('');
  const [_email , setEmail ] = useState('');
  const [_username , setUsername ] = useState('');
  const [isProduct , setIsProduct] = useState(true);
  const [products , setProducts ] = useState<Product[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    image_url: "",
  });

  const handleLogout = () => {
    // setInformation(null)
    logout();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [id]: ['price', 'stock_quantity', 'category_id'].includes(id) ? Number(value) : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
      // Refresh products list
      setRefreshKey(oldKey => oldKey + 1);
      // Clear form
      setNewProduct({
        sku: "",
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        category_id: 0,
        image_url: "",
      });
      setIsAddProductModalOpen(false); // Close modal on success
    } catch (error) {
      console.log("Fetch Error", error)
    }
  };

  const handleDescriptionClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDescriptionModalOpen(true);
  };

  useEffect(()=>{
    if(!token){
      return ;
    } 
    const fetchData = async () => {
      try{
        const response = await fetch(`http://localhost:8080/`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        });
        if(!response.ok){
          throw new Error(`HTTP error! status ${response.status}`);
        }
        const data = await response.json();
        setId(data.user.id)
        setName(data.user.name)
        setEmail(data.user.email)
        setUsername(data.user.username)
        console.log(data)
        // console.log(data.data[0].updated_at)

      }catch(error){
        console.log("Fetch Error",error)
      }
    }
    fetchData();
  },[token]);
  
  useEffect(()=>{
    if(!token || !isProduct){
      setProducts([]);
      return ;
    }
    const fetchProductData = async () => {
      try{
        const response = await fetch(`http://localhost:8080/products`,{
          method:'GET',
          headers:{
            'Content-Type':"application/json",
            'Authorization':`Bearer ${token}`
          }
          });
          if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`);
          }
          const data = await response.json();
          setProducts(data.data || []);
          // console.log(data)

      }catch(err){
        console.log("Fetch Error",err)
      }
    }
    fetchProductData();
  },[isProduct , token, refreshKey])
  
  return (
    
    <div>
        {/* <div className="absolute inset-0">
              <LiquidEther/>
        </div> */}
    <div className="flex flex-col min-h-screen">
      
      <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b">
        <h1 className="text-xl font-bold">Management</h1>
        <button
          className={`px-4 py-2 ${isProduct ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setIsProduct(true)}
        >
          Product
        </button>
        {/* <div className='text-xl font-bold'>Product</div> */}
        <div className='text-xl font-bold'>Chatbot</div>
        <div className='text-xl font-bold'>Forecast_Stack</div>
        {/* <div className='text-xl font-bold'>Product</div> */}
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Product List</h2>
          <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new product.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sku" className="text-right">
                    SKU
                  </Label>
                  <Input id="sku" value={newProduct.sku} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={newProduct.name} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input id="description" value={newProduct.description} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input id="price" type="number" value={newProduct.price} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock_quantity" className="text-right">
                    Stock
                  </Label>
                  <Input id="stock_quantity" type="number" value={newProduct.stock_quantity} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category_id" className="text-right">
                    Category ID
                  </Label>
                  <Input id="category_id" type="number" value={newProduct.category_id} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image_url" className="text-right">
                    Image URL
                  </Label>
                  <Input id="image_url" value={newProduct.image_url} onChange={handleInputChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddProduct}>Save product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>SKU: {product.sku}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price: ${product.price}</p>
                  <p className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDescriptionClick(product)}>Description</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedProduct && (
          <Dialog open={isDescriptionModalOpen} onOpenChange={setIsDescriptionModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  SKU: {selectedProduct.sku}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-48 object-cover rounded-md" />
                <p><span className="font-semibold">Description:</span> {selectedProduct.description}</p>
                <p><span className="font-semibold">Price:</span> ${selectedProduct.price}</p>
                <p><span className="font-semibold">Stock:</span> {selectedProduct.stock_quantity}</p>
                <p><span className="font-semibold">Category ID:</span> {selectedProduct.category_id}</p>
                <p><span className="font-semibold">Created At:</span> {new Date(selectedProduct.created_at).toLocaleString()}</p>
                <p><span className="font-semibold">Last Updated:</span> {new Date(selectedProduct.updated_at).toLocaleString()}</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDescriptionModalOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
    </div>
  );
}
