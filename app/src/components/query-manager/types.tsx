import React from 'react'
import { QueryType } from '../query-builder/types'
import { EditorProps } from '../query-editor/types'

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

type QueryEditorProps = {
  QueryEditor: React.FunctionComponent<EditorProps>
  query?: QueryType
  onSearch: () => void
  onChange: (query: QueryType) => void
}

export type QueryCardProps = QueryEditorProps & {
  onDelete: () => void
  queryInteractions: Array<(query: QueryType) => React.ReactNode>
}
export type QuerySelectorProps = Overwrite<
  QueryCardProps,
  {
    onSearch: (id: string, options?: any) => void
    onDelete: (id: string) => void
  }
> & {
  queries: QueryType[]
  currentQuery: string
}

export type AddQueryProps = Omit<QueryEditorProps, 'onSearch'> & {
  onCreate: (query: QueryType) => void
  render: (
    handleOpen: () => void
  ) => React.FunctionComponent<{ handleOpen: () => void }>
}

export type QueryEditorPopoverProps = QueryEditorProps & {
  anchorEl: HTMLDivElement
  onClose: () => void
}

export type QueryManagerProps = Overwrite<
  QuerySelectorProps,
  { onChange: (queries: QueryType[]) => void }
> & {
  onCreate: (query: QueryType) => void
  onSave: (id: string) => void
}
