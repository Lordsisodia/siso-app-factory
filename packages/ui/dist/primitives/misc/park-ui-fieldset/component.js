'use client';
import { ark } from '@ark-ui/react/factory';
import { Fieldset } from '@ark-ui/react/fieldset';
import { fieldset } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(fieldset);
export const RootProvider = withProvider(Fieldset.Root, 'root');
export const Root = withProvider(Fieldset.Root, 'root');
export const ErrorText = withContext(Fieldset.ErrorText, 'errorText');
export const HelperText = withContext(Fieldset.HelperText, 'helperText');
export const Legend = withContext(Fieldset.Legend, 'legend');
export const Control = withContext(ark.div, 'control');
export { FieldsetContext as Context } from '@ark-ui/react/fieldset';
//# sourceMappingURL=component.js.map