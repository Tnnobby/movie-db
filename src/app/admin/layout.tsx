import { LayoutProps } from "@/ui/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="pt-8">
      {children}
    </div>
  );
};

export default Layout;
