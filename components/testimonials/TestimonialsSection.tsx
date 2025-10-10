import dynamic from "next/dynamic";

const InfiniteMovingCards = dynamic(
  () => import("../ui/infinite-moving-cards"),
  {
    ssr: false,
  },
);

interface testimonialData {
  id: number;
  name: string;
  imgSrc: string;
  jobTitle: string;
  testimonial: string;
}

const TestimonialSection = ({
  locale,
  testimonialData,
  testimonialSectionTranslationsData,
}: {
  locale: string;
  testimonialData: testimonialData[];
  testimonialSectionTranslationsData: {
    [key: string]: string;
  };
}) => {
  return (
    <div className="container">
      <div className="section__heading section__heading--2">
        <h2
          className={`${locale === "en" ? "ltr" : "rtl"} section__sub-title text-animate`}
        >
          {testimonialSectionTranslationsData["title"]}
        </h2>
        <h3
          className={`${locale === "en" ? "ltr" : "rtl"} section__title text-animate max-lg:text-[28px] max-md:text-[22px] max-sm:pt-5 max-sm:text-[16px]`}
        >
          {testimonialSectionTranslationsData["subTitle"]}
        </h3>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-md">
        <InfiniteMovingCards
          items={testimonialData}
          direction={locale == "en" ? "right" : "left"}
          speed="slow"
          cardType="testimonials"
          locale={locale}
        />
      </div>
      {/* <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-md">
        <InfiniteMovingCards
          items={testimonialData}
          direction="left"
          speed="slow"
          cardType="testimonials"
          locale={locale}
        />
      </div> */}
    </div>
  );
};

export default TestimonialSection;
