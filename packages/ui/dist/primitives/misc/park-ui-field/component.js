'use client';
import { Field } from '@ark-ui/react/field';
import { styled } from 'styled-system/jsx';
import { field, input, textarea } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(field);
export const RootProvider = withProvider(Field.RootProvider, 'root');
export const Root = withProvider(Field.Root, 'root');
export const ErrorText = withContext(Field.ErrorText, 'errorText');
export const HelperText = withContext(Field.HelperText, 'helperText');
export const Label = withContext(Field.Label, 'label');
export const Select = withContext(Field.Select, 'select');
export const Input = styled(Field.Input, input);
export const Textarea = styled(Field.Textarea, textarea);
export { FieldContext as Context } from '@ark-ui/react/field';
//# sourceMappingURL=component.js.map