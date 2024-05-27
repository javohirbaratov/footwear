import React, { Suspense } from "react";

interface ElementLoadingProps {
  skeletonElement: React.ReactElement;
  children: React.ReactNode;
}

const ElementLoading: React.FC<ElementLoadingProps> = ({
  skeletonElement,
  children,
}) => {
  return <Suspense fallback={skeletonElement}>{children}</Suspense>;
};

export default ElementLoading;
