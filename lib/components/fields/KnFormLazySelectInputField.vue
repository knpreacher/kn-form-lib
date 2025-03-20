<script lang="ts" setup
        generic="OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType, ValueType = any">
import type {
  KnFormLazySelectInputFieldProps,
  KnSelectDefaultOptionType
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { type QItemProps, QField, QItem, QItemSection, QItemLabel, QIcon } from 'quasar'
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


</script>
<template>
  <div>
    <q-field v-model="model"
             :label="label"
             v-bind="inputProps"
             :loading="loading"
    >

      <!--              @filter="onSelectFilter"-->
      <!--      <template #option="{opt, itemProps}: OptionSlotScope">-->
      <!--        <q-item v-bind="itemProps">-->
      <!--          <q-item-section avatar v-if="opt.leftIcon">-->
      <!--            <q-icon v-bind="opt.leftIcon"/>-->
      <!--          </q-item-section>-->
      <!--          <q-item-section>-->
      <!--            <q-item-label v-text="displayOptionText(opt)"></q-item-label>-->
      <!--          </q-item-section>-->
      <!--          <q-item-section side v-if="opt.rightIcon">-->
      <!--            <q-icon v-bind="opt.rightIcon"/>-->
      <!--          </q-item-section>-->
      <!--        </q-item>-->
      <!--      </template>-->
    </q-field>
  </div>
</template>
