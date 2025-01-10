import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"user" | "developer">("user");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    toast({
      title: "Login Successful",
      description: `Welcome back! You've logged in as a ${userType}.`,
    });
    navigate(userType === "user" ? "/user-dashboard" : "/developer-dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Tabs defaultValue="user" className="w-full" onValueChange={(v) => setUserType(v as "user" | "developer")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign In as User
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="developer">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dev-email">Email</Label>
                <Input id="dev-email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dev-password">Password</Label>
                <Input id="dev-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign In as Developer
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/signup")}>
            Don't have an account? Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}