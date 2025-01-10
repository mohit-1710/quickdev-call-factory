import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch: (query: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

const commonSkills = ["React", "Node.js", "Python", "TypeScript", "AWS"];

export function SearchBar({
  onSearch,
  selectedSkills,
  onSkillToggle,
}: SearchBarProps) {
  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search developers..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
      <div className="flex flex-wrap gap-2">
        {commonSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSkillToggle(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}