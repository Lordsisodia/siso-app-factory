'use client';
import { Dialog } from '@ark-ui/react/dialog';
import { dialog } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withRootProvider, withContext } = createStyleContext(dialog);
export const RootProvider = withRootProvider(Dialog.RootProvider);
export const Root = withRootProvider(Dialog.Root);
export const Backdrop = withContext(Dialog.Backdrop, 'backdrop');
export const CloseTrigger = withContext(Dialog.CloseTrigger, 'closeTrigger');
export const Content = withContext(Dialog.Content, 'content');
export const Description = withContext(Dialog.Description, 'description');
export const Positioner = withContext(Dialog.Positioner, 'positioner');
export const Title = withContext(Dialog.Title, 'title');
export const Trigger = withContext(Dialog.Trigger, 'trigger');
export { DialogContext as Context } from '@ark-ui/react/dialog';
//# sourceMappingURL=component.js.map