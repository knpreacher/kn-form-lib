<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { KnFormLayout, dh } from '../dist/index'

const testData = ref({
  label: 'loooool'
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
          dataKey: 'name',
          label: 'Name'
        }),
        dh.defineKnLabelField({
          dataKey: 'label',
          label: 'Label'
        })
      ]
    }
  ]
})
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div v-text="testData"></div>
  <kn-form-layout v-bind="formLayout" v-model="testData" />
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
