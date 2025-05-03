import React from 'react';
import { VirtualizedList as RNVirtualizedList, StyleSheet } from 'react-native';

interface VirtualizedListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  itemHeight: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

export function VirtualizedList<T>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  onEndReached,
  onEndReachedThreshold = 0.5,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
}: VirtualizedListProps<T>) {
  const getItem = (_data: T[], index: number) => data[index];
  const getItemCount = (_data: T[]) => data.length;
  const getItemLayout = (_data: T[] | null, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  return (
    <RNVirtualizedList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={5}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});