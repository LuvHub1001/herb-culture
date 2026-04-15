import { ReactNode, memo } from "react";

interface RenderProps<T> {
  className?: string;
  items: T[];
  render: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
}

function RenderComponentInner<T>({
  className,
  items,
  render,
  getKey,
}: RenderProps<T>) {
  if (!items?.length) return null;
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {render(item, index)}
        </div>
      ))}
    </div>
  );
}

const RenderComponent = memo(RenderComponentInner) as typeof RenderComponentInner;

export default RenderComponent;
