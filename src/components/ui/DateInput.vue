<!-- Using iMask library  -->
<!-- <template>
  <input ref="inputRef" v-model="formattedDate" @input="handleInput" :placeholder="mask" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IMask from 'imask'
import dayjs from 'dayjs'

defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement | null>(null)
const mask = ref<string>('')
const formattedDate = ref<string>('')
onMounted(() => {
  const locale = navigator.language || 'en-US'
  mask.value = locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
  if (inputRef.value instanceof HTMLInputElement) {
    IMask(inputRef.value, {
      mask: mask.value,
      lazy: true,
      blocks: {
        YYYY: { mask: IMask.MaskedRange, from: 1900, to: 2999 },
        MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
        DD: { mask: IMask.MaskedRange, from: 1, to: 31 }
      }
    })
  }
})
const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : undefined
}
const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const date = format(inputElement.value)
  emit('update:modelValue', date)
}
</script>  -->

<template>
  <input ref="inputRef" v-model="formattedDate" maxlength="8" :placeholder="mask" />
  <!-- @input="handleInput" -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(isLeapYear)

defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement | null>(null)
const mask = ref<string>('')
const formattedDate = ref<string>('')

onMounted(() => {
  const locale = navigator.language || 'en-US'
  mask.value = locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
})

const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : undefined
}
const REGEX = /^(\d{2})(\d{2})(\d{4})$/
watch(
  () => formattedDate.value,
  (n, o) => {
    // Remove non-digit characters from the input
    let value = n.replace(/\D/g, '')
    // Check if the new value is different from the old value
    if (value !== o) {
      formattedDate.value = value
    }
    if (!isValid(formattedDate.value)) {
      formattedDate.value = o
    }
    if (formattedDate.value.length === 8) {
      formattedDate.value = formattedDate.value.replace(REGEX, '$1/$2/$3')
      formattedDate.value = dayjs(formattedDate.value, mask.value).format(mask.value)
      emit('update:modelValue', format(formattedDate.value))
    }
  },
  { flush: 'pre' }
)

function isValid(date: string): boolean {
  const day = mask.value !== 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
  const month = mask.value === 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
  if (parseInt(day) > 31) {
    return false
  }
  if (
    dayjs(month).format('MM') === 'Invalid Date' ||
    (parseInt(day) > 29 && dayjs(month).format('MM') == '02')
  ) {
    return false
  }
  if (date.length === 8 && dayjs(date.slice(4, 8)).format('YYYY') === 'Invalid Date') {
    return false
  }
  return true
}
</script>
<!-- <script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(isLeapYear)

defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement | null>(null)
const mask = ref<string>('')
const formattedDate = ref<string>('')

onMounted(() => {
  const locale = navigator.language || 'en-US'
  mask.value = locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
})

const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : undefined
}

const REGEX = /^(\d{2})(\d{2})(\d{4})$/
watch(
  () => formattedDate.value,
  (n, o) => {
    const validFun = mask.value === 'MM/DD/YYYY' ? isValidUs : isValid
    // Remove non-digit characters from the input
    let value = n.replace(/\D/g, '')
    // Check if the new value is different from the old value
    if (value !== o) {
      formattedDate.value = value
    }
    if (!validFun(formattedDate.value)) {
      formattedDate.value = o
    }
    if (formattedDate.value.length === 8) {
      formattedDate.value = formattedDate.value.replace(REGEX, '$1/$2/$3')
      formattedDate.value = dayjs(formattedDate.value, mask.value).format(mask.value)
      emit('update:modelValue', format(formattedDate.value))
    }
  },{
    flush:"pre"
  }
)

function isValid(date: string): boolean {
  if (parseInt(date.slice(0, 2)) > 31) {
    return false
  }
  if (
    (!isNaN(parseInt(date.slice(2, 4))) &&
      dayjs(date.slice(2, 4)).format('MM') === 'Invalid Date') ||
    (parseInt(date.slice(0, 2)) > 29 && dayjs(date.slice(2, 4)).format('MM') == '02')
  ) {
    return false
  }
  if (date.length === 8 && dayjs(date.slice(4, 8)).format('YYYY') === 'Invalid Date') {
    return false
  }
  return true
}
function isValidUs(date: string): boolean {
  if (parseInt(date.slice(2, 4)) > 31 && date.slice(2, 4).length) {
    return false
  }

  if (
    (dayjs(date.slice(0, 2)).format('MM') === '02' && parseInt(date[2]) > 2) ||
    dayjs(date.slice(0, 2)).format('MM') === 'Invalid Date'
  ) {
    return false
  }
  if (date.length === 8 && dayjs(date.slice(4, 8)).format('YYYY') === 'Invalid Date') {
    return false
  }
  return true
}
</script> -->
<!-- Custom Mask -->
