export type ProjectCategory =
  | "Full-Stack"
  | "Backend & API"
  | "Mobile App"
  | "DevOps & Infra"
  | "AI & Agents"
  | "UI & Components"
  | "Tools & Productivity";

export type ProjectStatus =
  | "Production"
  | "Active"
  | "In Progress"
  | "Prototype"
  | "Planned";

export interface ProjectMilestone {
  title: string;
  completed: boolean;
}

export interface ProjectTechStack {
  backend?: string[];
  frontend?: string[];
  mobile?: string[];
  database?: string[];
  infra?: string[];
  tools?: string[];
}

export interface ProjectCommand {
  label: string;
  cmd: string;
}

export interface WorkspaceProject {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  progress: number;
  status: ProjectStatus;
  priority: "High" | "Medium" | "Low";
  techStack: ProjectTechStack;
  keyFeatures: string[];
  milestones: ProjectMilestone[];
  graphStats: {
    nodes: number;
    edges?: number;
  };
  ports?: number[];
  path: string;
  quickCommands?: ProjectCommand[];
  lastUpdated?: string;
  liveUrl?: string;
}
