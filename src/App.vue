<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
// import { KnFormLayout, dh } from '../dist'
import { KnFormLayout, dh, service, types } from '../lib'

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
  types.KnSelectDefaultOptionType,
  ResponseType
> {

  parseResponseItem(item: ApiResponseItem): types.KnSelectDefaultOptionType {
    return {
      value: String(item.id),
      label: item.title
    }
  }


  getItemsFromResponse(response: ResponseType): types.KnSelectDefaultOptionType[] {
    return response.products.map(this.parseResponseItem)
  }


  processResponse(response: ResponseType): ResponseType {
    this.limit = response.limit
    this.offset += response.limit
    this.total = response.total
    return response
  }
}

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
        dh.defineKnFormLazySelectField({
          label: 'Lazy selection',
          dataKey: 'lazy',
          resourceService: new MyResourceService(
            async (ctx, stringFilter) => {
              const resp = await fetch(
                `https://dummyjson.com/products?limit=${ctx.limit}&skip=${ctx.offset}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              )
              console.log(ctx, resp.body)
              return resp.json()
            }, 10
          )
        }),
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
  <HelloWorld msg="Vite + Vue"/>
  <div v-text="testData"></div>
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
