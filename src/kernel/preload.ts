// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from 'electron'

import * as authenticationActions from './preload-actions/authentication'
import * as eventActions from './preload-actions/events'
import * as generalActions from './preload-actions/general'
import * as requestActions from './preload-actions/requests'

export const availableElectronAPIs = {
  ...authenticationActions,
  ...eventActions,
  ...generalActions,
  ...requestActions,
} as const

contextBridge.exposeInMainWorld('electronAPI', availableElectronAPIs)
