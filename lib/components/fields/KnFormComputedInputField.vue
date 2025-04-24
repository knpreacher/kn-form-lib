<script lang="ts" setup>
import { QField } from 'quasar'
import { computed, watch } from 'vue'
import type {
  KnFormComputedInputFieldProps
} from '../../types'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'

defineOptions({
  name: 'KnFormComputedInputField'
})

const props = defineProps<KnFormComputedInputFieldProps>()

const model = defineModel<any>()

const getterModel = computed(() => props.getter(props.allData))

if (props.syncModel) {
  watch(getterModel, (value) => {
    model.value = value
  })
}

const {usedSlots} = useQuasarKnSlots(props)

</script>
<template>
  <q-field v-model="getterModel" :label="label" v-bind="inputProps">
    <template #control>
      <slot>
        <div v-text="getterModel"></div>
      </slot>
    </template>
    <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
      <slot-renderer :slot-data="slots?.[knSlot]"/>
    </template>
  </q-field>
</template>
