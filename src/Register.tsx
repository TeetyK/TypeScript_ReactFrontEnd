import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register(){
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [name , setName ] = useState('');
    const [username , setUsername ] = useState('');
    const [error , setError ] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');
        try {
          const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password ,username}),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/management');
          } else {
            setError(data.message || "An error occured");
          }
        } catch (err) {
          setError("An error occured. Please try again");
        }
    };

    return (
        <>
            <div className="grid gap-2 text-left">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="name">Username</Label>
                <Input id="name" type="text" placeholder="UserName" required value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="grid gap-2 text-left">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button className="w-full mt-3" onClick={handleRegister}>Sign up</Button>
            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
        </>
    )
}
