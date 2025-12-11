import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async () => {
        setError('');
        setMessage('');
        try {
            const response = await fetch('http://localhost:8080/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.message || "An error occured");
            }
        } catch (err) {
            setError("An error occured. Please try again");
        }
    };

    return (
        <div className="container mx-auto p-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>Enter your email to reset your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <Button className="w-full mt-3" onClick={handleForgotPassword}>Submit</Button>
                        {message && <div className="mt-4 text-sm text-green-500">{message}</div>}
                        {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
                        <div className="mt-4 text-center text-sm">
                          <a href="/" className="underline">
                            Go back
                          </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
