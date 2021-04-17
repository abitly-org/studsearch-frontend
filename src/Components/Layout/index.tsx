import * as React from 'react';
import cx from 'classnames';

import './index.scss';
const StandardGaps = [ 64, 32, 24, 16, 12, 8, 4, 0 ];

class LayoutStylesHandler {
    static styles : {[type: string]: string[]} = {};
    static remove : {[type: string]: () => void} = {};

    static applyStyles(gap: number, margin: string) {
        const type = margin + '_' + gap;
        const c = margin === 'right' ? 'row' : 'column';
        const style = `.ui2_layout.ui2_${c}.ui2_layout_${type} > * { margin-${margin}: ${gap}px; };.ui2_layout.ui2_${c}.ui2_layout_${type} > *:last-child { margin-${margin}: 0; };`;

        const styles = window.document.createElement('style');
        styles.innerHTML = style;
        window.document.head.appendChild(styles);
        
        this.remove[type] = () => styles.remove(); 
    }
    static removeStyles(type: string, id: string) {
        if (this.styles[type] === undefined || this.styles[type].length === 0)
            return;

        this.styles[type] = this.styles[type].filter(s => s !== id);
        if (this.styles[type].length === 0) {
            this.remove[type]();
            delete this.remove[type];
            delete this.styles[type];
        }
    }
}
const useStyles = (gap: number, margin: string) : string => {
    const type = margin + '_' + gap;
    const id = React.useMemo(() => (~~(Math.random() * 9999999)).toString(), []);

    React.useEffect(() => {
        if (StandardGaps.includes(gap))
            return;
            
        if (LayoutStylesHandler.styles[type] === undefined)
            LayoutStylesHandler.styles[type] = [];
        if (LayoutStylesHandler.styles[type].length === 0)
            LayoutStylesHandler.applyStyles(gap, margin);
        if (LayoutStylesHandler.styles[type].indexOf(id) < 0)
            LayoutStylesHandler.styles[type].push(id);

        // return () => this.removeStyles(type, id);
        return () => {
            // setTimeout for fixing glitches, when
            // component is fully remounted and it loses stylings
            setTimeout(() => 
            LayoutStylesHandler.removeStyles(type, id)
            , 16);
        };
    }, []);

    return `ui2_layout_${type}`;
}

/**
 * Firstly, I wanted to use `row-gap` and `column-gap` to implement these components
 * But then I had noticed that safari doesn't support gaps in flexbox (only in grid).
 * So... eh, I already use that component! Now I'm using hax with pushing <style> in <head>,
 * if gap is non-standard.
 */

export const Row : React.FC<{
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    center?: boolean;
    inline?: boolean;
    gap?: number;

    padding?: string | number,
    flex?: string;
    grow?: number;
    shrink?: number;
    basis?: number | string;

    forwardedRef?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>> = ({
    id,
    className,
    gap = 24,
    inline = false,
    style,
    center = false,
    children,
    forwardedRef,
    
    padding,
    flex, grow, shrink, basis,

    ...attributes
}) => {
    useStyles(gap, 'right');

    return (
        <div
            id={id}
            className={cx("ui2_layout", `ui2_layout_right_${gap}`, "ui2_row", className)}
            style={{
                display: `${inline ? 'inline-' : ''}flex`,
                alignItems: center ? 'center' : undefined,
                padding,
                ...(
                    flex ? 
                        { flex: flex } :
                        {
                            flexGrow: grow, 
                            flexShrink: shrink, 
                            flexBasis: basis
                        }
                ),

                // columnGap: gap,
                ...style,
            }}
            ref={forwardedRef}
            {...attributes}
        >
            { children }
        </div>
    );
};


export const Column : React.FC<{
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    center?: boolean;
    inline?: boolean;
    gap?: number;

    padding?: string | number,
    flex?: string;
    grow?: number;
    shrink?: number;
    basis?: number | string;

    forwardedRef?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>> = ({
    id,
    className,
    gap = 24,
    inline = false,
    style,
    center = false,
    children,
    forwardedRef,
    
    padding,
    flex, grow, shrink, basis,

    ...attributes
}) => {
    useStyles(gap, 'bottom');
        
    return (
        <div
            id={id}
            className={cx("ui2_layout", `ui2_layout_bottom_${gap}`, "ui2_column", className)}
            style={{
                display: `${inline ? 'inline-' : ''}flex`,
                alignItems: center ? 'center' : undefined,
                padding,
                ...(
                    flex ? 
                        { flex: flex } :
                        {
                            flexGrow: grow, 
                            flexShrink: shrink, 
                            flexBasis: basis,
                        }
                ),
                
                // rowGap: gap,
                ...style,
            }}
            ref={forwardedRef}
            {...attributes}
        >
            { children }
        </div>
    );
};