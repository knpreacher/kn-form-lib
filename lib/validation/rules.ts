import { isEmpty } from '../utils/jsUtils'
import type { Ref } from 'vue'

export type TranslateFn = (value: string, scope?: { [key: string]: any }) => string

const fakeTranslate: TranslateFn = (value, scope?) => `${value} [${JSON.stringify(scope)}]`

export interface RulesOptions {
  $t?: TranslateFn
}

export const REGEX = Object.freeze({
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /[^A-Za-z\d]+/,
  SLUG: /(^[A-Za-z]$)|(^[A-Za-z][A-Za-z\d_]+$)/,
  PASSWORD_NEW: /^[A-Za-z\d]+$/,
  SPECIAL: /\W|_/g,
  FLOAT: /\d+(?:\.\d*)?$/,
  FLOAT_OR_EMPTY: /^(\s*|-?\d+(?:\.\d*)?)$/,
  INT: /^\d+$/,
  INT_OR_EMPTY: /^(\s*|\d+)$/,
  NUMBERS_WITH_SPECIALS: /^[0-9*#.\-_+]+$/,
  ENG_NUMBERS_SPECIALS: /^[A-Za-z\d*#.\-_+]+$/,
  ENG_NUMBERS_SPECIALS_SPACE: /^[A-Za-z\d*#.\- _+]+$/
})

const createDefaultOptions: () => Required<RulesOptions> = () => ({ $t: fakeTranslate })

export const RULES = (_options?: RulesOptions) => {
  const { $t }: Required<RulesOptions> = { ...createDefaultOptions(), ..._options }
  return Object.freeze({
    required: () => (value: any) => !isEmpty(value) || $t('rules.required'),

    email: () => (value: any) => REGEX.EMAIL.test(value) || $t('rules.email'),
    notEmptyString: () => (value: any) => value && typeof value === "string" || $t('rules.notEmptyString'),

    engNumOnly: () => (value: any) => !value || REGEX.PASSWORD_NEW.test(value) || $t('rules.engNumOnly'),
    engNumSpecialOnly: () => (value: any) => !value || REGEX.ENG_NUMBERS_SPECIALS.test(value) || $t('rules.engNumSpecialOnly'),
    engNumSpecialSpaceOnly: () => (value: any) => !value || REGEX.ENG_NUMBERS_SPECIALS_SPACE.test(value) || $t('rules.engNumSpecialSpaceOnly'),
    numSpecialOnly: () => (value: any) => !value || REGEX.NUMBERS_WITH_SPECIALS.test(value) || $t('rules.numSpecialOnly'),

    notEqualsTo: (inp: any) => (value: any) => value !== inp || $t('rules.notEqualsTo', {v: inp}),
    passwordEquals: (inp: any) => (value: any) => value === inp || $t('rules.passwordsNotEquals'),
    passwordEqualsRef: (inp: Ref<any>) => (value: any) => value === inp.value || $t('rules.passwordsNotEquals'),

    counterMax: (count: number) => (value: any) => !value || value?.length < count || $t('rules.counterMax', {n: count}),
    counterMin: (count: number) => (value: any) => !value || value?.length > count || $t('rules.counterMin', {n: count}),
    counterEqual: (count: number) => (value: any) => !value || value?.length === count || $t('rules.counterEqual', {n: count}),
    counterMaxEqual: (count: number) => (value: any) => !value || value?.length <= count || $t('rules.counterMaxEqual', {n: count}),
    counterMinEqual: (count: number) => (value: any) => !value || value?.length >= count || $t('rules.counterMinEqual', {n: count}),

    lenMaxEqual: (count: number) => (value: any) => value?.length <= count || $t('rules.lenMaxEqual', {n: count}),
    lenMinEqual: (count: number) => (value: any) => value?.length >= count || $t('rules.lenMinEqual', {n: count}),

    numMaxEqual: (num: number) => (value: any) => !value || value <= num || $t('rules.numMaxEqual', {num: num}),
    numMinEqual: (num: number) => (value: any) => !value || value >= num || $t('rules.numMinEqual', {num: num}),

    int: () => (value: any) => REGEX.INT.test(value) || $t('rules.int'),
    intOrEmpty: () => (value: any) => isEmpty(value) || REGEX.INT_OR_EMPTY.test(value) || $t('rules.int'),
    float: () => (value: any) => REGEX.FLOAT.test(value) || $t('rules.float'),
    floatOrEmpty: () => (value: any) => isEmpty(value) || REGEX.FLOAT_OR_EMPTY.test(value) || $t('rules.float'),
    checked: () => (value: any) => value === true || $t('rules.checked'),
    slug: () => (value: any) => !value || REGEX.SLUG.test(value) || $t('rules.engNumOnly'),

  })
}
