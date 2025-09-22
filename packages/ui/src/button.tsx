import React, { PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
