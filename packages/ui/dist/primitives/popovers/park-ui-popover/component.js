'use client';
import { Popover } from '@ark-ui/react/popover';
import { popover } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withRootProvider, withContext } = createStyleContext(popover);
export const RootProvider = withRootProvider(Popover.RootProvider);
export const Root = withRootProvider(Popover.Root);
export const Anchor = withContext(Popover.Anchor, 'anchor');
export const Arrow = withContext(Popover.Arrow, 'arrow');
export const ArrowTip = withContext(Popover.ArrowTip, 'arrowTip');
export const CloseTrigger = withContext(Popover.CloseTrigger, 'closeTrigger');
export const Content = withContext(Popover.Content, 'content');
export const Description = withContext(Popover.Description, 'description');
export const Indicator = withContext(Popover.Indicator, 'indicator');
export const Positioner = withContext(Popover.Positioner, 'positioner');
export const Title = withContext(Popover.Title, 'title');
export const Trigger = withContext(Popover.Trigger, 'trigger');
export { PopoverContext as Context } from '@ark-ui/react/popover';
//# sourceMappingURL=component.js.map