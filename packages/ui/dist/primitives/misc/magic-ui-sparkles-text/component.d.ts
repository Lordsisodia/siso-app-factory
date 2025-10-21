import { ReactElement } from "react";
interface SparklesTextProps {
    /**
     * @default <div />
     * @type ReactElement
     * @description
     * The component to be rendered as the text
     * */
    as?: ReactElement;
    /**
     * @default ""
     * @type string
     * @description
     * The className of the text
     */
    className?: string;
    /**
     * @required
     * @type ReactNode
     * @description
     * The content to be displayed
     * */
    children: React.ReactNode;
    /**
     * @default 10
     * @type number
     * @description
     * The count of sparkles
     * */
    sparklesCount?: number;
    /**
     * @default "{first: '#9E7AFF', second: '#FE8BBB'}"
     * @type string
     * @description
     * The colors of the sparkles
     * */
    colors?: {
        first: string;
        second: string;
    };
}
export declare const SparklesText: React.FC<SparklesTextProps>;
export {};
//# sourceMappingURL=component.d.ts.map