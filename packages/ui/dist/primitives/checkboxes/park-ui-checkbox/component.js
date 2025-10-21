'use client';
import { Checkbox } from '@ark-ui/react/checkbox';
import { checkbox } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(checkbox);
export const RootProvider = withProvider(Checkbox.RootProvider, 'root');
export const Root = withProvider(Checkbox.Root, 'root');
export const Control = withContext(Checkbox.Control, 'control');
export const Group = withContext(Checkbox.Group, 'group');
export const Indicator = withContext(Checkbox.Indicator, 'indicator');
export const Label = withContext(Checkbox.Label, 'label');
export { CheckboxContext as Context, CheckboxHiddenInput as HiddenInput, } from '@ark-ui/react/checkbox';
//# sourceMappingURL=component.js.map