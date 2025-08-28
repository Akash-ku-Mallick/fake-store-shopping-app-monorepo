import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import Spinner from '@shared/components/ui/loader/spinner'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
