'use client';
import { Progress } from '@ark-ui/react/progress';
import { progress } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(progress);
export const RootProvider = withProvider(Progress.RootProvider, 'root');
export const Root = withProvider(Progress.Root, 'root');
export const Circle = withContext(Progress.Circle, 'circle');
export const CircleRange = withContext(Progress.CircleRange, 'circleRange');
export const CircleTrack = withContext(Progress.CircleTrack, 'circleTrack');
export const Label = withContext(Progress.Label, 'label');
export const Range = withContext(Progress.Range, 'range');
export const Track = withContext(Progress.Track, 'track');
export const ValueText = withContext(Progress.ValueText, 'valueText');
export const View = withContext(Progress.View, 'view');
export { ProgressContext as Context } from '@ark-ui/react/progress';
//# sourceMappingURL=component.js.map