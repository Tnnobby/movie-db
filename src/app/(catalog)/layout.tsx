import cn from "classnames";
import { LayoutProps } from "../../ui/types";

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="mt-10">
      <div className="lg:mx-6">{children}</div>
    </main>
  );
}
