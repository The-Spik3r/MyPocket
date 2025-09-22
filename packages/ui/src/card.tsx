import React, { PropsWithChildren } from 'react';

interface CardProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLAnchorElement>> {
  className?: string;
  title: string;
  href: string;
}

export const Card: React.FC<CardProps> = ({
  className,
  title,
  href,
  children,
  ...props
}) => {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
};
