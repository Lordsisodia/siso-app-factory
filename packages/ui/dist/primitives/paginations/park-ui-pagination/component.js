'use client';
import { Pagination } from '@ark-ui/react/pagination';
import { pagination } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(pagination);
export const RootProvider = withProvider(Pagination.RootProvider, 'root');
export const Root = withProvider(Pagination.Root, 'root', { forwardProps: ['page'] });
export const Ellipsis = withContext(Pagination.Ellipsis, 'ellipsis');
export const Item = withContext(Pagination.Item, 'item');
export const NextTrigger = withContext(Pagination.NextTrigger, 'nextTrigger');
export const PrevTrigger = withContext(Pagination.PrevTrigger, 'prevTrigger');
export { PaginationContext as Context } from '@ark-ui/react/pagination';
//# sourceMappingURL=component.js.map