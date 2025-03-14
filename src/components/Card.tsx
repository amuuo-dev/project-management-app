import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 md:px-5 py-4 md:py-3 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
