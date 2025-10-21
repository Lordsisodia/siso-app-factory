'use client';
import { Collapsible } from '@ark-ui/react/collapsible';
import { collapsible } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(collapsible);
export const RootProvider = withProvider(Collapsible.RootProvider, 'root');
export const Root = withProvider(Collapsible.Root, 'root');
export const Content = withContext(Collapsible.Content, 'content');
export const Trigger = withContext(Collapsible.Trigger, 'trigger');
export { CollapsibleContext as Context } from '@ark-ui/react/collapsible';
//# sourceMappingURL=component.js.map