'use client';
import { Splitter } from '@ark-ui/react/splitter';
import { splitter } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(splitter);
export const RootProvider = withProvider(Splitter.RootProvider, 'root');
export const Root = withProvider(Splitter.Root, 'root');
export const Panel = withContext(Splitter.Panel, 'panel');
export const ResizeTrigger = withContext(Splitter.ResizeTrigger, 'resizeTrigger');
export { SplitterContext as Context } from '@ark-ui/react/splitter';
//# sourceMappingURL=component.js.map