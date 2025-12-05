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
      className="flex min-h-[32.5rem] w-[80vw] items-center justify-center sm:w-96"
      key={project.id}
    >
      <PinContainer title={project.title} href={project.link} locale={locale}>
        <div className="flex h-full flex-col">
          <div className="relative mb-10 flex w-[80vw] items-center justify-center overflow-hidden sm:w-96">
            <div
              className="relative w-full overflow-hidden lg:rounded-3xl"
              style={{ backgroundColor: "#13162D" }}
            >
              <div className="relative w-full overflow-hidden lg:rounded-3xl">
                <div className="w-full" style={{ aspectRatio: "5 / 4" }} />
                <Image
                  src="/bg.svg"
                  alt=""
                  aria-hidden
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <Image
              src={project.img}
              alt={`cover for ${project.title}`}
              className="absolute inset-0 z-10 h-full w-full object-cover lg:rounded-3xl"
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24rem"
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

          <div className="mb-3 mt-auto flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {project.iconLists.map((icon, index) => (
                <div
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.2] bg-black lg:h-10 lg:w-10"
                >
                  <Image
                    src={icon}
                    alt={`tech icon ${index + 1}`}
                    className="h-5 w-5 object-contain lg:h-6 lg:w-6"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full rounded-xl border border-purple/40 bg-purple/10 px-4 py-3 text-center text-sm font-semibold text-purple transition hover:border-purple/60 hover:bg-purple/15 hover:text-purple md:text-base"
            >
              {callToAction}
            </button>
          </div>
        </div>
      </PinContainer>
    </div>
  );
});

export default ProjectCard;
