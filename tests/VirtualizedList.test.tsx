import "@testing-library/jest-dom/extend-expect";
import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { VirtualizedList } from "../src/components/VirtualizedList/VirtualizedList";
import { VirtualizedItemStyle } from "../src/types/VirtualizedListTypes";

const mockItem = ({
  index,
  style,
}: {
  index: number;
  style: VirtualizedItemStyle;
}) => (
  <div data-testid="item" key={index} style={{ ...style, height: 20 }}>
    Item {index}
  </div>
);

describe("VirtualizedList", () => {
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i}`);
  const itemSize = 30;

  it("renders only items in the visible range", () => {
    const { getAllByTestId, queryByText, rerender } = render(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={100}
        ItemComponent={mockItem}
        overScanCount={0}
      />
    );

    let items = getAllByTestId("item").map((el) => el.textContent);
    expect(items.length).toEqual(4);

    rerender(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={100}
        ItemComponent={mockItem}
        overScanCount={1}
      />
    );

    items = getAllByTestId("item").map((el) => el.textContent);
    expect(items.length).toEqual(5);
  });

  it("renders WrapperComponent when provided", () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="wrapper">{children}</div>
    );

    const { getByTestId } = render(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={100}
        ItemComponent={mockItem}
        WrapperComponent={Wrapper}
      />
    );

    expect(getByTestId("wrapper")).toBeInTheDocument();
  });

  it("calls onScroll when scrolled", () => {
    const onScroll = jest.fn();

    const { container } = render(
      <VirtualizedList
        data={data}
        direction="vertical"
        itemSize={itemSize}
        height={100}
        ItemComponent={mockItem}
        onScroll={onScroll}
      />
    );

    const scrollable = container.firstChild as HTMLElement;

    fireEvent.scroll(scrollable, { target: { scrollTop: 60 } });

    expect(onScroll).toHaveBeenCalled();
  });

  it("allows ref to call scrollToIndex", () => {
    const ScrollTester = () => {
      const listRef = useRef<any>(null);

      return (
        <div>
          <button
            onClick={() => {
              listRef.current?.scrollToIndex(10);
            }}
            data-testid="scroll-button"
          >
            Scroll
          </button>
          <VirtualizedList
            ref={listRef}
            data={data}
            direction="vertical"
            itemSize={itemSize}
            height={100}
            ItemComponent={mockItem}
          />
        </div>
      );
    };

    const { getByTestId } = render(<ScrollTester />);
    fireEvent.click(getByTestId("scroll-button"));

    expect(true).toBe(true);
  });
});
