import { useState } from "react";
import { DeveloperCard } from "@/components/DeveloperCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Video, CreditCard, Clock } from "lucide-react";
import { useDevelopers } from "@/hooks/useDevelopers";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const { developers, loading, error } = useDevelopers();

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => dev.skills.some((s) => s.name === skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            QuickDev
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm hover:text-primary transition-colors">Home</a>
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#developers" className="text-sm hover:text-primary transition-colors">Developers</a>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden md:inline-flex hover:text-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="hover:scale-105 transition-transform"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="pt-24 pb-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text animate-fade-in">
            Book Developers Instantly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
            Connect with expert developers through instant video calls and seamless crypto payments.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="w-full sm:w-auto hover:scale-105 transition-transform animate-fade-in"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto hover:scale-105 transition-transform animate-fade-in"
              onClick={() => navigate("/login")}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Video Calls</h3>
              <p className="text-muted-foreground">Connect with developers instantly through high-quality video calls.</p>
            </div>
            <div className="p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crypto Payments</h3>
              <p className="text-muted-foreground">Secure and fast payments using your preferred cryptocurrency.</p>
            </div>
            <div className="p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Booking</h3>
              <p className="text-muted-foreground">Book sessions with available developers in real-time.</p>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div id="developers" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Available Developers</h2>
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar
              onSearch={setSearchQuery}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
            />
          </div>

          {error && (
            <div className="text-center text-red-500 mb-8">
              Failed to load developers. Please try again later.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </div>
              ))
            ) : (
              filteredDevelopers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">QuickDev</h3>
              <p className="text-muted-foreground">Connect with expert developers instantly.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:support@quickdev.com" className="block text-muted-foreground hover:text-primary transition-colors">
                  support@quickdev.com
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm mt-12">
            © 2024 QuickDev. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
