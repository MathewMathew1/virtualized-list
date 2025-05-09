import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { render } from "@testing-library/react";
import VirtualizedListContent from "../src/components/VirtualizedList/VirtualizedContent";

const mockItem = ({ index, style }: any) => (
  <div data-testid="item" key={index} style={style}>
    Item {index}
  </div>
);

describe("VirtualizedListContent", () => {
  it("renders only items in visible range", () => {
    const { getAllByTestId } = render(
      <VirtualizedListContent
        data={Array.from({ length: 100 }, (_, i) => `Item ${i}`)}
        itemSize={30}
        direction="vertical"
        firstVisible={5}
        lastVisible={10}
        ItemComponent={mockItem}
        additionalData={null}
        innerStyle={{ height: 1000 }}
      />
    );

    const items = getAllByTestId("item");
    expect(items.length).toBe(6);
    expect(items[0].textContent).toBe("Item 5");
    expect(items[5].textContent).toBe("Item 10");
    expect(items[6]).toBe(undefined);
  });

  it("renders nothing when there is no data", () => {
    const { queryByTestId } = render(
      <VirtualizedListContent
        data={[]}
        itemSize={30}
        direction="vertical"
        firstVisible={0}
        lastVisible={0}
        ItemComponent={mockItem}
        additionalData={null}
        innerStyle={{ height: 1000 }}
      />
    );
  
    const items = queryByTestId("item");
    expect(items).toBeNull(); 
  });

  it("updates the visible items when firstVisible changes", () => {
    const { rerender, getByText, queryByText } = render(
      <VirtualizedListContent
        data={Array.from({ length: 100 }, (_, i) => `Item ${i}`)}
        itemSize={30}
        direction="vertical"
        firstVisible={0}
        lastVisible={1}
        ItemComponent={mockItem}
        additionalData={null}
        innerStyle={{ height: 1000 }}
      />
    );
  
    expect(getByText("Item 0")).toBeInTheDocument();
    expect(queryByText("Item 5")).not.toBeInTheDocument();
  
    rerender(
      <VirtualizedListContent
        data={Array.from({ length: 100 }, (_, i) => `Item ${i}`)}
        itemSize={30}
        direction="vertical"
        firstVisible={5}
        lastVisible={15}
        ItemComponent={mockItem}
        additionalData={null}
        innerStyle={{ height: 1000 }}
      />
    );
  
    expect(getByText("Item 5")).toBeInTheDocument();
  });
});


