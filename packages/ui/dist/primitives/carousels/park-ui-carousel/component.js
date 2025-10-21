'use client';
import { Carousel } from '@ark-ui/react/carousel';
import { carousel } from 'styled-system/recipes';
import { createStyleContext } from './utils/create-style-context';
const { withProvider, withContext } = createStyleContext(carousel);
export const RootProvider = withProvider(Carousel.RootProvider, 'root');
export const Root = withProvider(Carousel.Root, 'root');
export const Control = withContext(Carousel.Control, 'control');
export const IndicatorGroup = withContext(Carousel.IndicatorGroup, 'indicatorGroup');
export const Indicator = withContext(Carousel.Indicator, 'indicator');
export const ItemGroup = withContext(Carousel.ItemGroup, 'itemGroup');
export const Item = withContext(Carousel.Item, 'item');
export const NextTrigger = withContext(Carousel.NextTrigger, 'nextTrigger');
export const PrevTrigger = withContext(Carousel.PrevTrigger, 'prevTrigger');
export const Context = Carousel.Context;
//# sourceMappingURL=component.js.map