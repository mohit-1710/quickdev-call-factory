import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"user" | "developer">("user");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    toast({
      title: "Account Created",
      description: `Your ${userType} account has been created successfully.`,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <p className="text-muted-foreground mt-2">Join our platform today</p>
        </div>

        <Tabs defaultValue="user" className="w-full" onValueChange={(v) => setUserType(v as "user" | "developer")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create User Account
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="developer">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dev-name">Full Name</Label>
                <Input id="dev-name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dev-email">Email</Label>
                <Input id="dev-email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dev-password">Password</Label>
                <Input id="dev-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dev-confirm-password">Confirm Password</Label>
                <Input id="dev-confirm-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" placeholder="React, Node.js, TypeScript" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourly-rate">Hourly Rate (USD)</Label>
                <Input id="hourly-rate" type="number" min="0" required />
              </div>
              <Button type="submit" className="w-full">
                Create Developer Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}