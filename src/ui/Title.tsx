import { HTMLAttributes } from "react";
import cn from 'classnames'

export type TitleProps = HTMLAttributes<HTMLDivElement>;

const Title = ({ children, className, ...props }: TitleProps) => (
  <div className={cn('text-2xl font-bold', className)} {...props}>{children}</div>
);

export default Title;
