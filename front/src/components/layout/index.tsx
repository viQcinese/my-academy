import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <div className="p-4 bg-teal-700 ">
        <nav className="flex max-w-site m-auto justify-between ">
          <div>o</div>
          <div className="flex  gap-2">
            <a>hello</a>
            <a>hello</a>
          </div>
        </nav>
      </div>
      <main className="max-w-site m-auto">{children}</main>
    </div>
  );
}
