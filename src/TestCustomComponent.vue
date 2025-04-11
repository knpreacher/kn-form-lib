<script setup lang="ts">
import {QSlider} from 'quasar'

const model = defineModel<number | undefined>()
</script>

<template>
  <div>
    <div>I'm custom</div>
    <div>
      <q-slider v-model="model" :min="0" :max="100" color="primary"/>
    </div>
  </div>
</template>

<style scoped>

</style>
