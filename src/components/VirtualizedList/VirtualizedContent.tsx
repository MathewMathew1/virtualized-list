import { getItemStyle } from "../../helpers/itemStyle";
import {
  VirtualizedItemStyle,
  VirtualizedListContentProps,
} from "../../types/VirtualizedListTypes";

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
          <ItemComponent
            key={`${i}`}
            data={data}
            index={i}
            style={getItemStyle(i, itemSize, direction)}
            additionalData={
              additionalData as K extends undefined ? undefined : K
            }
          />
        ) : null
      )}
    </div>
  );
};


export default VirtualizedListContent;
