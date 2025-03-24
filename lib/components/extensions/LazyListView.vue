<script setup lang="ts" generic="ValueType extends {} = {},ResponseType = any,OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType
">

import {
  QScrollArea,
  QInfiniteScroll,
  QSpinner,
  QItem,
  QItemSection,
  QItemLabel,
  QIcon,
  type VueStyleObjectProp, type QItemProps
} from 'quasar';
import { computed, useTemplateRef } from 'vue';
import type { AbstractLazyResourceService } from '../../utils/lazyResourceService';
import type { KnSelectDefaultOptionType } from '../../types.ts';

defineOptions({
  name: 'LazyListView'
})

const props = withDefaults(defineProps<{
  height?: number,
  itemProps?: Omit<QItemProps, 'clickable' | 'active'>
  resourceService: AbstractLazyResourceService<ValueType, ResponseType, OptionType>,
}>(), {
  height: 200,
})

const emit = defineEmits<{
  onItemClick: [item: ValueType]
}>()

const pxHeight = computed(() => `${props.height}px`)

const scrollArea = useTemplateRef<QScrollArea>('scrollArea')
const scrollAreaStyle = computed<VueStyleObjectProp>(() => ({
  height: pxHeight.value,
  width: '100%',
}))

type LoadFn = QInfiniteScroll['$props']['onLoad']
const onScrollLoad: LoadFn = async (_, done) => {
  await props.resourceService.loadNextItems('')
  done(props.resourceService.isFullyLoaded())
}

const items = props.resourceService.items
const optionItems = props.resourceService.options
</script>

<template>
  <div class="kn-form-lazy-list-view">
    <q-scroll-area ref="scrollArea" :style="scrollAreaStyle">
      <q-infinite-scroll @load="onScrollLoad" class="fit">
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" size="2em"/>
          </div>
        </template>
        <template v-for="(item, ind) in optionItems" :key="`item__${ind}`">
          <slot name="item" :item="items[ind]" :option="item" :index="ind">
            <q-item clickable @click="emit('onItemClick', items[ind])">
              <q-item-section side v-if="item.leftIcon">
                <q-icon v-bind="item.leftIcon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label v-text="item.label"/>
              </q-item-section>
              <q-item-section side v-if="item.rightIcon">
                <q-icon v-bind="item.rightIcon"/>
              </q-item-section>
            </q-item>
          </slot>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </div>
</template>

<style scoped>

</style>
