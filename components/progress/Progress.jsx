import { useNProgress } from "@tanem/react-nprogress";

import {Bar} from './Bar';
import {Container} from './Container';

import React from 'react'

const Progress = ({isAnimating}) => {
    const {animationDuration , isFinished, progress} = useNProgress(isAnimating)
    return (
        <div>
            <Container animationDuration={animationDuration} isFinished={isAnimating}>
                <Bar animationDuration={animationDuration} progress={progress}/>
            </Container>
        </div>
    )
}

export default Progress