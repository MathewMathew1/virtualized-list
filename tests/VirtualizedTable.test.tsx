import "@testing-library/jest-dom/extend-expect";
import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { VirtualizedTable } from "../src/components/VirtualizedTable/VirtualizedTable";
import type { VirtualizedItemStyle } from "../src/types/VirtualizedListTypes";
import { VirtualizedHeaderStyle } from "../src/types/VirtualizedTableTypes";

const Cell = ({
  style,
  rowIndex,
  columnIndex,
}: {
  style: VirtualizedItemStyle;
  rowIndex: number;
  columnIndex: number;
}) => (
  <div
    data-testid="cell"
    style={{ ...style, height: 30, width: 100 }}
  >{`R${rowIndex}C${columnIndex}`}</div>
);

describe("VirtualizedTable", () => {
  const rowCount = 100;
  const columnCount = 100;
  const rowHeights = 30;
  const columnWidths = 100;

  it("renders only visible cells", () => {
    const { getAllByTestId, queryByText, rerender } = render(
      <VirtualizedTable
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        height={100}
        width={200}
        CellComponent={Cell}
        overScanCount={0}
      />
    );

    const cells = getAllByTestId("cell");
    expect(cells.length).toBeGreaterThan(0);
    expect(queryByText("R0C0")).toBeInTheDocument();
    expect(queryByText("R2C4")).not.toBeInTheDocument();

    rerender(
      <VirtualizedTable
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        height={100}
        width={200}
        CellComponent={Cell}
        overScanCount={2}
      />
    );

    expect(queryByText("R4C2")).toBeInTheDocument();
  });

 it("renders WrapperComponent when provided", () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="wrapper">{children}</div>
    );

    const { getByTestId } = render(
      <VirtualizedTable
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        height={100}
        width={200}
        CellComponent={Cell}
        WrapperComponent={Wrapper}
      />
    );

    expect(getByTestId("wrapper")).toBeInTheDocument();
  });

  it("calls onScroll when scrolled", () => {
    const onScroll = jest.fn();

    const { container } = render(
      <VirtualizedTable
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        height={100}
        width={200}
        CellComponent={Cell}
        onScroll={onScroll}
      />
    );

    const scrollable = container.firstChild as HTMLElement;

    fireEvent.scroll(scrollable, { target: { scrollTop: 60, scrollLeft: 50 } });

    expect(onScroll).toHaveBeenCalledWith(60, 50);
  });

  it("renders AbsoluteElementComponent if passed", () => {
    const AbsoluteComponent = ({ currentLeftOffset, currentTopOffset }: { currentLeftOffset: number; currentTopOffset: number }) => (
      <div data-testid="absolute-header">{`Offset: ${currentLeftOffset},${currentTopOffset}`}</div>
    );

    const { getByTestId } = render(
      <VirtualizedTable
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        height={100}
        width={200}
        CellComponent={Cell}
        AbsoluteElementComponent={AbsoluteComponent}
      />
    );

    expect(getByTestId("absolute-header")).toBeInTheDocument();
  });

  it("reduces visible rows when top header is present", () => {
    const renderTable = (headers?: any) => {
      const result = render(
        <VirtualizedTable
          rowCount={100}
          columnCount={5}
          rowHeights={30}
          columnWidths={100}
          height={100}
          width={200}
          CellComponent={Cell}
          headers={headers}
          overScanCount={0}
        />
      );
      return result;
    };
  
    const withHeader = renderTable({
      top: {
        component: ({
          style,
          columnIndex,
        }: {
          style: VirtualizedHeaderStyle;
          columnIndex: number;
        }) => (
          <div style={{ ...style, backgroundColor: "pink", color: "red" }}>
            {columnIndex}
          </div>
        ),
        size: 20,
        type: "cell",
      },
    });
    const countWithTopHeader = withHeader.getAllByTestId("cell").length;
    withHeader.unmount();
  
    const withoutHeader = renderTable();
    const countWithoutHeader = withoutHeader.getAllByTestId("cell").length;
    withoutHeader.unmount();
  
    expect(countWithTopHeader).toBeLessThan(countWithoutHeader);
  });
  
});

