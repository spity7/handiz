export type Project = {
  _id: string;
  title: string;
  student: string;
  area: string;
  description: string;
  order: number;
  thumbnailUrl: string;
  gallery: string[];
  concept: string[];
  type: string[];
  category: string[];
  year: string[];
  location: string[];
  university: string[];
  contentBlocks: {
    type: "title" | "image" | "description" | "quote";
    content: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
