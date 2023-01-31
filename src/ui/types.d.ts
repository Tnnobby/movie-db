import React from "react";

export type Params = { [key: string]: string | string[] };

export type LayoutProps = {
  children?: React.ReactNode;
  params?: Params;
};

export type PageProps<P extends Params = void> = {
  params: P;
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
