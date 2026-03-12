export type ProjectStatus = "active" | "paused" | "done";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  lastUpdated: string;
  link: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Kreova",
    status: "active",
    lastUpdated: "2026-03-10",
    link: "https://kreova.com",
    description: "E-commerce platform for creative products",
  },
  {
    id: "2",
    name: "WuWei",
    status: "active",
    lastUpdated: "2026-03-08",
    link: "https://wuwei.app",
    description: "Mindfulness and productivity app",
  },
  {
    id: "3",
    name: "Portfolio",
    status: "active",
    lastUpdated: "2026-03-05",
    link: "https://portfolio.dev",
    description: "Personal portfolio website",
  },
  {
    id: "4",
    name: "Student Hub",
    status: "paused",
    lastUpdated: "2026-02-20",
    link: "https://studenthub.io",
    description: "Resource sharing platform for students",
  },
  {
    id: "5",
    name: "DaoFlow",
    status: "active",
    lastUpdated: "2026-03-11",
    link: "https://daoflow.xyz",
    description: "Decentralized governance tooling",
  },
  {
    id: "6",
    name: "PhD",
    status: "active",
    lastUpdated: "2026-03-12",
    link: "#",
    description: "Doctoral research — distributed systems",
  },
  {
    id: "7",
    name: "Trading Bot",
    status: "paused",
    lastUpdated: "2026-02-14",
    link: "#",
    description: "Algorithmic crypto trading system",
  },
  {
    id: "8",
    name: "Book",
    status: "done",
    lastUpdated: "2026-01-30",
    link: "#",
    description: "Technical writing project",
  },
];
