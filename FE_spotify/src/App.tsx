
import './App.css'
import { GlobalProvider } from './globalContext/GlobalContext'
import useRoutesElements from './routes/useRoutesElements'

function App() {

  const routesElements = useRoutesElements()
  return (
    <GlobalProvider>
      {routesElements}
    </GlobalProvider>
  )
}

export default App
