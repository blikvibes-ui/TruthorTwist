import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'TruthOrTwist - Truth or Dare Online',
  description: 'Spill the Tea or Take the Twist — Live with Friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-dark text-white font-sans">
        <div className="min-h-screen">
          {children}
        </div>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
