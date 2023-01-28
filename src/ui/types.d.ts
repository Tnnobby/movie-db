import React from "react";

export type LayoutProps = {
  children?: React.ReactNode;
};

export type UIComponent = {
  className?: string;
};

export type Movie = {
  _id?: string;
  tmdb_id: number;
  stars: number;
  review: string;
  title: string;
  poster_path: string;
  watch_date: number;
};
