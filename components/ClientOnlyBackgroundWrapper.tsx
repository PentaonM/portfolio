"use client";

import { BackgroundGradient } from "./ui/background-gradient";

export const ClientOnlyBackgroundWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <BackgroundGradient className={className}>{children}</BackgroundGradient>;
