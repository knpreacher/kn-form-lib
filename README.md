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

## Rules and translation

You can use default rules or define your own rules.

Default rules

```typescript

import { RULES, dh } from 'kn-form'

const rules = RULES({
  $t // Quasar i18n (optional)
})

dh.defineSomeField({
  // ...
  inputProps: {
    rules: [
      rules.required(),
      rules.email(),
      rules.counterMaxEqual(10)
    ]
  }
  // ...
})
```

Localization (use i18n)

```json
{
  "rules": {
    "required": "This field is required",
    "email": "Invalid email format",
    "notEmptyString": "This field is required",
    "engNumOnly": "Only English and numbers are allowed",
    "engNumSpecialOnly": "Only English, numbers and special characters are allowed (no space allowed)",
    "engNumSpecialSpaceOnly": "Only English, numbers and special characters are allowed",
    "numSpecialOnly": "Only numbers and special characters are allowed (no space allowed)",
    "notEqualsTo": "This value must not be equal to {v}",
    "passwordsNotEquals": "Passwords do not match",
    "counterMax": "Maximum {n} characters",
    "counterMin": "Minimum {n} characters",
    "counterEqual": "Exactly {n} characters",
    "counterMaxEqual": "Maximum {n} characters",
    "counterMinEqual": "Minimum {n} characters",
    "lenMaxEqual": "Maximum {n} item(s)",
    "lenMinEqual": "Minimum {n} item(s)",
    "numMaxEqual": "Maximum {num}",
    "numMinEqual": "Minimum {num}",
    "int": "Invalid number format",
    "intOrEmpty": "Invalid number format",
    "float": "Invalid number format",
    "floatOrEmpty": "Invalid number format",
    "checked": "This field is required",
    "slug": "Invalid slug format"
  }
}
```