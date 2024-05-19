<!-- <template>
  <input ref="inputRef" v-model="formattedDate" @input="handleInput" :placeholder="mask" />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
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
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : ''
}
const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const date = format(inputElement.value)
  emit('update:modelValue', date)
}
</script> -->
<!-- <template>
  <input ref="inputRef" v-model="formattedDate" @input="handleInput" :placeholder="mask" />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
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
})

const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : ''
}

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value.replace(/\D/g, '') // Remove non-numeric characters
  if (value.length > 8) {
    value = value.slice(0, 8) // Limit input to 8 characters (YYYY/MM/DD)
  }
  const formattedValue = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3') // Apply date format (YYYY/MM/DD)
  inputElement.value = formattedValue
  emit('update:modelValue', format(value))
}
</script> -->
<template>
  <input ref="inputRef" v-model="formattedDate" @input="handleInput" :placeholder="mask" />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
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
})

const minDate = dayjs('1900-01-01', 'YYYY-MM-DD')
const maxDate = dayjs(new Date().getFullYear() + '-12-31', 'YYYY-MM-DD')

const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : ''
}

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value.replace(/\D/g, '') // Remove non-numeric characters
  const regEx =
    mask.value === 'en-US'
      ? /^(0[1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])\/(?!00)\d{4}$/
      : /^([1-9]|[12][0-9]|3[01])\/([1-9]|1[0-2])\/(?!00)\d{4}$/
  const formattedValue = value.replace(regEx, '$1/$2/$3') // Apply date format (DD/MM/DD)

  if (value.length >= 10) {
    value = value.slice(0, 8) // Limit input to 8 characters (YYYY/MM/DD)
    formattedDate.value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(6)}`
    console.log(formattedDate.value)
    console.log(value.slice(6))

    inputElement.value = formattedDate.value // Update input with
  }

  if (value.length === 10) {
    const parsedDate = dayjs(value, 'YYYY/MM/DD')
    if (parsedDate.isValid() && parsedDate.isAfter(minDate) && parsedDate.isBefore(maxDate)) {
      inputElement.value = formattedValue
      emit('update:modelValue', format(value))
    } else {
      inputElement.value = '' // Reset input if date is invalid or out of range
    }
  } else {
    inputElement.value = formattedValue // Update input with formatted value
  }
}
</script>
