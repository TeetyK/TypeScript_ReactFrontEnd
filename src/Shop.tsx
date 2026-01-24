import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle , CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./contexts/AuthContext";
import { useEffect , useState} from 'react'
export function Shop(){
    const { logout , token } = useAuth();
    const [products , setProducts ] = useState([]);
    const [users , setUsers] = useState([]);
    const handleLogout = () => {
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
            setUsers(data.user || []);
            console.log(data)
            
          }catch(error){
            console.log("Fetch Error",error)
          }
        }
        fetchData();
      },[token]);
      
      useEffect(()=>{
        if(!token){
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
              console.log(data)
    
          }catch(err){
            console.log("Fetch Error",err)
          }
        }
        fetchProductData();
      },[token])
    return (
         <div>
    <div className="flex flex-col min-h-screen">
      
      <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b">
        <h1 className="text-xl font-bold">Shop</h1>
        {users.email} {users.id} {users.name} {users.role} {users.username}
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">รายการสินค้า</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name || 'No Name'}</CardTitle>
                  <CardDescription>{product.description || 'No description available.'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Price: ${product.price || 'N/A'}</p>
                </CardContent>
                <a href="#" className="font-bold underline grid gap-6 md:grid-cols-2 pl-5">Link Description</a>
              </Card>
            ))
          ) : (
            <p>No products to display.</p>
          )}
        </div>
      </main>
    </div>
    </div>
    )
}