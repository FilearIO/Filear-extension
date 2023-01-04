import React from 'react'
import { createHashRouter, Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@views/constants'
import { WelcomeLayout } from '@views/components/Layout'
// import CheckLock from '@views/components/CheckLock'
import Initial from '@views/components/Initial'

import Home from '../pages/Home'
import Wallet from '../pages/Wallet'
import History from '../pages/History'
import Settings from '../pages/Settings'
import Send from '../pages/Send'
import Network from '../pages/Network'
import Unlock from '../pages/Unlock'
import Security from '../pages/Security'
import Permissions from '../pages/Permissions'
import Preview from '../pages/Preview'

import Welcome from '../pages/welcome/Entry'
import Create from '../pages/welcome/Create'
import Import from '../pages/welcome/Import'
import WelcomeSuccess from '../pages/welcome/Success'

export default createHashRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <Initial>
        <Outlet />
      </Initial>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.WALLET,
        element: <Wallet />,
      },
      {
        path: ROUTES.HISTORY,
        element: <History />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTES.SEND,
        element: <Send />,
      },
      {
        path: ROUTES.NETWORK,
        element: <Network />,
      },
      {
        path: ROUTES.SECURITY,
        element: <Security />,
      },
      {
        path: ROUTES.PERMISSIONS,
        element: <Permissions />,
      },
      {
        path: ROUTES.PREVIEW,
        element: <Preview />,
      },
    ],
  },
  {
    path: ROUTES.UNLOCK,
    element: <Unlock />,
  },
  {
    path: ROUTES.WELCOME,
    element: (
      <WelcomeLayout>
        <Welcome />
      </WelcomeLayout>
    ),
  },
  {
    path: ROUTES.CREATE,
    element: (
      <WelcomeLayout>
        <Create />
      </WelcomeLayout>
    ),
  },
  {
    path: ROUTES.IMPORT,
    element: (
      <WelcomeLayout>
        <Import />
      </WelcomeLayout>
    ),
  },
  {
    path: ROUTES.WELCOME_SUCCESS,
    element: (
      <WelcomeLayout>
        <WelcomeSuccess />
      </WelcomeLayout>
    ),
  },
])
