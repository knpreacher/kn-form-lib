<script lang="ts" setup>
import {QField} from 'quasar'
import { computed } from 'vue'
import type {
  KnFormComputedInputFieldProps
} from '../../types'

defineOptions({
  name: 'KnFormComputedInputField'
})

const props = defineProps<KnFormComputedInputFieldProps>()

const model = computed(()=>props.getter(props.allData))

</script>
<template>
  <q-field v-model="model" :label="label" v-bind="inputProps">
    <template #control>
      <slot>
        <div v-text="model"></div>
      </slot>
    </template>
  </q-field>
</template>
