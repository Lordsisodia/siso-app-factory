'use client';
import { HoverCard } from '@ark-ui/react/hover-card';
import { hoverCard } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withRootProvider, withContext } = createStyleContext(hoverCard);
export const RootProvider = withRootProvider(HoverCard.RootProvider);
export const Root = withRootProvider(HoverCard.Root);
export const Arrow = withContext(HoverCard.Arrow, 'arrow');
export const ArrowTip = withContext(HoverCard.ArrowTip, 'arrowTip');
export const Content = withContext(HoverCard.Content, 'content');
export const Positioner = withContext(HoverCard.Positioner, 'positioner');
export const Trigger = withContext(HoverCard.Trigger, 'trigger');
export { HoverCardContext as Context } from '@ark-ui/react/hover-card';
//# sourceMappingURL=component.js.map