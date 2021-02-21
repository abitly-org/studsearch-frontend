import * as React from 'react';
import cx from 'classnames';

// import colors from '../../Palette.scss';
import './index.scss';

const LoadingSpinner = ({
    className, style,
    size = 32,
    // color = colors.primary,
    color = '#2653AF',
    center,
    ...centerProps
}: {
    className?: string;
    style?: React.CSSProperties;
    size?: number;
    color?: string;
    center?: boolean;
    'center-x'?: boolean;
    'center-y'?: boolean;
}) => (
    <span
        className={
            cx(
                "LoadingSpinner", 
                { xcenter: centerProps['center-x'] || center,
                  ycenter: centerProps['center-y'] || center }, 
                className
            )
        }
        style={style}
    >
        <span
            style={{width: size, height: size}}
        >
            <svg
                viewBox={'0 0 66 66'}
                style={{width: size, height: size}}
            >
                <circle
                    cx={33} cy={33}
                    r={30}
                    fill="none"
                    strokeLinecap="butt"
                    strokeWidth={6}
                    stroke={color}
                />
            </svg>
        </span>
    </span>
);
export default LoadingSpinner;