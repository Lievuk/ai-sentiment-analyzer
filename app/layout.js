import './globals.css'

export const metadata = {
  title: 'AI Sentiment Analyzer',
  description: 'Analyze emotional tone and sentiment behind any text',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="container">
          <header>
            <h1>AI Sentiment Analyzer</h1>
            <p className="subtitle">Analyze emotional tone and sentiment behind any text</p>
          </header>
          <main>{children}</main>
          <footer>Powered by MiMo AI &mdash; 100T Token Grant Program</footer>
        </div>
      </body>
    </html>
  )
}