import Image from "next/image";
import { UIComponent } from "./types";

export type MovieCardProps = {
  title: string;
  releaseYear?: string;
  rating?: string;
  id?: number;
  coverPhoto?: any;
} & UIComponent;

const MovieCard = ({
  className,
  coverPhoto,
  id,
  rating,
  releaseYear,
  title,
}: MovieCardProps) => (
  <div className="rounded-xl overflow-hidden flex flex-col ">
    <Image src={coverPhoto} alt={title} />

  </div>
);

export default MovieCard;
