export type Skill = {
  name: string;
  icon?: string;
};

export type Developer = {
  id: string;
  name: string;
  avatar: string;
  title: string;
  description: string;
  hourlyRate: number;
  skills: Skill[];
  status: 'online' | 'offline' | 'busy';
};