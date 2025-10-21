'use client';
import { ark } from '@ark-ui/react/factory';
import { alert } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(alert);
export const Root = withProvider(ark.div, 'root');
export const Content = withContext(ark.div, 'content');
export const Description = withContext(ark.div, 'description');
export const Icon = withContext(ark.svg, 'icon');
export const Title = withContext(ark.h5, 'title');
//# sourceMappingURL=component.js.map