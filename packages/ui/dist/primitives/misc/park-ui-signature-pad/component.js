'use client';
import { SignaturePad } from '@ark-ui/react/signature-pad';
import { signaturePad } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(signaturePad);
export const RootProvider = withProvider(SignaturePad.RootProvider, 'root');
export const Root = withProvider(SignaturePad.Root, 'root');
export const ClearTrigger = withContext(SignaturePad.ClearTrigger, 'clearTrigger');
export const Control = withContext(SignaturePad.Control, 'control');
export const Guide = withContext(SignaturePad.Guide, 'guide');
export const Label = withContext(SignaturePad.Label, 'label');
export const Segment = withContext(SignaturePad.Segment, 'segment');
export { SignaturePadContext as Context, SignaturePadHiddenInput as HiddenInput, } from '@ark-ui/react/signature-pad';
//# sourceMappingURL=component.js.map