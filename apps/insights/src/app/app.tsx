import { InsightUiProvider } from '@mammoth/insights-ui'
import React from 'react'
import { AppRoutes } from './app.routes'
import './app.scss'
import { ThemeProvider } from './providers'
export const App = () => {
  return (
    <InsightUiProvider>
      <main>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </main>
    </InsightUiProvider>
  )
}
