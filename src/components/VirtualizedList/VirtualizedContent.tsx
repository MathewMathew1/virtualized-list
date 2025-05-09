
import { getItemStyle } from "../../helpers/itemStyle";
import {VirtualizedItemStyle, VirtualizedListContentProps} from "../../types/VirtualizedListTypes"

const VirtualizedListContent = <T, K>({
    data,
    itemSize,
    direction,
    firstVisible,
    lastVisible,
    ItemComponent,
    additionalData,
    innerStyle,
  }: VirtualizedListContentProps<T, K>) => {
    return (
      <div style={innerStyle}>
        {data.map((_item, i) =>
          i >= firstVisible && i <= lastVisible ? (
            renderItem(ItemComponent, {
              key: i,
              data,
              index: i,
              style: getItemStyle(i, itemSize, direction),
              additionalData,
            })
          ) : null
        )}
      </div>
    );
  };

  function renderItem<T, K>(
    Component: React.ComponentType<any>,
    props: { data: T[]; index: number; style: VirtualizedItemStyle; additionalData?: K , key:number}
  ) {
    const { key, additionalData, ...rest } = props;
    return additionalData !== undefined ? (
      <Component key={key} {...rest} additionalData={additionalData} />
    ) : (
      <Component key={key} {...rest} />
    );
  }

export default VirtualizedListContent;
