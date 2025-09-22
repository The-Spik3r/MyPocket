import React, { PropsWithChildren } from 'react';

interface ComponentProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
