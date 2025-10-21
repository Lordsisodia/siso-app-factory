'use client';
import { Accordion } from '@ark-ui/react/accordion';
import { accordion } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(accordion);
export const RootProvider = withProvider(Accordion.RootProvider, 'root');
export const Root = withProvider(Accordion.Root, 'root');
export const ItemContent = withContext(Accordion.ItemContent, 'itemContent');
export const ItemIndicator = withContext(Accordion.ItemIndicator, 'itemIndicator');
export const Item = withContext(Accordion.Item, 'item');
export const ItemTrigger = withContext(Accordion.ItemTrigger, 'itemTrigger');
export { AccordionContext as Context, AccordionItemContext as ItemContext, } from '@ark-ui/react/accordion';
//# sourceMappingURL=component.js.map