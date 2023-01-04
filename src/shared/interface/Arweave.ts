export interface MetaData {
  /** Size of the associated data in bytes. */
  size: string
  /** Type is derrived from the \`content-type\` tag on a transaction. */
  type?: string | null
}

export interface Amount {
  /** Amount as an AR string e.g. \`"0.000000000001"\`. */
  ar: string
  /** Amount as a winston string e.g. \`"1000000000000"\`. */
  winston: string
}

export interface Owner {
  /** The owner's wallet address. */
  address: string
  /** The owner's public key as a base64url encoded string. */
  key: string
}

/** UTF-8 */
export interface Tag {
  name: string
  value: string
}

export interface PageInfo {
  hasNextPage: boolean
}

export interface Transaction {
  anchor: string
  /** Transactions with a null block are recent and unconfirmed, if they aren't mined into a block within 60 minutes they will be removed from results. */
  block?: Block | null
  data: MetaData
  fee: Amount
  id: string
  owner: Owner
  parent?: { id: string } | null
  quantity: Amount
  recipient: string
  signature?: string
  tags: Tag[]
}

export interface TransactionEdge {
  cursor: string
  /** A transaction object. */
  node: Transaction
}

export interface TransactionConnection {
  pageInfo: PageInfo
  edges: TransactionEdge[]
}

export interface Block {
  height: number
  /** The block ID. */
  id: string
  /** The previous block ID. */
  previous: number
  /** The block timestamp (UTC). */
  timestamp: number
}

export interface BlockEdge {
  cursor: string
  node: Block
}

export interface ArweaveConfig {
  host: string
  port: number
  protocol: string
}
