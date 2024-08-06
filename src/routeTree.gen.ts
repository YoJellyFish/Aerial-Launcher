/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsRouteImport } from './routes/settings/route'
import { Route as IndexImport } from './routes/index'
import { Route as StwOperationsXpboostsRouteImport } from './routes/stw-operations/xpboosts/route'
import { Route as StwOperationsSaveQuestsRouteImport } from './routes/stw-operations/save-quests/route'
import { Route as StwOperationsPartyRouteImport } from './routes/stw-operations/party/route'
import { Route as StwOperationsHomebaseNameRouteImport } from './routes/stw-operations/homebase-name/route'
import { Route as StwOperationsAutomationRouteImport } from './routes/stw-operations/automation/route'
import { Route as InformationCreditsRouteImport } from './routes/information/credits/route'
import { Route as AdvancedModeWorldInfoRouteImport } from './routes/advanced-mode/world-info/route'
import { Route as AdvancedModeMatchmakingTrackRouteImport } from './routes/advanced-mode/matchmaking-track/route'
import { Route as AccountsRemoveRouteImport } from './routes/accounts/remove/route'
import { Route as AccountManagementEpicGamesSettingsRouteImport } from './routes/account-management/epic-games-settings/route'
import { Route as AccountsAddTypeImport } from './routes/accounts/add/$type'

// Create/Update Routes

const SettingsRouteRoute = SettingsRouteImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StwOperationsXpboostsRouteRoute = StwOperationsXpboostsRouteImport.update(
  {
    path: '/stw-operations/xpboosts',
    getParentRoute: () => rootRoute,
  } as any,
)

const StwOperationsSaveQuestsRouteRoute =
  StwOperationsSaveQuestsRouteImport.update({
    path: '/stw-operations/save-quests',
    getParentRoute: () => rootRoute,
  } as any)

const StwOperationsPartyRouteRoute = StwOperationsPartyRouteImport.update({
  path: '/stw-operations/party',
  getParentRoute: () => rootRoute,
} as any)

const StwOperationsHomebaseNameRouteRoute =
  StwOperationsHomebaseNameRouteImport.update({
    path: '/stw-operations/homebase-name',
    getParentRoute: () => rootRoute,
  } as any)

const StwOperationsAutomationRouteRoute =
  StwOperationsAutomationRouteImport.update({
    path: '/stw-operations/automation',
    getParentRoute: () => rootRoute,
  } as any)

const InformationCreditsRouteRoute = InformationCreditsRouteImport.update({
  path: '/information/credits',
  getParentRoute: () => rootRoute,
} as any)

const AdvancedModeWorldInfoRouteRoute = AdvancedModeWorldInfoRouteImport.update(
  {
    path: '/advanced-mode/world-info',
    getParentRoute: () => rootRoute,
  } as any,
)

const AdvancedModeMatchmakingTrackRouteRoute =
  AdvancedModeMatchmakingTrackRouteImport.update({
    path: '/advanced-mode/matchmaking-track',
    getParentRoute: () => rootRoute,
  } as any)

const AccountsRemoveRouteRoute = AccountsRemoveRouteImport.update({
  path: '/accounts/remove',
  getParentRoute: () => rootRoute,
} as any)

const AccountManagementEpicGamesSettingsRouteRoute =
  AccountManagementEpicGamesSettingsRouteImport.update({
    path: '/account-management/epic-games-settings',
    getParentRoute: () => rootRoute,
  } as any)

const AccountsAddTypeRoute = AccountsAddTypeImport.update({
  path: '/accounts/add/$type',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      preLoaderRoute: typeof SettingsRouteImport
      parentRoute: typeof rootRoute
    }
    '/account-management/epic-games-settings': {
      preLoaderRoute: typeof AccountManagementEpicGamesSettingsRouteImport
      parentRoute: typeof rootRoute
    }
    '/accounts/remove': {
      preLoaderRoute: typeof AccountsRemoveRouteImport
      parentRoute: typeof rootRoute
    }
    '/advanced-mode/matchmaking-track': {
      preLoaderRoute: typeof AdvancedModeMatchmakingTrackRouteImport
      parentRoute: typeof rootRoute
    }
    '/advanced-mode/world-info': {
      preLoaderRoute: typeof AdvancedModeWorldInfoRouteImport
      parentRoute: typeof rootRoute
    }
    '/information/credits': {
      preLoaderRoute: typeof InformationCreditsRouteImport
      parentRoute: typeof rootRoute
    }
    '/stw-operations/automation': {
      preLoaderRoute: typeof StwOperationsAutomationRouteImport
      parentRoute: typeof rootRoute
    }
    '/stw-operations/homebase-name': {
      preLoaderRoute: typeof StwOperationsHomebaseNameRouteImport
      parentRoute: typeof rootRoute
    }
    '/stw-operations/party': {
      preLoaderRoute: typeof StwOperationsPartyRouteImport
      parentRoute: typeof rootRoute
    }
    '/stw-operations/save-quests': {
      preLoaderRoute: typeof StwOperationsSaveQuestsRouteImport
      parentRoute: typeof rootRoute
    }
    '/stw-operations/xpboosts': {
      preLoaderRoute: typeof StwOperationsXpboostsRouteImport
      parentRoute: typeof rootRoute
    }
    '/accounts/add/$type': {
      preLoaderRoute: typeof AccountsAddTypeImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  SettingsRouteRoute,
  AccountManagementEpicGamesSettingsRouteRoute,
  AccountsRemoveRouteRoute,
  AdvancedModeMatchmakingTrackRouteRoute,
  AdvancedModeWorldInfoRouteRoute,
  InformationCreditsRouteRoute,
  StwOperationsAutomationRouteRoute,
  StwOperationsHomebaseNameRouteRoute,
  StwOperationsPartyRouteRoute,
  StwOperationsSaveQuestsRouteRoute,
  StwOperationsXpboostsRouteRoute,
  AccountsAddTypeRoute,
])

/* prettier-ignore-end */
