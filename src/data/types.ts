import data from './projects.json';

export interface Project {
  slug: string;
  name: string;
  description: string;
  category: string;
  featured: boolean;
  languages: string[];
  topics: string[];
  url: string;
  homepage: string | null;
  updatedAt: string;
  hasReadme: boolean;
  readmeSummary: string | null;
  images: string[];
}

export const projects = data as Project[];
