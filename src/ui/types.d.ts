import React from "react"

export type LayoutProps = {
  children?: React.ReactNode;
}

export type UIComponent = {
  className?: string
}

export type Movie = {
  photo: string,
  rating: string,
  stars: number,
  title: string,
  review: string,
}