import type { QFieldSlots } from 'quasar'
import type { KnFormAnyField, KnFormAnyFieldProps } from '../types.ts'

type QuasarSlots = keyof Required<QFieldSlots>
type KnSlots = keyof Required<KnFormAnyField>['slots']

export const quasarSlotRemap = {
  'label': 'label',
  'before': 'append',
  'after': 'prepend',
  'append': 'appendInner',
  'prepend': 'prependInner'
} as Record<QuasarSlots, KnSlots>

export const quasarSlotRemapArray = Object.entries(quasarSlotRemap) as [QuasarSlots, KnSlots][]


export const useQuasarKnSlots = <Props extends KnFormAnyFieldProps>(props: Props) => {
  const usedSlotNames = Object.keys(props.slots ?? {})
  const usedSlots = quasarSlotRemapArray.filter(sd => usedSlotNames.includes(sd[1]))

  return {
    usedSlotNames,
    usedSlots
  }
}
