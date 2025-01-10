import { useState } from "react";
import { DeveloperCard } from "@/components/DeveloperCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Developer } from "@/types/developer";

// Temporary mock data
const mockDevelopers: Developer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "Senior Full Stack Developer",
    description: "Specialized in React and Node.js with 8 years of experience in building scalable applications.",
    hourlyRate: 150,
    skills: [
      { name: "React" },
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "AWS" },
    ],
    status: "online",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    title: "Cloud Architecture Expert",
    description: "AWS certified developer with expertise in microservices and serverless architecture.",
    hourlyRate: 180,
    skills: [
      { name: "AWS" },
      { name: "Python" },
      { name: "Docker" },
      { name: "Kubernetes" },
    ],
    status: "busy",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Frontend Specialist",
    description: "Passionate about creating beautiful and accessible user interfaces using modern web technologies.",
    hourlyRate: 130,
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
      { name: "Next.js" },
    ],
    status: "offline",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredDevelopers = mockDevelopers.filter((dev) => {
    const matchesSearch = dev.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) =>
        dev.skills.some((s) => s.name === skill)
      );
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl -z-10" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text animate-fade-in">
            Book Developers Instantly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Seamless Crypto Payments. Instant Video Calls.
          </p>
          
          {/* Auth Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <div className="space-y-2">
              <Button
                size="lg"
                className="w-32 hover:scale-105 transition-transform"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <p className="text-sm text-muted-foreground">For Users & Developers</p>
            </div>
            <div className="space-y-2">
              <Button
                size="lg"
                variant="outline"
                className="w-32 hover:scale-105 transition-transform"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <p className="text-sm text-muted-foreground">Create New Account</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar
            onSearch={setSearchQuery}
            selectedSkills={selectedSkills}
            onSkillToggle={handleSkillToggle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </div>
  );
}