'use client';
import { RatingGroup } from '@ark-ui/react/rating-group';
import { ratingGroup } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(ratingGroup);
export const RootProvider = withProvider(RatingGroup.RootProvider, 'root');
export const Root = withProvider(RatingGroup.Root, 'root');
export const Control = withContext(RatingGroup.Control, 'control');
export const Item = withContext(RatingGroup.Item, 'item');
export const Label = withContext(RatingGroup.Label, 'label');
export { RatingGroupContext as Context, RatingGroupItemContext as ItemContext, RatingGroupHiddenInput as HiddenInput, } from '@ark-ui/react/rating-group';
//# sourceMappingURL=component.js.map