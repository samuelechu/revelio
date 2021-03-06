import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { QueryType } from '../../query-builder/types'

type Workspace = {
  queries: QueryType[]
}

export default (id: string) => {
  const mutation = gql`
    mutation SaveQueryToWorkspace($id: ID!, $attrs: MetacardAttributesInput!) {
      saveMetacard(id: $id, attributes: $attrs) {
        id
        title
        queries {
          id
        }
      }
    }
  `
  const [save, { loading }] = useMutation(mutation)
  return [
    async (workspace: Workspace) => {
      const queries =
        workspace.queries &&
        workspace.queries.map((query: QueryType) => ({
          id: query.id,
        }))
      save({
        variables: {
          id,
          attrs: {
            ...workspace,
            queries,
            metacard_type: 'workspace',
          },
        },
      })
    },
    loading,
  ]
}
