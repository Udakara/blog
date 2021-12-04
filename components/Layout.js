import React from 'react'
import {  NewNavBar } from './'
import Head from 'next/head'

import { useEffect } from 'react'
import {useRouter} from 'next/router'
import {Progress} from './'
import { Bar } from './progress/Bar'
import {useProgressStore} from '../store'

const Layout = ({ children }) => {
    
    const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
    const isAnimating = useProgressStore((state) => state.isAnimating);
    const router = useRouter();

    useEffect(() => {
        
        const handleStart = () => {
            setIsAnimating(true)
        }

        const handleStop = () => {
            setIsAnimating(false)
        }

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop)

        return  () =>{
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop)
        }

    }, [router])

    return (
        <>
            <Head>
                <title>Next Tech Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Progress isAnimating={isAnimating}/>
            <NewNavBar />
            {children}
        </>
    )
}

export default Layout
