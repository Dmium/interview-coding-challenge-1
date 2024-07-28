import React from "react";

export interface PageLayoutProps {
  title: string;
}

export const PageLayout: React.FC<React.PropsWithChildren<PageLayoutProps>> = ({
  title,
  children,
}: React.PropsWithChildren<PageLayoutProps>) => {
  return (
    <div>
      <h1 className="mb-3">{title}</h1>
      {children}
    </div>
  );
};
