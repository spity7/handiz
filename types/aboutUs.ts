export type ContentBlock = {
  type: "title" | "image" | "description" | "quote";
  content: string;
};

export type AboutUs = {
  _id: string;
  contentBlocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
};
