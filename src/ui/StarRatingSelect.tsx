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

export type StarRatingSelectProps = {
  initialValue?: number;
  editable?: boolean;
};

export type StarRatingSelectRef = {
  value: number;
};

const StarRatingSelect = forwardRef<StarRatingSelectRef, StarRatingSelectProps>(
  ({ initialValue, editable = true }, ref) => {
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
      <div className="flex flex-row rounded-md transition-all hover:shadow-md">
        <div className="text-sans mx-2 flex select-none items-center justify-center text-lg font-bold text-yellow-400">
          {(rating / 20) * 10}
        </div>
        <div
          ref={contRef}
          className="relative cursor-pointer"
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
                <StarIcon
                  key={`star_select_${index}`}
                  className="py-1"
                  fill="transparent"
                  stroke="gold"
                  strokeWidth={2}
                />
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
                    <StarIcon
                      key={`star_select_${index}`}
                      className="py-1"
                      fill="gold"
                      stroke="gold"
                      strokeWidth={2}
                    />
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

StarRatingSelect.displayName = "StarRatingSelect"
export default StarRatingSelect;
