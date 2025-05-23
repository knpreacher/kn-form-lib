<script lang="ts" setup
        generic="ValueType extends {} = {}">
import type {
  KnFormLazySelectInputFieldProps
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QField, QPopupProxy, QCard, type VueStyleObjectProp } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { computed, inject, ref } from 'vue'
import LazyListView from './../extensions/LazyListView.vue'
import { Consts } from '../../consts.ts'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'
import SlotRenderer from 'lib/components/helpers/SlotRenderer.vue'

defineOptions({
  name: 'KnFormLazySelectInputField'
})

interface QFieldControlSlotScope {
  modelValue: ValueType,
  id: string,
  field: Element,
  editable: boolean,
  focused: boolean,
  floatingLabel: boolean
}

const isDebug = inject<boolean>(Consts.debugInjectKey, false)

const props = withDefaults(defineProps<KnFormLazySelectInputFieldProps<ValueType>>(), {
  optionsHeight: 200,
  optionsMenuWidth: '250px'
})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)
const { usedSlots } = useQuasarKnSlots(props)
const loading = ref(false)

const popupOpened = ref(false)

const itemToString = (item: ValueType) => {
  if (!item) return ''
  return props.resourceService.itemToOption(item).label
}

function onListViewItemClick(item: ValueType) {
  isDebug && console.warn(item)
  model.value = item
  popupOpened.value = false
}

const popupCardStyle = computed<VueStyleObjectProp>(()=>({
  height: `${props.optionsHeight}px`,
  width: props.optionsMenuWidth
}))

</script>
<template>
  <div>
    <q-field v-model="model"
             :label="label"
             v-bind="inputProps"
             :loading="loading"
    >
      <template #control="{modelValue}: QFieldControlSlotScope">
        <span v-text="itemToString(modelValue)"></span>
      </template>
      <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
        <slot-renderer :slot-data="slots?.[knSlot]" />
      </template>

      <q-popup-proxy
        v-bind="popupProxyProps"
        v-model="popupOpened"
      >
        <q-card style="min-width: 100%" :style="popupCardStyle">
          <lazy-list-view
            :resource-service="resourceService"
            :height="optionsHeight"
            :selected-item="model as {}"
            @on-item-click="onListViewItemClick as any"
          />
        </q-card>
      </q-popup-proxy>
    </q-field>
  </div>
</template>
