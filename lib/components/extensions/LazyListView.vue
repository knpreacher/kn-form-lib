<script
  setup lang="ts"
  generic="ValueType extends {} = {},ResponseType = any"
>

import {
  QScrollArea,
  QInfiniteScroll,
  QSpinner,
  QItem,
  QItemSection,
  QItemLabel,
  QIcon,
  type VueStyleObjectProp, type QItemProps
} from 'quasar'
import { computed, useTemplateRef } from 'vue'
import type { AbstractLazyResourceService } from '../../utils/lazyResourceService'
import Pass from '../helpers/Pass.vue'

defineOptions({
  name: 'LazyListView'
})

const props = withDefaults(defineProps<{
  height?: number,
  itemProps?: Omit<QItemProps, 'clickable' | 'active'>,
  selectedItem?: ValueType,
  resourceService: AbstractLazyResourceService<ValueType, ResponseType>,
}>(), {
  height: 200
})

const emit = defineEmits<{
  onItemClick: [item: ValueType]
}>()

const pxHeight = computed(() => `${props.height}px`)

const scrollArea = useTemplateRef<QScrollArea>('scrollArea')
const scrollAreaStyle = computed<VueStyleObjectProp>(() => ({
  height: pxHeight.value,
  width: '100%'
}))

type LoadFn = QInfiniteScroll['$props']['onLoad']
const onScrollLoad: LoadFn = async (_, done) => {
  await props.resourceService.loadNextItems('')
  done(props.resourceService.isFullyLoaded())
}

const items = props.resourceService.items
const optionItems = props.resourceService.options

const isItemSelected = (item: ValueType): boolean => {
  if (!props.selectedItem) return false
  return props.resourceService.itemsEqual(item, props.selectedItem)
}
</script>

<template>
  <div class="kn-form-lazy-list-view">
    <q-scroll-area ref="scrollArea" :style="scrollAreaStyle">
      <q-infinite-scroll @load="onScrollLoad" class="fit">
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" size="2em" />
          </div>
        </template>
        <template v-for="(option, ind) in optionItems" :key="`item__${ind}`">
          <pass :bind-props="{item: items[ind], option, ind, active: isItemSelected(items[ind])}">
            <template #default="{option, active, item}">
              <slot name="item" :item="items[ind]" :option="item" :index="ind">
                <q-item
                  :clickable="!active"
                  :active="active"
                  @click="emit('onItemClick', item)"
                >
                  <q-item-section side v-if="option.leftIcon">
                    <q-icon v-bind="option.leftIcon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-text="option.label" />
                  </q-item-section>
                  <q-item-section side v-if="option.rightIcon">
                    <q-icon v-bind="option.rightIcon" />
                  </q-item-section>
                </q-item>
              </slot>
            </template>
          </pass>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </div>
</template>

<style scoped>

</style>
