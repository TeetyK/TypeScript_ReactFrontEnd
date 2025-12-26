import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle , CardDescription } from "@/components/ui/card";
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
  const handleLogout = () => {
    // setInformation(null)
    logout();
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
  },[isProduct , token])
  
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
              <div>ID : {_id}</div>
              <div>Name : {_name}</div>
              <div>Email : {_email}</div>
              <div>Username : {_username}</div>
              <div>Token : {token.slice(1,20)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product List</CardTitle>
              <CardDescription>Total : {products.length} </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 max-h-96 overflow-y-auto pr-4">
             {products.map((product) => (
              <div key={product.id} className="border p-3 rounded-md bg-muted/20">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.price}</p>
              </div>
             ))}
              
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  );
}
