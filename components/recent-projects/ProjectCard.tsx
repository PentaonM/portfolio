"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { memo } from "react";

const PinContainer = dynamic(() => import("../ui/3d-pin"), {
  ssr: false,
});

interface ProjectCardProps {
  project: {
    id: number;
    des: string;
    img: string;
    link: string;
    title: string;
    iconLists: string[];
  };
  locale: string;
  callToAction: string;
}

const ProjectCard = memo(function ProjectCard({
  project,
  locale,
  callToAction,
}: ProjectCardProps) {
  return (
    <div
      className="flex h-[25rem] w-[80vw] items-center justify-center sm:w-96 lg:min-h-[32.5rem]"
      key={project.id}
    >
      <PinContainer title={project.title} href={project.link} locale={locale}>
        <div className="relative mb-10 flex h-[20vh] w-[80vw] items-center justify-center overflow-hidden sm:w-96 lg:max-h-[30vh]">
          <div
            className="relative h-full w-full overflow-hidden lg:rounded-3xl"
            style={{ backgroundColor: "#13162D" }}
          >
            <Image
              src="/bg.svg"
              alt={`background for ${project.title}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              loading="lazy"
            />
          </div>
          <Image
            src={project.img}
            alt={`cover for ${project.title}`}
            className="absolute bottom-0 z-10 h-full w-full object-cover lg:rounded-3xl"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            loading="lazy"
          />
        </div>

        <h1
          className={`${locale === "en" ? "ltr" : "rtl"} line-clamp-1 text-base font-bold md:text-xl lg:text-2xl`}
        >
          {project.title}
        </h1>

        <p
          className={`${locale === "en" ? "ltr" : "rtl"} line-clamp-2 text-sm font-light lg:text-xl lg:font-normal`}
          style={{
            color: "#BEC1DD",
            margin: "1vh 0",
          }}
        >
          {project.des}
        </p>

        <div className="mb-3 mt-7 flex items-center justify-between">
          <div className="flex items-center">
            {project.iconLists.map((icon, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.2] bg-black lg:h-10 lg:w-10"
                style={{
                  transform: `translateX(-${5 * index + 2}px)`,
                }}
              >
                <Image
                  src={icon}
                  alt={`tech icon ${index + 1}`}
                  className="p-2"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <p className="flex text-sm text-purple md:text-xs lg:text-xl">
              {callToAction}
            </p>
          </div>
        </div>
      </PinContainer>
    </div>
  );
});

export default ProjectCard;
