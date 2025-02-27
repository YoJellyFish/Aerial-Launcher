import type {
  ComboboxOption,
  ComboboxProps,
} from '../../../components/ui/extended/combobox/hooks'

import { useEffect } from 'react'

import {
  useGetAutoPinUrnActions,
  useGetAutoPinUrnData,
} from '../../../hooks/stw-operations/urns'
import { useGetAccounts } from '../../../hooks/accounts'
import { useGetGroups } from '../../../hooks/groups'

import { checkIfCustomDisplayNameIsValid } from '../../../lib/validations/properties'
import { parseCustomDisplayName } from '../../../lib/utils'

export function useData() {
  const { accountsArray, accountList } = useGetAccounts()
  const { getGroupTagsByAccountId } = useGetGroups()
  const { selectedAccounts, selectedAccountsMiniBosses } =
    useGetAutoPinUrnData()
  const { addAccount, removeAccount, updateAccount } =
    useGetAutoPinUrnActions()

  const options = accountsArray
    .filter((account) => selectedAccounts[account.accountId] === undefined)
    .map((account) => {
      const _keys: Array<string> = [account.displayName]
      const tags = getGroupTagsByAccountId(account.accountId)

      if (checkIfCustomDisplayNameIsValid(account.customDisplayName)) {
        _keys.push(account.customDisplayName)
      }

      if (tags.length > 0) {
        tags.forEach((tagName) => {
          _keys.push(tagName)
        })
      }

      return {
        keywords: _keys,
        label: parseCustomDisplayName(account),
        value: account.accountId,
      } as ComboboxOption
    })
  const accounts = Object.keys(selectedAccounts)
    .filter((accountId) => accountList[accountId])
    .map((accountId) => accountList[accountId])
  const accountSelectorIsDisabled = options.length <= 0

  useEffect(() => {
    const listener = window.electronAPI.notificationAutoPinUrnsData(
      async (data) => {
        Object.entries(data.urns).forEach(([accountId, value]) => {
          addAccount(accountId, {
            type: 'urns',
            value,
          })
        })
        Object.entries(data.miniBosses).forEach(([accountId, value]) => {
          addAccount(accountId, {
            type: 'mini-bosses',
            value,
          })
        })
      }
    )

    window.electronAPI.autoPinUrnsRequestData()

    return () => {
      listener.removeListener()
    }
  }, [])

  const customFilter: ComboboxProps['customFilter'] = (
    _value,
    search,
    keywords
  ) => {
    const _search = search.toLowerCase().trim()
    const _keys =
      keywords &&
      keywords.some((keyword) =>
        keyword.toLowerCase().trim().includes(_search)
      )

    return _keys ? 1 : 0
  }

  const onSelectItem = (accountId: string) => {
    addAccount(accountId)
    window.electronAPI.autoPinUrnsAdd(accountId)
  }

  const handleRemoveAccount = (accountId: string) => () => {
    removeAccount(accountId)
    window.electronAPI.autoPinUrnsRemove(accountId)
  }

  const handleUpdateAccount =
    (accountId: string, type: 'mini-bosses' | 'urns') =>
    (value: boolean) => {
      updateAccount(accountId, {
        type,
        value,
      })
      window.electronAPI.autoPinUrnsUpdate(accountId, type, value)
    }

  return {
    accounts,
    accountSelectorIsDisabled,
    options,
    selectedAccounts,
    selectedAccountsMiniBosses,

    customFilter,
    handleRemoveAccount,
    handleUpdateAccount,
    onSelectItem,
  }
}
