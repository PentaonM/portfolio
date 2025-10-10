import React, { createContext, useContext } from "react";

const LocaleContext = createContext<{ locale: string }>({ locale: "en" });

export const LocaleProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
