'use client';
import { QrCode } from '@ark-ui/react/qr-code';
import { qrCode } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(qrCode);
export const RootProvider = withProvider(QrCode.RootProvider, 'root');
export const Root = withProvider(QrCode.Root, 'root');
export const Frame = withContext(QrCode.Frame, 'frame');
export const Overlay = withContext(QrCode.Overlay, 'overlay');
export const Pattern = withContext(QrCode.Pattern, 'pattern');
export { QrCodeContext as Context } from '@ark-ui/react/qr-code';
//# sourceMappingURL=component.js.map