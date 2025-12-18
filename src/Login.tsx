import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export function Login(){
  const [email , setEmail ] = useState('');
  const [password , setPassword ] = useState('');
  const [error , setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:8080/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email , password}),
      });
      const data = await response.json();
      if(response.ok){
        login(data.token);
        navigate('/management');
      }else{
        setError(data.message || "An error occured");
      }
    }catch(err){
      setError("An error occured. Please try again");
    }
  }

  return (
      <>
        <div className="grid gap-2 text-left">
          <Label htmlFor="email" >Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="grid gap-2 text-left">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="Passowrd" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <Button className="w-full mt-3" onClick={handleLogin}>Sign in</Button>
        <div className="mt-4 text-center text-sm">
          <a href="/forgot-password" className="underline">
            Forgot your password?
          </a>
        </div>
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
      </>
  )
}