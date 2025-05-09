import React from "react";
import { render } from "@testing-library/react";
import { VirtualizedList } from "../src/components/VirtualizedList/VirtualizedList";
import { VirtualizedItemStyle } from "../src/types/VirtualizedListTypes";

const mockItem = ({
  index,
  style,
}: {
  index: number;
  style: VirtualizedItemStyle;
}) => (
  <div data-testid="item" key={index} style={style}>
    Item {index}
  </div>
);

const data = Array.from({ length: 100 }, (_, i) => `Item ${i}`);
const itemSize = 30;
const height = 100;

describe("VirtualizedList with padded WrapperComponent", () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper" style={{ padding: 20 }}>
      {children}
    </div>
  );

  it("renders the different number of visible items with and without padding", () => {
    const renderWithWrapper = render(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={height}
        ItemComponent={mockItem}
        WrapperComponent={Wrapper}
      />
    );

    const itemsWithPadding = renderWithWrapper.getAllByTestId("item").length;

    const renderWithoutWrapper = render(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={height}
        ItemComponent={mockItem}
      />
    );

    const itemsWithoutPadding =
      renderWithoutWrapper.getAllByTestId("item").length;

    expect(itemsWithPadding).not.toBe(itemsWithoutPadding);
  });
});
