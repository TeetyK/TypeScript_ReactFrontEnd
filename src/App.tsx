import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth } from './Auth';
import "./index.css";



export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <Card className="w-[400px]">
          <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
            <CardDescription>
              Login or Register to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Auth />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;