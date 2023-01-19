import "./globals.css";
import { LayoutProps } from "../ui/types";
import NavBar from "@/ui/NavBar";
import NavItem from "@/ui/NavItem";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="xl:max-w-5xl m-auto">
        <NavBar className="mt-2">
          <NavItem href={"/"} label={"Home"} />
          <NavItem href={"/movies"} label={"Movies"} />
          <NavItem href={"/tv"} label={"TV Series"} />
        </NavBar>
        <div className="pt-11">{children}</div>
      </body>
    </html>
  );
}
