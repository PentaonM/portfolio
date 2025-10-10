import { Spotlight } from "./ui/Spotlight";

function SpotlightEffect() {
  return (
    <>
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="white"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="white" />
      </div>

      <div className="absolute left-0 top-0 flex h-full max-h-full w-full items-center justify-center overflow-hidden bg-white bg-dot-black/[0.3] dark:bg-black-100 dark:bg-dot-white/[0.3]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>
    </>
  );
}

export default SpotlightEffect;
