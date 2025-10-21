'use client';
import { ark } from '@ark-ui/react/factory';
import { card } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(card);
export const Root = withProvider(ark.div, 'root');
export const Body = withContext(ark.div, 'body');
export const Description = withContext(ark.div, 'description');
export const Footer = withContext(ark.div, 'footer');
export const Header = withContext(ark.div, 'header');
export const Title = withContext(ark.h3, 'title');
//# sourceMappingURL=component.js.map