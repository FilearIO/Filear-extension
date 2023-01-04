import { FILEAR_BIZTYPE, FILEAR_BIZTYPE_DICT } from '@shared/constants'

export const queryUserFile = (address: string, after?: string): Object => {
  return {
    query: `{
      transactions (
        owners:["${address}"],
        first: 15,
        after: "${after ?? ''}",
        tags: [{
          name: "App-Name",
          values: ["${APP_NAME}"]
        }, {
          name: "${FILEAR_BIZTYPE}", 
          values: ["${FILEAR_BIZTYPE_DICT.FILE}"],
        }]
      ) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            anchor
            tags { name value }
            data { size type }
            recipient
            owner { address key }
            fee { winston ar }
            block { id timestamp height previous }
            quantity { winston ar }
            bundledIn { id }
          }
        }
      }
    }`,
  }
}
