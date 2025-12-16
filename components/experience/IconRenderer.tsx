import Image from "next/image";
import { MemoizedLucideReactIcons } from "../common/memoizedIcons/MemoizedLucideReactIcons";

const IconRenderer = ({
  type,
  id,
  img,
  altText,
}: {
  type: "education" | "work";
  id: number;
  img: string;
  altText: string;
}) => {
  // If image exists, prioritize showing the image
  if (img && img.trim() !== "") {
    return (
      <Image
        src={img}
        width={65}
        height={65}
        alt={`logo - ${altText}`}
        loading="lazy"
      />
    );
  }

  // Fallback to icons when no image is provided
  if (type === "education") {
    if (id === 1)
      return (
        <MemoizedLucideReactIcons.SchoolIcon
          color="#131842"
          width={30}
          height={30}
        />
      );
    if (id === 3)
      return (
        <MemoizedLucideReactIcons.BrainIcon
          color="#FF5733"
          width={30}
          height={30}
        />
      );
  }

  if (type === "work" && id === 1) {
    return (
      <MemoizedLucideReactIcons.BriefcaseBusiness width={30} height={30} />
    );
  }

  // Default fallback - return null if no image and no matching icon
  return null;
};

export default IconRenderer;
