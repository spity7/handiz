import Image from "next/image";
import type { ContentBlock } from "@/types/aboutUs";

type ContentBlocksProps = {
  blocks?: ContentBlock[];
};

export default function ContentBlocks({ blocks = [] }: ContentBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "title":
            return (
              <div className="passage mb_28" key={index}>
                <h5 className="title mb_12">{block.content}</h5>
              </div>
            );

          case "description":
            return (
              <div className="passage mb_28" key={index}>
                <p>{block.content}</p>
              </div>
            );

          case "quote":
            return (
              <div className="quote text-center mb_28" key={index}>
                <span className="divider mx-auto" />
                <p className="h4 mb_16">&ldquo;{block.content}&rdquo;</p>
              </div>
            );

          case "image":
            return block.content ? (
              <div className="img-thumbs mb_28" key={index}>
                <Image
                  src={block.content}
                  alt="content image"
                  width={885}
                  height={498}
                  className="w-100"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : null;

          default:
            return null;
        }
      })}
    </>
  );
}
