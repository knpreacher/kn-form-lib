<script setup lang="ts">
import { ref } from 'vue'
// import { KnFormLayout, dh } from '../dist'
import { KnFormLayout, dh, service, types, LazyListView } from '../lib'

const testData = ref({
  label: 'loooool'
})

interface ApiResponseItem {
  id: number,
  title: string,
}

interface ApiResponse {
  products: ApiResponseItem[],
  total: number,
  skip: number,
  limit: number
}

class MyResourceService<ResponseType extends ApiResponse = ApiResponse> extends service.LimitOffsetLazyResourceService<
  ApiResponseItem,
  ResponseType
> {


  getItemsFromResponse(response: ResponseType): ApiResponseItem[] {
    return response.products
  }


  processResponse(response: ResponseType) {
    super.processResponse(response)
    this.limit = response.limit
    this.offset += response.limit
    this.total = response.total
  }
}

const testResourceService = new MyResourceService<ApiResponse>({
  requestFn: async (ctx, stringFilter) => {
    console.log('Call requestFn', ctx.offset, ctx.total)
    const resp = await fetch(
      `https://dummyjson.com/products?limit=${ctx.limit}&skip=${ctx.offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(ctx.offset, resp.url)
    return resp.json()
  },
  limit: 50,
  itemToOption: item => ({label: item.title, value: String(item.id)})
})

const formLayout = dh.defineKnForm({
  groupDefaults: {
    gutterSize: 'md',
    fieldDefaults: {
      gridSize: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 3
      },
      inputProps: {
        outlined: true
      }
    }
  },
  groups: [
    {
      label: 'kek',
      fields: [
        dh.defineKnFormStringField({
          wrapToggle: true,
          dataKey: 'name',
          label: 'Name',
        }),
        dh.defineKnFormIntField({
          dataKey: 'age',
          label: 'Age'
        }),
        dh.defineKnFormFloatField({
          dataKey: 'weight',
          label: 'Weight'
        }),
        dh.defineKnLabelField({
          dataKey: 'label',
          label: 'Label'
        }),
        dh.defineKnFormSelectField({
          dataKey: 'select',
          label: 'Selection',
          returnObject: true,
          inputProps: {
            clearable: true,
          },
          options: [
            {
              value: 'kek',
              disable: true,
              leftIcon: {
                name: 'close'
              }
            },
            {
              value: 'lol',
              leftIcon: {
                name: 'star',
                color: 'primary'
              }
            }
          ]
        }),
        // dh.defineKnFormLazySelectField({
        //   label: 'Lazy selection',
        //   dataKey: 'lazy',
        //   resourceService: testResourceService,
        // }),
      ]
    }
  ]
})
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <div v-text="testData"></div>
  <div>
    <lazy-list-view :resource-service="testResourceService"/>
  </div>
  <kn-form-layout v-bind="formLayout" v-model="testData"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
