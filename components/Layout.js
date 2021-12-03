import React from 'react'
import { NavBar, NewNavBar } from './'
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Next Tech Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NewNavBar />
            {children}
        </>
    )
}

export default Layout
