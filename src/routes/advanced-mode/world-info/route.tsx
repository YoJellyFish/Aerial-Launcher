import type { WorldInfoFileData } from '../../../types/data/advanced-mode/world-info'

import { UpdateIcon } from '@radix-ui/react-icons'
import { Link, createRoute } from '@tanstack/react-router'
import {
  CloudDownload,
  Eye,
  FileJson,
  FileSearch2,
  FileWarning,
  Save,
  Share,
  Trash2,
} from 'lucide-react'

import { Route as RootRoute } from '../../__root'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardFooter } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Switch } from '../../../components/ui/switch'

import {
  useCurrentActions,
  useData,
  useItemData,
  useSearch,
} from './-hooks'

import { relativeTime } from '../../../lib/dates'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/advanced-mode/world-info',
  component: () => {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Advanced Mode</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>World Info</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Content />
      </>
    )
  },
})

function Content() {
  const { currentData, files, isFetching, isSaving } = useData()
  const { handleRefetch, handleSave } = useCurrentActions()
  const {
    filteredFiles,
    includeFileData,
    searchValue,
    onChangeSearchValue,
    setIncludeFileData,
  } = useSearch({
    files,
  })

  return (
    <div className="flex flex-grow">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-lg w-full">
          <div className="border flex mb-10 mt-5 mx-auto rounded w-80">
            <div className="bg-muted-foreground/5 flex flex-col justify-center py-4 w-1/2">
              <div className="flex flex-shrink-0 justify-center mb-2 pl-2 pr-3">
                {!isFetching && currentData.value ? (
                  <FileJson
                    className="stroke-muted-foreground"
                    size={32}
                  />
                ) : isFetching ? (
                  <FileSearch2
                    className="stroke-muted-foreground"
                    size={32}
                  />
                ) : (
                  <FileWarning
                    className="stroke-muted-foreground"
                    size={32}
                  />
                )}
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">
                  {currentData.value ? currentData.date : 'N/A'}
                </div>
                <div className="font-medium text-muted-foreground text-xs uppercase">
                  Current
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center p-2 w-1/2">
              <Button
                type="button"
                className="gap-1 h-auto px-0 py-2 text-xs"
                onClick={handleSave(currentData.date)}
                disabled={isFetching || !currentData.value || isSaving}
              >
                {isSaving ? (
                  <UpdateIcon className="animate-spin h-4" />
                ) : (
                  <>
                    <Save size={16} />
                    Save On Local
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="gap-1 h-auto px-0 py-2 text-xs"
                onClick={handleRefetch}
                disabled={isFetching || isSaving}
              >
                {isFetching ? (
                  <UpdateIcon className="animate-spin h-4" />
                ) : (
                  <>
                    <CloudDownload size={16} />
                    Refetch data
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mb-5">
            {files.length > 0 ? (
              <>
                {files.length > 1 && (
                  <div className="flex gap-3 items-center mb-5">
                    <Input
                      placeholder={`Search on ${files.length} files`}
                      value={searchValue}
                      onChange={onChangeSearchValue}
                    />
                    <div className="flex flex-shrink-0 gap-2 items-center text-muted-foreground w-1/3">
                      Include file data
                      <Switch
                        checked={includeFileData}
                        onCheckedChange={setIncludeFileData}
                      />
                    </div>
                  </div>
                )}

                <div className="gap-2 grid grid-cols-1">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((data) => (
                      <Item
                        data={data}
                        key={data.id}
                      />
                    ))
                  ) : (
                    <div className="mt-10 text-center text-muted-foreground">
                      <FileWarning
                        size={48}
                        className="mx-auto"
                      />
                      <div className="mt-2">No files found</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-20 text-center text-muted-foreground">
                <FileWarning
                  size={48}
                  className="mx-auto"
                />
                <div className="mt-2">No files found</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Item({ data }: { data: WorldInfoFileData }) {
  const {
    handleDeleteFile,
    handleExportFile,
    handleOpenFile,
    handleUpdateName,
    name,
    onSubmit,
    validName,
  } = useItemData({ data })

  return (
    <Card className="">
      <CardContent className="flex items-center px-2 py-2">
        <div className="flex-shrink-0 pl-2 pr-3">
          <FileJson
            className="stroke-muted-foreground"
            size={24}
          />
        </div>
        <form
          className="flex flex-grow items-center relative"
          onSubmit={onSubmit}
        >
          <Input
            className="h-auto pr-20 pl-3 py-1"
            placeholder={`Default name: ${data.date}`}
            value={name}
            onChange={handleUpdateName}
          />
          <Button
            type="submit"
            variant="secondary"
            className="absolute h-auto px-2 py-0.5 right-1 text-sm"
          >
            {validName ? 'Update' : 'Revert'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-muted-foreground/5 px-2 py-1 rounded-b">
        <div className="">
          <span className="flex-shrink-0 px-1.5- py-0.5 rounded text-muted-foreground text-sm">
            Date: {data.date}
            <span className="italic ml-1">
              ({relativeTime(data.createdAt)})
            </span>
          </span>
        </div>
        <div className="flex ml-auto">
          <div className="flex border-r mr-1 pr-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="flex flex-shrink-0 justify-center size-8"
              onClick={handleOpenFile}
            >
              <Eye size={16} />
              <span className="sr-only">open file</span>
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="flex flex-shrink-0 justify-center size-8"
              onClick={handleExportFile}
            >
              <Share size={16} />
              <span className="sr-only">export file</span>
            </Button>
          </div>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex flex-shrink-0 justify-center size-8 text-[#ff6868]/60 hover:text-[#ff6868]"
            onClick={handleDeleteFile}
          >
            <Trash2 size={16} />
            <span className="sr-only">remove file</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
