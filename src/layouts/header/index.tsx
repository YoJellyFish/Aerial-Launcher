import { Link } from '@tanstack/react-router'
import { History, Menu, Minus, Rocket, Settings, X } from 'lucide-react'

import { Button } from '../../components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet'

import { AccountList } from '../../components/account-list'
import { HistoryMenu } from '../../components/menu/history'
import { SidebarMenu } from '../../components/menu/sidebar'

import { useUISidebarHistory } from '../../hooks/ui/sidebars'
import { useAttributesStates, useHandlers, useWindowEvents } from './hooks'

// @ts-expect-error assets/image
import imgFNDBProfile from '../../_assets/fndb.png'

import { whatIsThis } from '../../lib/callbacks'

export function Header() {
  const { isButtonDisabled, open, setOpen } = useAttributesStates()
  const {
    handleCloseWindow,
    handleLaunch,
    handleMinimizeWindow,
    handleOpenFNDBProfile,
  } = useHandlers()
  const { isMinWith } = useWindowEvents()

  return (
    <>
      <header className="bg-muted/40 flex h-[var(--header-height)] items-center border-b px-1.5 relative">
        <div className="app-draggable-region absolute h-full left-0 top-0 w-full -z-10" />

        <div className="flex gap-1.5 relative w-full z-10">
          <Sheet
            open={open}
            onOpenChange={setOpen}
          >
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="not-draggable-region shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              className="flex flex-col p-0"
              side="left"
              hideCloseButton
            >
              <div>
                <div className="app-draggable-region flex h-[var(--header-height)] items-center justify-center text-center-">
                  <SheetClose className="not-draggable-region">
                    <X />
                    <span className="sr-only">Close navigation menu</span>
                  </SheetClose>
                </div>
                <SidebarMenu onOpenChange={setOpen} />
              </div>
            </SheetContent>
          </Sheet>

          <AccountList />

          <Button
            className="not-draggable-region"
            size={isMinWith ? 'icon' : 'default'}
            variant="outline"
            disabled={isButtonDisabled}
            onClick={handleLaunch}
          >
            {isMinWith ? <Rocket size={20} /> : 'Launch Game'}
          </Button>

          <Button
            className="not-draggable-region"
            size="icon"
            variant="ghost"
            onAuxClick={whatIsThis()}
            asChild
          >
            <Link to="/settings">
              <Settings />
              <span className="sr-only">Go to settings</span>
            </Link>
          </Button>

          <HistorySheet />

          <Button
            className="not-draggable-region"
            size="icon"
            variant="ghost"
            disabled={isButtonDisabled}
            onClick={handleOpenFNDBProfile}
          >
            <img
              src={imgFNDBProfile}
              className="w-8"
            />
            <span className="sr-only">Go to FortniteDB profile</span>
          </Button>

          <div className="ml-auto">
            <Button
              className="not-draggable-region"
              size="icon"
              variant="ghost"
              onClick={handleMinimizeWindow}
            >
              <Minus />
              <span className="sr-only">Minimize application</span>
            </Button>
            <Button
              className="not-draggable-region"
              size="icon"
              variant="ghost"
              onClick={handleCloseWindow}
            >
              <X />
              <span className="sr-only">Close application</span>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

function HistorySheet() {
  const { changeVisibility, visibility } = useUISidebarHistory()

  return (
    <Sheet
      open={visibility}
      onOpenChange={changeVisibility}
    >
      <SheetTrigger asChild>
        <Button
          className="not-draggable-region"
          size="icon"
          variant="ghost"
        >
          <History />
          <span className="sr-only">Toggle history sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col p-0"
        hideCloseButton
      >
        <HistoryMenu />
      </SheetContent>
    </Sheet>
  )
}
