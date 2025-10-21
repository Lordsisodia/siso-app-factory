'use client';
import { PinInput } from '@ark-ui/react/pin-input';
import { pinInput } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(pinInput);
export const RootProvider = withProvider(PinInput.RootProvider, 'root');
export const Root = withProvider(PinInput.Root, 'root', { forwardProps: ['mask'] });
export const Control = withContext(PinInput.Control, 'control');
export const Input = withContext(PinInput.Input, 'input');
export const Label = withContext(PinInput.Label, 'label');
export { PinInputContext as Context, PinInputHiddenInput as HiddenInput, } from '@ark-ui/react/pin-input';
//# sourceMappingURL=component.js.map