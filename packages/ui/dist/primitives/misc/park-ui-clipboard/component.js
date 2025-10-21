'use client';
import { Clipboard } from '@ark-ui/react/clipboard';
import { clipboard } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(clipboard);
export const RootProvider = withProvider(Clipboard.RootProvider, 'root');
export const Root = withProvider(Clipboard.Root, 'root');
export const Control = withContext(Clipboard.Control, 'control');
export const Indicator = withContext(Clipboard.Indicator, 'indicator');
export const Input = withContext(Clipboard.Input, 'input');
export const Label = withContext(Clipboard.Label, 'label');
export const Trigger = withContext(Clipboard.Trigger, 'trigger');
export { ClipboardContext as Context } from '@ark-ui/react/clipboard';
//# sourceMappingURL=component.js.map