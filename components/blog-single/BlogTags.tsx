type BlogTagsProps = {
  tags?: string[];
};

export default function BlogTags({ tags = [] }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <>
      {tags.map((tag, index) => (
        <li key={index}>
          <a href="#" className="tag text-caption-1">
            {tag}
          </a>
        </li>
      ))}
    </>
  );
}
