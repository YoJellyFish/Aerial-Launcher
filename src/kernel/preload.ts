// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from 'electron'

import * as accountsActions from './preload-actions/accounts'
import * as authenticationActions from './preload-actions/authentication'
import * as automationsActions from './preload-actions/automation'
import * as eventActions from './preload-actions/events'
import * as generalActions from './preload-actions/general'
import * as launcherActions from './preload-actions/launcher'
import * as partyActions from './preload-actions/party'
import * as mcpActions from './preload-actions/mcp'
import * as matchmakingActions from './preload-actions/matchmaking'
import * as requestActions from './preload-actions/requests'
import * as scheduleActions from './preload-actions/schedules'
import * as settingsActions from './preload-actions/settings'
import * as xpBoostsActions from './preload-actions/xpboosts'
import * as worldInfoActions from './preload-actions/world-info'

export const availableElectronAPIs = {
  ...accountsActions,
  ...authenticationActions,
  ...automationsActions,
  ...eventActions,
  ...generalActions,
  ...launcherActions,
  ...partyActions,
  ...matchmakingActions,
  ...mcpActions,
  ...requestActions,
  ...scheduleActions,
  ...settingsActions,
  ...xpBoostsActions,
  ...worldInfoActions,
} as const

contextBridge.exposeInMainWorld('electronAPI', availableElectronAPIs)
