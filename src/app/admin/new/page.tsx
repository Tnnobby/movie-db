"use client";

import AddPhotoCard, { AddPhotoCardRef } from "@/ui/AddPhotoCard";
import Button from "@/ui/Button";
import RatingSelect, { SelectRef } from "@/ui/Rating";
import StarRatingSelect, { StarRatingSelectRef } from "@/ui/StarRatingSelect";
import TextArea from "@/ui/TextArea";
import TextInput from "@/ui/TextInput";
import { useRef } from "react";

const RATINGS = ["G", "PG", "PG-13", "R"];

const Page = () => {
  const photoRef = useRef<AddPhotoCardRef>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<SelectRef>(null);
  const starRatingRef = useRef<StarRatingSelectRef>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

  const submitHandle = async () => {
    const rawData = {
      photo: photoRef.current?.value,
      rating: ratingRef.current?.value,
      stars: starRatingRef.current?.value,
      title: titleRef.current?.value,
      review: reviewRef.current?.value,
    };
    const missingFields = Object.values(rawData).every(
      (val) => val !== undefined
    );
    if (!missingFields) return;

    if (rawData.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = {
          ...rawData,
          photo: reader.result,
          photoType: rawData.photo?.type,
        };
        fetch("/api/new", { method: 'POST', body: JSON.stringify(data) }).then((response) => {
          console.log(response);
        })
      };
      reader.readAsBinaryString(rawData.photo);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <AddPhotoCard ref={photoRef} />
        <div className="flex flex-grow flex-col gap-2">
          <TextInput
            ref={titleRef}
            placeholder="Movie Title"
            className="font-bold"
          />
          <div className="flex flex-row justify-between">
            <RatingSelect ref={ratingRef} values={RATINGS} />
            <StarRatingSelect ref={starRatingRef} />
          </div>
          <TextArea
            ref={reviewRef}
            placeholder="Movie Notes and Review"
            className="flex-grow resize-none"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={submitHandle}>Submit</Button>
      </div>
    </>
  );
};

export default Page;
