import Background from "./components/ui/Background";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth } from "./Auth";
import "./index.css";

export function App() {
  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-[400px]">
          <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
            <CardDescription>Login or Register to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Auth />
          </CardContent>
        </Card>
      </div>
    </Background>
  );
}

export default App;