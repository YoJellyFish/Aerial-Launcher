import type { XPBoostsSearchUserConfig } from '../../types/xpboosts'

import { Authentication } from './authentication'

import {
  findUserByDisplayName,
  findUserByExternalDisplayName,
} from '../../services/endpoints/lookup'

export class LookupManager {
  static async searchUserByDisplayName({
    account,
    displayName,
  }: XPBoostsSearchUserConfig) {
    const defaultResponse: {
      data: null
      success: false
      errorMessage: number | string | null
    } = {
      data: null,
      success: false,
      errorMessage: null,
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        return defaultResponse
      }

      const response = await findUserByDisplayName({
        accessToken,
        displayName,
      })

      if (response.data) {
        return {
          data: response.data,
          errorMessage: null,
          success: true,
        } as const
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const response =
        (error?.response?.data as Record<string, number | string>) ?? {}

      if (
        response.errorCode ===
        'errors.com.epicgames.account.account_not_found'
      ) {
        try {
          const accessToken =
            await Authentication.verifyAccessToken(account)

          if (!accessToken) {
            return defaultResponse
          }

          for (const externalAuthType of ['xbl', 'psn'] as const) {
            const response = await findUserByExternalDisplayName({
              accessToken,
              displayName,
              externalAuthType,
            })

            if (response.data?.length > 0) {
              const current = response.data[0]

              if (current) {
                return {
                  data: {
                    ...current,
                    displayName:
                      current.externalAuths[externalAuthType]
                        ?.externalDisplayName ?? current.displayName,
                  },
                  errorMessage: null,
                  success: true,
                } as const
              }
            }
          }
        } catch (error) {
          //
        }

        defaultResponse.errorMessage = response.errorMessage
      }
    }

    return defaultResponse
  }
}
