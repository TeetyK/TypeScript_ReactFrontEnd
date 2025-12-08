import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { APITester } from "./APITester";
import { Login } from './Login'
import { Register } from './Register'
import "./index.css";



export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <Card>
          <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Login to into system with API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Login />
          </CardContent>
        </Card>
      </div>
      <span>TEST
        <Register />
      </span>
    </div>
  );
}

export default App;
