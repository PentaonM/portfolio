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

  return (
    <Image
      src={img}
      width={65}
      height={65}
      alt={`logo - ${altText}`}
      loading="lazy"
    />
  );
};

export default IconRenderer;
