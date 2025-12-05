import { Card, CardContent, CardDescription, CardHeader, CardTitle , CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export function Login(){
    return (
        <>
          <div className="grid gap-2 text-left">
            <Label htmlFor="email" >Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required placeholder="Passowrd"/>
          </div>
          <Button className="w-full mt-3">Sign in</Button>
          <div className="mt-4 text-center text-sm">
            <a href="#" className="underline">
              Forgot your password?
            </a>
          </div>
        </>
    )
}

