export type BlogPost = {
  id: string | number;
  title: string;
  imgSrc?: string;
  category?: string;
  date: string;
  author: string;
  excerpt?: string;
};
