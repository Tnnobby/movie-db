import { Player } from "@lottiefiles/react-lottie-player";

const LoadingAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Player
        src="https://assets9.lottiefiles.com/packages/lf20_fyye8szy.json"
        autoplay
        loop
        style={{ height: "45px" }}
      />
    </div>
  );
};

export default LoadingAnimation;
