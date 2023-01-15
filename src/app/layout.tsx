import './globals.css'
import { LayoutProps } from '../ui/types'

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='h-full w-full'>{children}</body>
    </html>
  )
}
