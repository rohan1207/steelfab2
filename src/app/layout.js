import './globals.css'

export const metadata = {
  title: 'Steelfab Engineering Pvt. Ltd. | SEPL — Symbol of Quality',
  description: 'Industrial steel fabrication and engineering solutions',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <div className="relative min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}
