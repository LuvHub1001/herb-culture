import { ReactNode } from "react";

interface RenderProps<T> {
  className: string;
  items: T[];
  render: (item: T) => ReactNode;
}

function RenderComponent<T>({ className, items, render }: RenderProps<T>) {
  return (
    items && (
      <div className={className}>
        {items.map((item, _idx: number) => {
          return <div key={_idx}>{render(item)}</div>;
        })}
      </div>
    )
  );
}

export default RenderComponent;
