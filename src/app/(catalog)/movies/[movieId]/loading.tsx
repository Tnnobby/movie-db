import LoadingAnimation from "@/ui/LoadingAnimation";
import { ReactNode } from "react";

const Loading = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25">
        <LoadingAnimation />
      </div>
      {children}
    </>
  );
};

export default Loading;
