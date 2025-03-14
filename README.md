# Kn Form

![Vite](https://raw.githubusercontent.com/knpreacher/kn-form-lib/refs/heads/main/public/vite.svg)

Kn Form is a Vue 3 and Quasar component library for building forms.

Peer dependencies:

- Quasar v2.18.1
- Vue 3.5.13

## Installation

```bash
yarn install kn-form
```

## Usage

Script (setup)

```typescript

import { ref } from 'vue'
import { KnFormLayout, dh } from 'kn-form'

const form = dh.defineKnForm({
  groups: [
    {
      label: 'Person',
      iconProps: {
        name: 'person'
      },
      fields: [
        dh.defineKnFormStringField({
          dataKey: 'name'
        }),
        // ...
      ]
    }
  ]
})

const data = ref({})

```

Template

```html

<template>
  <KnFormLayout v-bind="form" v-model="data" />
</template>
```