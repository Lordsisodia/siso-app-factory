'use client';
import { SegmentGroup } from '@ark-ui/react/segment-group';
import { segmentGroup } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(segmentGroup);
export const RootProvider = withProvider(SegmentGroup.RootProvider, 'root');
export const Root = withProvider(SegmentGroup.Root, 'root');
export const Indicator = withContext(SegmentGroup.Indicator, 'indicator');
export const ItemControl = withContext(SegmentGroup.ItemControl, 'itemControl');
export const Item = withContext(SegmentGroup.Item, 'item');
export const ItemText = withContext(SegmentGroup.ItemText, 'itemText');
export const Label = withContext(SegmentGroup.Label, 'label');
export { SegmentGroupContext as Context, SegmentGroupItemHiddenInput as ItemHiddenInput, } from '@ark-ui/react/segment-group';
//# sourceMappingURL=component.js.map