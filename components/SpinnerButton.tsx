import { Button, ButtonProps } from "@/components/ui/button";
import { MemoizedLucideReactIcons } from "./common/memoizedIcons/MemoizedLucideReactIcons";

interface SpinnerButtonProps extends ButtonProps {
  locale: string;
  contactFormTranslationsData: {
    [key: string]: string;
  };
  state: boolean;
  name: string;
}

export const SpinnerButton = ({
  locale,
  contactFormTranslationsData,
  state,
  name,
  ...props
}: SpinnerButtonProps) => {
  return (
    <>
      <Button
        className={`${locale === "en" ? "ltr" : "rtl"} group/btn relative mt-8 flex h-10 w-full items-center justify-center gap-4 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
        type="submit"
        disabled={state}
        {...props}
      >
        {state ? (
          <MemoizedLucideReactIcons.Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {contactFormTranslationsData["submit"]}{" "}
            {locale === "en" ? <span>&rarr;</span> : <span>&larr;</span>}
          </>
        )}

        <BottomGradient />
      </Button>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
