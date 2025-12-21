import React , {useState , useEffect } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import  { Button }  from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

const ResetPassword = () => {
    const  [password , setPassword ] = useState("");
    const [confrimPassword , setConfirmPassword ] = useState("");
    const [token , setToken ] = useState<string | null>(null);
    const [message , setMessage ] = useState("");
    const [error , setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl){
            setToken(tokenFromUrl);
        }else{
            setError("Token not found in URL.");
        }
    }
    ,[location]);
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        setError('');
        setMessage('');
        if(password !== confrimPassword){
            setError("Password do not match");
            return;
        }
        if(!token){
            setError("Missing token.");
            return;
        }
        try{
            const response = await fetch(`http://localhost:8080/reset-password`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({token , password}),
            });
            const data = await response.json();
            if(response.ok){
                setMessage(data.message || "Password has been reset successfully");
                setTimeout(()=>{
                    navigate('/'); 
                },3000)
            }else{
                setError(data.message || "Failed to reset password");
            }
        }catch(err){
            setError(`An error occurred. Please try again : ${err}`)
        }
    }

    return <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confrimPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
                    {message && <p className="text-green-500 text-xs mt-4">{message}</p>}
                    <Button className="w-full mt-4" type="submit">
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
}


export default ResetPassword;