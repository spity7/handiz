export interface Competition {
  _id: string;
  title: string;
  category: string;
  prize: string;
  description: string;
  link: string;
  order: number;
  thumbnailUrl: string;
  side: "1" | "2";
  deadline: string;
}
