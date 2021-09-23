import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Switch } from './Switch';
import { initiaBlobityOptions } from '../pages/index';
import Blobity from '../../../lib';
import { generatePrettyColor } from '../utils/colorGenerator';

const Wrapper = styled.div`
    display: block;
    position: relative;
    font-size: 16px;
`;

const Option = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 14px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 4px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    //z-index: 1;
    height: 42px;
`;

const Desc = styled.div`
    display: block;
    position: relative;
    z-index: 5;
    pointer-events: none;
`;

const Controls = styled.div`
    display: block;
    color: #888;
    text-transform: uppercase;
    font-size: 12px;
`;

export const generateColorPair = () => {
    const hue = Math.floor(Math.random() * 360);
    const oppositeHue = hue > 180 ? hue - 180 : hue + 180;

    return {
        color: generatePrettyColor(hue),
        dotColor: generatePrettyColor(oppositeHue),
    };
};

const Rainbow = styled.div`
    display: block;
    background-color: #efd002;
    background-image: linear-gradient(
        319deg,
        #efd002 0%,
        #31b74a 37%,
        #442ce0 100%
    );
    position: absolute;
    z-index: 3;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
    border-radius: 3px;

    &:hover {
        opacity: 1;
    }
`;

const Shape1 = styled.div`
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #666;
    background: rgba(208, 26, 124, 1);
    margin: 0 0 0 10px;
`;

const Shape2 = styled.div`
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #666;
    background: rgb(112, 65, 176);
    margin: 0 0 0 10px;
    border-radius: 7px;
`;

const Shape3 = styled.div`
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #666;
    background: rgb(67, 66, 234);
    margin: 0 0 0 10px;
    border-radius: 14px;
`;

export const Options: React.FC<{
    blobityInstance: React.MutableRefObject<Blobity | null>;
}> = ({ blobityInstance }) => {
    const colorsInterval = useRef<number>();
    const sizesInterval = useRef<number>();

    const toggleInvertOption = (isActive: boolean) => () => {
        const blobity = blobityInstance.current;

        blobity &&
            blobity.updateOptions({
                invert: isActive,
                fontColor: isActive ? '#000000' : '#ffffff',
            });
    };

    const startSwitchingColors = () => {
        const blobity = blobityInstance.current;
        colorsInterval.current && clearInterval(colorsInterval.current);
        const updateWithRandomColors = () => {
            blobity && blobity.updateOptions(generateColorPair());
        };
        colorsInterval.current = window.setInterval(
            updateWithRandomColors,
            800
        );
        updateWithRandomColors();
    };
    const stopSwitchingColors = () => {
        const blobity = blobityInstance.current;

        blobity &&
            blobity.updateOptions({
                color: initiaBlobityOptions.color,
                dotColor: initiaBlobityOptions.dotColor,
            });
        colorsInterval.current && clearInterval(colorsInterval.current);
        colorsInterval.current = undefined;
    };

    const toggleMagneticOption = (isActive: boolean) => {
        const blobity = blobityInstance.current;

        blobity &&
            blobity.updateOptions({
                magnetic: isActive,
            });
    };

    const startSwitchingSizeAndRadius = () => {
        const blobity = blobityInstance.current;
        const sizes = [
            [90, 20],
            [90, 45],
            [90, 1],
        ];
        let index = 1;

        sizesInterval.current && clearInterval(sizesInterval.current);
        const updateWithRandomSizeAndRadius = () => {
            blobity &&
                blobity.updateOptions({
                    size: sizes[index % 3][0],
                    radius: sizes[index % 3][1],
                });
            index++;
        };
        sizesInterval.current = window.setInterval(
            updateWithRandomSizeAndRadius,
            800
        );
        updateWithRandomSizeAndRadius();
    };
    const stopSwitchingSizeAndRadius = () => {
        const blobity = blobityInstance.current;

        blobity &&
            blobity.updateOptions({
                size: initiaBlobityOptions.size,
                radius: initiaBlobityOptions.radius,
            });
        sizesInterval.current && clearInterval(sizesInterval.current);
        sizesInterval.current = undefined;
    };

    return (
        <Wrapper>
            <Option>
                <Desc>Magnetic elements</Desc>
                <Controls>
                    <Switch initial={true} onChange={toggleMagneticOption} />
                </Controls>
            </Option>
            <Option
                onMouseOver={startSwitchingColors}
                onMouseLeave={stopSwitchingColors}
            >
                <Desc>Colors</Desc>
                <Controls>just hover over</Controls>
            </Option>
            <Option>
                <Desc>Element specific settings</Desc>
                <Controls>
                    <Shape1
                        data-blobity
                        data-blobity-radius="0"
                        data-blobity-offset-x="1"
                        data-blobity-offset-y="1"
                        data-blobity-magnetic="false"
                    />
                    <Shape2
                        data-blobity
                        data-blobity-radius="7"
                        data-blobity-offset-x="1"
                        data-blobity-offset-y="1"
                        data-blobity-magnetic="false"
                    />
                    <Shape3
                        data-blobity
                        data-blobity-radius="14"
                        data-blobity-offset-x="1"
                        data-blobity-offset-y="1"
                        data-blobity-magnetic="false"
                    />
                </Controls>
            </Option>
            <Option
                data-blobity-tooltip="Sure thing!"
                data-blobity-magnetic="false"
            >
                <Desc>Tooltips?</Desc>
                <Controls>just hover over</Controls>
            </Option>
            <Option
                onMouseOver={toggleInvertOption(true)}
                onMouseLeave={toggleInvertOption(false)}
            >
                <Rainbow />
                <Desc>Inverted background</Desc>
                <Controls>just hover over</Controls>
            </Option>
            <Option
                onMouseOver={startSwitchingSizeAndRadius}
                onMouseLeave={stopSwitchingSizeAndRadius}
            >
                <Desc>Fits all shapes as sizes</Desc>
                <Controls>just hover over</Controls>
            </Option>
        </Wrapper>
    );
};
