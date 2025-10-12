"use client";
import Slider from "react-slick";
import { memo, useMemo } from "react";
import styles from "./ticker-text-slider.module.css";

const TickerTextSlider = memo(function TickerTextSlider({
  locale,
  tickerTextTranslations,
}: {
  locale: string;
  tickerTextTranslations: { [key: string]: string };
}) {
  const isEnglish = locale === "en";
  const commonClass = `${styles.sliderSlide} ${isEnglish ? "ltr" : "rtl"}`;

  const settingsBase = {
    arrows: false,
    autoplay: true,
    dots: false,
    slidesToShow: 4,
    slide: "span",
    speed: 20000,
    autoplaySpeed: 0,
    cssEase: "linear",
    infinite: true,
    pauseOnHover: false,
    variableWidth: true,
    responsive: [
      { breakpoint: 1560, settings: { slidesToShow: 3 } },
      { breakpoint: 1090, settings: { slidesToShow: 2.5 } },
      {
        breakpoint: 996,
        settings: { slidesToShow: 2.2, centerPadding: "0px" },
      },
      { breakpoint: 870, settings: { slidesToShow: 2 } },
      {
        breakpoint: 750,
        settings: { slidesToShow: 1.5, centerPadding: "20px" },
      },
      {
        breakpoint: 554,
        settings: { slidesToShow: 1.2, centerPadding: "20px" },
      },
    ],
  };

  const settings1 = settingsBase;
  const settings2 = { ...settingsBase, rtl: true };

  const firstSliderItems = useMemo(() => {
    return [1, 2, 3, 4, 5].map((i) => (
      <span className={commonClass} key={`text-${i}`}>
        {tickerTextTranslations[`text${i}`]}
      </span>
    ));
  }, [tickerTextTranslations, commonClass]);

  const secondSliderItems = useMemo(() => {
    return [6, 7, 8, 9, 10].map((i) => (
      <span className={commonClass} key={`text-${i}`}>
        {tickerTextTranslations[`text${i}`]}
      </span>
    ));
  }, [tickerTextTranslations, commonClass]);

  return (
    <div className="tickers">
      <Slider {...settings1} className={styles.bannerTicker}>
        {firstSliderItems}
      </Slider>

      <Slider
        {...settings2}
        className={`${styles.bannerTicker} ${styles.bannerTickerReverse}`}
      >
        {secondSliderItems}
      </Slider>
    </div>
  );
});

export default TickerTextSlider;
