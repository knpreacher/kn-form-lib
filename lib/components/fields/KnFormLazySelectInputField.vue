<script lang="ts" setup
        generic="OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType, ValueType = any">
import type {
  KnFormLazySelectInputFieldProps,
  KnSelectDefaultOptionType
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { type QItemProps, QSelect, QItem, QItemSection, QItemLabel, QIcon, QBtn, QSelectProps } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { computed, nextTick, ref } from 'vue';

interface OptionSlotScope {
  index: number,
  opt: OptionType,
  itemProps: QItemProps,
}

defineOptions({
  name: 'KnFormLazySelectInputField'
})

const props = withDefaults(defineProps<KnFormLazySelectInputFieldProps<OptionType, ValueType>>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const {model} = useKnFormField(props, emit)

const loading = ref(false)

const displayOptionText = (o: OptionType): string => {
  if (o.label) {
    return o.label
  }
  return String(o.value)
}

function testButtonClick() {
  props.resourceService.loadNextItems('').then(() => {
    console.log('done', props.resourceService.items)
    nextTick()
  })
}

// const options = ref<OptionType[]>([])
const options = computed<OptionType[]>(() => props.resourceService.items.value as OptionType[])

// type FilterFn = QSelectProps['onFilter']
type ScrollFn = QSelectProps['onVirtualScroll']
// const onSelectFilter: FilterFn = (val, update) => {
//   if (props.resourceService.isFullyLoaded()) {
//     update(() => {
//     })
//     return
//   }
//   update(() => {
//     props.resourceService.loadNextItems(val).then((items) => {
//       options.value = items as OptionType[]
//     })
//   })
// }

const onOptionsScroll: ScrollFn = ({ref}) => {
  loading.value = true
  props.resourceService.loadNextItems('').then(() => {
    // options.value = items as OptionType[]
    nextTick(() => {
      ref.refresh()
      loading.value = false
    })
  })
}
</script>
<template>
  <div>
    <div>{{ options }}</div>
    <q-btn @click="testButtonClick" label="TEST"/>
    <q-select v-model="model"
              :label="label"
              option-value="value"
              option-label="label"
              option-disable="disable"
              v-bind="inputProps"
              :loading="loading"
              @virtual-scroll="onOptionsScroll"
              :map-options="returnObject"
              :emit-value="!returnObject"
              use-input
              :options="options"
    >
      <!--              @filter="onSelectFilter"-->
      <template #option="{opt, itemProps}: OptionSlotScope">
        <q-item v-bind="itemProps">
          <q-item-section avatar v-if="opt.leftIcon">
            <q-icon v-bind="opt.leftIcon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label v-text="displayOptionText(opt)"></q-item-label>
          </q-item-section>
          <q-item-section side v-if="opt.rightIcon">
            <q-icon v-bind="opt.rightIcon"/>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
