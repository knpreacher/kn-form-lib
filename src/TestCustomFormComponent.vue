<script setup lang="ts">
import {QSlider} from 'quasar'

const model = defineModel<Record<string, any> | undefined>()
</script>

<template>
  <div>
    <div>I'm custom form</div>
    <div v-if="model">
      <q-slider v-model="model.age" :min="0" :max="200" color="primary"/>
    </div>
    <div v-else>
      No model ((
    </div>
  </div>
</template>

<style scoped>

</style>
