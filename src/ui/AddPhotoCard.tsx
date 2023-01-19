"use client";

import Image from "next/image";
import {
  FormEventHandler,
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CircleAddIcon from "./CircleAddIcon";

export type AddPhotoCardRef = {
  value?: Blob;
};

const AddPhotoCard = forwardRef<
  AddPhotoCardRef,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const [imageURI, setImageURI] = useState<string>();
  const [image, setImage] = useState<Blob>();
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      value: image,
    }),
    [image]
  );

  const inputHandle: FormEventHandler<HTMLInputElement> = (ev) => {
    console.log("setting image");
    if (ev.currentTarget.files) {
      setImageURI(window.URL.createObjectURL(ev.currentTarget.files[0]));
      setImage(ev.currentTarget.files[0]);
    }
  };

  return (
    <div
      className="flex aspect-movie items-center justify-center overflow-hidden rounded-lg transition hover:shadow-md lg:w-52"
      ref={containerRef}
    >
      {imageURI ? (
        <Image
          src={imageURI}
          width={containerRef.current?.clientHeight}
          height={containerRef.current?.clientWidth}
          alt="Cover Photo"
        />
      ) : (
        <>
          <label
            htmlFor="image-input"
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-black bg-slate-200 font-sans text-8xl"
          >
            <CircleAddIcon className="scale-50" />
          </label>
          <input
            id="image-input"
            type="file"
            className="hidden"
            onInput={inputHandle}
            accept="image/*"
          />
        </>
      )}
    </div>
  );
});

export default AddPhotoCard;
