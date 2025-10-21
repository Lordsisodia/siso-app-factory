'use client';
import { Avatar } from '@ark-ui/react/avatar';
import { avatar } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(avatar);
export const RootProvider = withProvider(Avatar.RootProvider, 'root');
export const Root = withProvider(Avatar.Root, 'root');
export const Fallback = withContext(Avatar.Fallback, 'fallback');
export const Image = withContext(Avatar.Image, 'image');
export { AvatarContext as Context } from '@ark-ui/react/avatar';
//# sourceMappingURL=component.js.map