import Datetime from "./Datetime";
import type { ProjectFrontMatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: ProjectFrontMatter;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="mb-1 inline-block text-xl font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-xl font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-xl font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} className="mt-1"/>
      <p className="mt-2">{description}</p>
    </li>
  );
}
