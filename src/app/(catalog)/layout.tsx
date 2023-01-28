import { LayoutProps } from "../../ui/types";

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="mt-10">
      {children}
    </main>
  );
}
