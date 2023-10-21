import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import Script from 'next/script'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'alyxmp4',
  description: 'Full-stack developer. Nothing really extraordinary, right?',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {process.env.GOOGLE_ANALYTICS_THREAD_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_THREAD_ID}`}
          />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_THREAD_ID}');
        `}
          </Script>
        </>
      ) : (
        <></>
      )}
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  )
}
