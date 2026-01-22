import { useTranslations } from "next-intl";
import { MemoizedLucideReactIcons } from "@/components/common/memoizedIcons/MemoizedLucideReactIcons";

export const useNavItems = () => {
  const translations = useTranslations("NavigationItems");

  return [
    {
      name: translations("About"),
      link: "#about",
      icon: <MemoizedLucideReactIcons.User />,
    },
    {
      name: translations("Projects"),
      link: "#projects",
      icon: <MemoizedLucideReactIcons.BriefcaseBusiness />,
    },
    {
      name: translations("Testimonials"),
      link: "#testimonials",
      icon: <MemoizedLucideReactIcons.MessageCircleHeart />,
    },
    {
      name: translations("Contact"),
      link: "#contact",
      icon: <MemoizedLucideReactIcons.Mail />,
    },
    {
      name: translations("World"),
      link: "#",
      icon: <MemoizedLucideReactIcons.Globe />,
    },
  ];
};

export const useGridItems = () => {
  const translations = useTranslations("AboutSection.GridItems");

  return [
    {
      id: 1,
      title: translations("Title1"),
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/portfolio-1.jpg",
      spareImg: "",
    },
    {
      id: 2,
      title: translations("Title2"),
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: translations("Title3"),
      description: translations("Description3"),
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: translations("Title4"),
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/portfolio-2.jpg",
      spareImg: "/b4.png",
    },
    {
      id: 5,
      title: translations("Title5"),
      description: translations("Description5"),
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/grid.png",
      spareImg: "/b5.png",
    },
    {
      id: 6,
      title: translations("Title6"),
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
};

export const useTestimonialData = () => {
  const translations = useTranslations("TestimonialSection.testimonials");

  return [
    {
      id: 1,
      name: translations("name1"),
      jobTitle: translations("jobTitle1"),
      testimonial: translations("testimonial1"),
      imgSrc: "/naftuli-testimonial.webp",
    },
    {
      id: 2,
      name: translations("name2"),
      jobTitle: translations("jobTitle2"),
      testimonial: translations("testimonial2"),
      imgSrc: "/reviewer-2.jpg",
    },
    {
      id: 3,
      name: translations("name3"),
      jobTitle: translations("jobTitle3"),
      testimonial: translations("testimonial3"),
      imgSrc: "/reviewer-1.jpg",
    },
    {
      id: 4,
      name: translations("name4"),
      jobTitle: translations("jobTitle4"),
      testimonial: translations("testimonial4"),
      imgSrc: "/reviewer-2.jpg",
    },
    {
      id: 5,
      name: translations("name5"),
      jobTitle: translations("jobTitle5"),
      testimonial: translations("testimonial5"),
      imgSrc: "/reviewer-1.jpg",
    },
    {
      id: 6,
      name: translations("name6"),
      jobTitle: translations("jobTitle6"),
      testimonial: translations("testimonial6"),
      imgSrc: "/reviewer-2.jpg",
    },
    {
      id: 7,
      name: translations("name7"),
      jobTitle: translations("jobTitle7"),
      testimonial: translations("testimonial7"),
      imgSrc: "/reviewer-1.jpg",
    },
    {
      id: 8,
      name: translations("name8"),
      jobTitle: translations("jobTitle8"),
      testimonial: translations("testimonial8"),
      imgSrc: "/reviewer-2.jpg",
    },
  ];
};

export const useProjectsData = () => {
  const translations = useTranslations("RecentProjectsSection.projects");

  return [
    {
      id: 1,
      title: translations("projectTitle1"),
      des: translations("projectDescription1"),
      img: "/finance-flow-website.png",
      iconLists: [
        "/next.png",
        "/tail.png",
        "/shadcn.jpg",
        "/ts.png",
        "/c.png",
        "/zod.png",
        "/Prisma-Light.png",
      ],
      link: "https://finance-flow-green.vercel.app/en",
    },
    {
      id: 2,
      title: translations("projectTitle3"),
      des: translations("projectDescription3"),
      img: "/neuro-chat-website.png",
      iconLists: [
        "/next.png",
        "/tail.png",
        "/shadcn.jpg",
        "/ts.png",
        "/c.png",
        "/zod.png",
        "/OpenAI-white-monoblossom.png",
        "/convex-logo.png",
      ],
      link: "https://neuro-chat-one.vercel.app/",
    },
    {
      id: 3,
      title: translations("projectTitle2"),
      des: translations("projectDescription2"),
      img: "/crypto-tracker-website.png",
      iconLists: [
        "/next.png",
        "/tail.png",
        "/shadcn.jpg",
        "/ts.png",
        "/c.png",
        "/zod.png",
        "/coinGecko.png",
        "/Prisma-Light.png",
      ],
      link: "https://crypto-tracker-six-gamma.vercel.app/en/landing",
    },
    {
      id: 4,
      title: translations("projectTitle4"),
      des: translations("projectDescription4"),
      img: "/snippet-hub-website.png",
      iconLists: [
        "/next.png",
        "/tail.png",
        "/shadcn.jpg",
        "/ts.png",
        "/c.png",
        "/zod.png",
        "/mongoDB.png",
      ],
      link: "https://snippet-hub-tau.vercel.app/",
    },
    // {
    //   id: 5,
    //   title: translations("projectTitle5"),
    //   des: translations("projectDescription5"),
    //   img: "/portfolio-details-3.jpg",
    //   iconLists: [
    //     "/next.png",
    //     "/tail.png",
    //     "/shadcn.jpg",
    //     "/ts.png",
    //     "/c.png",
    //     "/zod.png",
    //     "/three.png",
    //   ],
    //   link: "/ui.aiimg.com",
    // },
    // {
    //   id: 6,
    //   title: translations("projectTitle6"),
    //   des: translations("projectDescription6"),
    //   img: "/portfolio-details-3.jpg",
    //   iconLists: [
    //     "/next.png",
    //     "/tail.png",
    //     "/ts.png",
    //     "/three.png",
    //     "/gsap.png",
    //   ],
    //   link: "/ui.apple.com",
    // },
  ];
};

export const useEducationData = () => {
  const translations = useTranslations(
    "ExperienceAndEducationSection.EducationData",
  );

  return [
    {
      id: 1,
      timespan: "2020 - 2022",
      degree: translations("degree1"),
      school: translations("school1"),
      img: "/hyperz-digital.jpg",
    },
    {
      id: 2,
      timespan: "2022 - 2023",
      degree: translations("degree2"),
      school: translations("school2"),
      img: "/john-bryce.jpg",
    },
    {
      id: 3,
      timespan: "2023 - ∞",
      degree: translations("degree3"),
      school: translations("school3"),
      img: "",
    },
  ];
};

export const useWorkExperienceData = () => {
  const translations = useTranslations(
    "ExperienceAndEducationSection.workExperienceData",
  );

  return [
    {
      id: 1,
      timespan: "2020 - 2022",
      position: translations("position1"),
      company: translations("company1"),
      img: "",
    },
    {
      id: 2,
      timespan: "2023 - 2026",
      position: translations("position2"),
      company: translations("company2"),
      img: "/malam-team.jpg",
    },
    {
      id: 3,
      timespan: translations("coming-soon"),
      position: translations("coming-soon"),
      company: translations("coming-soon"),
      img: "",
    },
  ];
};

export const skillData = [
  { id: 1, imgSrc: "/Webflow.svg", title: "Webflow", mastery: 60 },
  { id: 2, imgSrc: "/WordPress-2.svg", title: "WordPress", mastery: 60 },
  {
    id: 3,
    imgSrc: "Visual-Studio-Code.svg",
    title: "Visual Studio Code (VS Code)",
    mastery: 60,
  },
  { id: 4, imgSrc: "/Vite.js.svg", title: "Vite.js", mastery: 60 },
  { id: 5, imgSrc: "/Vue.js.svg", title: "Vue.js", mastery: 60 },
  { id: 6, imgSrc: "/Vercel.svg", title: "Vercel", mastery: 60 },
  { id: 7, imgSrc: "/TypeScript.svg", title: "TypeScript", mastery: 60 },
  { id: 8, imgSrc: "/Tailwind-logo.svg", title: "Tailwind CSS", mastery: 60 },
  { id: 9, imgSrc: "/SQL-Developer.svg", title: "SQL Developer", mastery: 60 },
  {
    id: 10,
    imgSrc: "/Stack-Overflow.svg",
    title: "Stack Overflow",
    mastery: 60,
  },
  { id: 11, imgSrc: "/SQLite.svg", title: "SQLite", mastery: 60 },
  { id: 12, imgSrc: "/Socket.io.svg", title: "Socket.io", mastery: 60 },
  { id: 13, imgSrc: "/Selenium.svg", title: "Selenium", mastery: 60 },
  { id: 14, imgSrc: "/Sass.svg", title: "Sass", mastery: 60 },
  { id: 15, imgSrc: "/Canva.svg", title: "Canva", mastery: 60 },
  { id: 16, imgSrc: "/Redux.svg", title: "Redux", mastery: 60 },
  { id: 17, imgSrc: "/Django.svg", title: "Django", mastery: 60 },
  { id: 18, imgSrc: "/React.svg", title: "React", mastery: 60 },
  { id: 19, imgSrc: "/PyCharm.svg", title: "PyCharm", mastery: 60 },
  { id: 20, imgSrc: "/Python.svg", title: "Python", mastery: 60 },
  { id: 21, imgSrc: "/Postman.svg", title: "Postman", mastery: 60 },
  { id: 22, imgSrc: "/Playwrite.svg", title: "Playwrite", mastery: 60 },
  { id: 23, imgSrc: "/PostgresSQL.svg", title: "PostgreSQL", mastery: 60 },
  { id: 24, imgSrc: "/PHP.svg", title: "PHP", mastery: 60 },
  { id: 25, imgSrc: "/NPM.svg", title: "NPM", mastery: 60 },
  { id: 26, imgSrc: "/Nodemon.svg", title: "Nodemon", mastery: 60 },
  { id: 27, imgSrc: "/Node.js.svg", title: "Node.js", mastery: 60 },
  { id: 28, imgSrc: "/NGINX.svg", title: "NGINX", mastery: 60 },
  { id: 29, imgSrc: "/Next.js.svg", title: "Next.js", mastery: 60 },
  { id: 30, imgSrc: "/MySQL.svg", title: "MySQL", mastery: 60 },
  { id: 31, imgSrc: "/Mongoose.js.svg", title: "Mongoose.js", mastery: 60 },
  { id: 32, imgSrc: "/MongoDB.svg", title: "MongoDB", mastery: 60 },
  {
    id: 33,
    imgSrc: "/Microsoft-SQL-Server.svg",
    title: "Microsoft SQL Server",
    mastery: 60,
  },
  { id: 34, imgSrc: "/Material-UI.svg", title: "Material UI", mastery: 60 },
  { id: 35, imgSrc: "/jQuery.svg", title: "jQuery", mastery: 60 },
  { id: 36, imgSrc: "/JavaScript.svg", title: "JavaScript", mastery: 60 },
  { id: 37, imgSrc: "/GraphQL.svg", title: "GraphQL", mastery: 60 },
  { id: 38, imgSrc: "/Firebase.svg", title: "Firebase", mastery: 60 },
  { id: 39, imgSrc: "/Flask.svg", title: "Flask", mastery: 60 },
  { id: 40, imgSrc: "/Flutter.svg", title: "Flutter", mastery: 60 },
  { id: 41, imgSrc: "/Git.svg", title: "Git", mastery: 60 },
  { id: 42, imgSrc: "/ESLint.svg", title: "ESLint", mastery: 60 },
  { id: 43, imgSrc: "/Express.svg", title: "Express", mastery: 60 },
  { id: 44, imgSrc: "/NET-core.svg", title: ".NET core", mastery: 60 },
  { id: 45, imgSrc: "CSharp.svg", title: "C#", mastery: 60 },
  { id: 46, imgSrc: "/CSS3.svg", title: "CSS3", mastery: 60 },
  { id: 47, imgSrc: "/Azure.svg", title: "Azure", mastery: 60 },
  {
    id: 48,
    imgSrc: "/Azure-SQL-Database.svg",
    title: "Azure SQL Database",
    mastery: 60,
  },
  { id: 49, imgSrc: "/ant-design.svg", title: "ant-design", mastery: 60 },
  { id: 50, imgSrc: "/angular-js.svg", title: "angular.js", mastery: 60 },
  { id: 51, imgSrc: "/html.svg", title: "html", mastery: 60 },
  { id: 52, imgSrc: "/figma.svg", title: "figma", mastery: 60 },
  { id: 53, imgSrc: "/docker.svg", title: "docker", mastery: 60 },
  { id: 54, imgSrc: "/Framer.svg", title: "Framer", mastery: 60 },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git-1.png",
  },
  {
    id: 2,
    img: "/wha.png",
  },
  {
    id: 3,
    img: "/insta.png",
  },
];
