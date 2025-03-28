<script lang="ts" setup
        generic="ValueType extends {} = {}">
import type {
  KnFormLazySelectInputFieldProps
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QField, QPopupProxy, QCard, type VueStyleObjectProp } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { computed, ref } from 'vue'
import LazyListView from './../extensions/LazyListView.vue'

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

const props = withDefaults(defineProps<KnFormLazySelectInputFieldProps<ValueType>>(), {
  optionsHeight: 200,
  optionsMenuWidth: '250px'
})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)

const loading = ref(false)

const popupOpened = ref(false)

const itemToString = (item: ValueType) => {
  if (!item) return ''
  return props.resourceService.itemToOption(item).label
}

function onListViewItemClick(item: ValueType) {
  console.warn(item)
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
