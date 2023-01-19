import { SVGProps } from "react";

const StarIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="37"
      viewBox="0 0 42 39"
      fill="none"
      {...props}
    >
      <path
        d="M19.0531 0.787438C19.3604 -0.117044 20.6396 -0.117041 20.9469 0.787441L24.9334 12.5233C25.0712 12.9288 25.4519 13.2016 25.8803 13.2016H38.6831C39.6625 13.2016 40.058 14.4638 39.2537 15.0228L28.9736 22.167C28.6075 22.4215 28.454 22.8876 28.5975 23.3098L32.542 34.9219C32.8523 35.8354 31.8167 36.6153 31.0244 36.0647L20.5707 28.7998C20.2276 28.5614 19.7724 28.5614 19.4293 28.7998L8.97558 36.0647C8.1833 36.6153 7.14773 35.8354 7.45805 34.9219L11.4025 23.3098C11.546 22.8876 11.3925 22.4215 11.0264 22.167L0.746267 15.0228C-0.0580347 14.4638 0.337493 13.2016 1.31695 13.2016H14.1197C14.5481 13.2016 14.9288 12.9288 15.0666 12.5233L19.0531 0.787438Z"
        className="translate-x-[1px] translate-y-[1px]"
      />
    </svg>
  );
};

export default StarIcon;
