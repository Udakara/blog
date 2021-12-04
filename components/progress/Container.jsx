import React from 'react'

export const Container = ({animationDuration, children ,  isFinished}) => {
    return (
        <div className="pointer-events-none" style={{
            opacity: isFinished ? 1 : 0,
            transition:`opacity ${animationDuration}ms linear`,

        }}>
            {children}
        </div>
    )
}