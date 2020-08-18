import { ICoreNode } from '@mammoth/api-core'
import { IFormattedNode } from '@mammoth/api-interfaces'

export const getFormattedNode = (node: ICoreNode): IFormattedNode => ({
  id: node.id,
  value: node.name ?? 'not-sure-why-there-is-no-name',
})
