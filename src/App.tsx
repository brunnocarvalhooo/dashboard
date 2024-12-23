import { Dashboard } from './dashboard/Dashboard'
import { AppProvider } from './shared/hooks'

import './global.css'
import { initializeLocalStorage } from './models/local-strorage'

initializeLocalStorage()

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}

export default App
