import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import client from '@views/client'
import router from '@views/routes'

import { I18nContextProvider } from '../i18n/Context'
import { store, persistedStore } from '../store'

import '../style/index.scss'

client().init(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <I18nContextProvider>
          <RouterProvider router={router} />
        </I18nContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
