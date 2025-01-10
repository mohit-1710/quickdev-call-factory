import { Developer } from "@/types/developer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Booking requested",
      description: `Requesting a session with ${developer.name}`,
    });
  };

  const getStatusColor = (status: Developer["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="developer-card">
      <CardHeader className="relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div
              className={`status-indicator absolute bottom-0 right-0 ${getStatusColor(
                developer.status
              )}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{developer.name}</h3>
            <p className="text-sm text-muted-foreground">{developer.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {developer.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {developer.skills.map((skill) => (
            <Badge key={skill.name} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          ${developer.hourlyRate}
          <span className="text-sm text-muted-foreground">/hour</span>
        </div>
        <Button onClick={handleBooking}>Book Now</Button>
      </CardFooter>
    </Card>
  );
}