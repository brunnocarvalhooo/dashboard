import { Dashboard } from './dashboard/Dashboard'
import { AppProvider } from './shared/hooks'

import './global.css'

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}

export default App
