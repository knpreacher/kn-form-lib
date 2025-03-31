<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { KnFormLayout, KnFormDialog, dh, service, types, LazyListView, RULES, type KnFormLayoutExpose } from '../lib'

import { Dialog, QBtn, useQuasar } from 'quasar'

const testData = ref({
  label: 'loooool',
  name: 'name 1234',
  age: 123
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
  ResponseType,
  service.LimitOffsetLazyResourceService<ApiResponseItem, ResponseType>
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
  itemToOption: item => ({ label: item.title, value: String(item.id) })
})

const rules = RULES()

const knFormRef = useTemplateRef<KnFormLayoutExpose>('form')
const formLayout = dh.defineKnForm({
  useActionButtons: true,
  actionButtonsGutterSize: 'lg',
  submitButtonProps: {
    label: 'Submit'
  },
  resetButtonProps: {
    label: 'Reset'
  },
  groupDefaults: {
    expandable: true,
    expanded: true,
    gutterSize: 'md',
    fieldDefaults: {
      gridSize: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 3,
        fit: true
      },
      inputProps: {
        dense: true,
        outlined: true
      }
    }
  },
  groups: [
    {
      label: 'kek',
      fields: [
        dh.defineKnFormStringField('name', {
          wrapToggle: true,
          label: 'Name'
        }),
        dh.defineKnFormInnerFormField('inner', {
          label: 'Inner',
          fieldGutter: 'md',
          fields: [
            dh.defineKnFormStringField('name', {
              label: 'Inner Name'
            }),
            dh.defineKnFormIntField('age', {
              label: 'Inner Age'
            })
          ]
        }),
        dh.defineKnFormIntField('age', {
          label: 'Age'
          // inputProps: {
          //   rules: [
          //     rules.required()
          //   ]
          // }
        }),
        dh.defineKnFormFloatField('weight', {
          label: 'Weight'
        }),
        dh.defineKnFormLabelField('label', {
          label: 'Label'
        }),
        dh.defineKnFormRadioSelectField('select', {
          label: 'Selection',
          returnObject: true,
          rules: [
            rules.required()
          ],
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
        dh.defineKnFormLazySelectField('lazy', {
          label: 'Lazy selection',
          resourceService: testResourceService
        })
      ]
    }
  ]
})

const $q = useQuasar()

function showDialog() {
  dh.defineKnFormDialog({
    formData: formLayout,
    initialValue: testData.value,
    title: 'Test dialog form lorem ipsum asjkh hsjhas jhas'
  }).onOk((data) => {
    console.log('Dialog OK:', data)
    testData.value = data
  })
  // $q.dialog({
  //   component: KnFormDialog,
  //   componentProps: {
  //     formData: formLayout,
  //     initialValue: testData.value,
  //     title: 'Test dialog form lorem ipsum asjkh hsjhas jhas'
  //   }
  // }).onOk(data => {
  //   console.log('Dialog OK:', data)
  //   testData.value = data
  // })
}

function validateForm() {
  console.log('validateForm', knFormRef.value)
  console.log(knFormRef.value?.getValidationComponents())
  knFormRef.value?.validate()?.then(res => {
    console.warn('res', res)
  })
}
</script>

<template>
  <div>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <div v-text="testData"></div>
    <div>
      <!--    <lazy-list-view :resource-service="testResourceService"/>-->
    </div>
    <div>
      <q-btn label="Dialog" @click="showDialog" />
    </div>
    <kn-form-layout v-bind="formLayout" v-model="testData" ref="form" />
    <q-btn label="Validate" @click="validateForm" />
  </div>
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
