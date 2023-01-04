export const queryUserHistory = (address: string, after?: string): Object => {
  return {
    query: `{
      transactions (
        owners:["${address}"],
        first: 15,
        after: "${after ?? ''}"
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
