"use client";

import {
  forwardRef,
  MouseEventHandler,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import StarIcon from "./StarIcon";
import cn from "classnames";

export type StarRatingSelectProps = {
  initialValue?: number;
  editable?: boolean;
  color?: string;
  labelShown?: boolean;
  size?: "small" | "default";
};

export type StarRatingSelectRef = {
  value: number;
};

const StarRatingSelect = forwardRef<StarRatingSelectRef, StarRatingSelectProps>(
  (
    {
      initialValue,
      editable = true,
      color = "#ffd700",
      labelShown = true,
      size = "default",
    },
    ref
  ) => {
    const [rating, setRating] = useState(initialValue || 0);
    const [tempRating, setTempRating] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [layout, setLayout] = useState<DOMRect>();
    const contRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      contRef.current && setLayout(contRef.current.getBoundingClientRect());
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        value: rating,
      }),
      [rating]
    );

    const hoverHandle: MouseEventHandler<HTMLDivElement> = (ev) => {
      if (layout) {
        const _layout = ev.currentTarget.getBoundingClientRect();
        const x = ev.clientX - _layout.x;
        const stars = Math.ceil((x / layout.width) * 20);
        setTempRating(stars);
      }
    };
    const clickHandle = () => {
      setRating(tempRating);
    };

    return (
      <div
        className={cn("flex w-min flex-row rounded-md transition-all", {
          "hover:shadow-md": editable,
        })}
      >
        {labelShown && (
          <div
            className="text-sans mx-2 flex select-none items-center justify-center text-lg font-bold"
            style={{ color }}
          >
            {(rating / 20) * 10}
          </div>
        )}
        <div
          ref={contRef}
          className={cn("relative", { "cursor-pointer": editable })}
          onMouseEnter={editable ? () => setIsHovering(true) : undefined}
          onMouseLeave={
            editable
              ? () => {
                  setIsHovering(false);
                  setTempRating(0);
                }
              : undefined
          }
          onMouseMove={editable ? hoverHandle : undefined}
          onClick={editable ? clickHandle : undefined}
        >
          <div className="flex flex-row">
            {new Array(10).fill("").map((_, index) => {
              return (
                <div key={`star_select_${index}`} className={size === "small" ? "h-9 w-9" : "h-10 w-10"}>
                  <StarIcon
                    className="py-1"
                    fill="transparent"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="true"
                    stroke={color}
                    strokeWidth={2}
                  />
                </div>
              );
            })}
          </div>
          {layout && (
            <div
              className="absolute right-0 top-0 left-0 overflow-hidden"
              style={{
                width: isHovering
                  ? `${(tempRating / 20) * 100}%`
                  : `${(rating / 20) * 100}%`,
              }}
            >
              <div
                className="flex h-full flex-row overflow-hidden transition-all"
                style={{ width: layout.width }}
              >
                {new Array(10).fill("").map((_, index) => {
                  return (
                    <div key={`star_select_${index}`} className={size === "small" ? "h-9 w-9" : "h-10 w-10"}>
                      <StarIcon
                        className="py-1"
                        fill={color}
                        height="100%"
                        width="100%"
                        stroke={color}
                        strokeWidth={2}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

StarRatingSelect.displayName = "StarRatingSelect";
export default StarRatingSelect;
