<!-- Using iMask library  -->
<template>
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
</script> 

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
</script>
<!-- Custom Mask -->

<!-- <template>
  <input
    ref="inputRef"
    autocomplete="off"
    aria-label="input-date"
    v-model="formattedDate"
    @input="handleInput"
    :placeholder="mask"
  />
</template>
<style scoped>
input {
  padding: 5px;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
const REGEX = /^(\d{2})(\d{2})(\d{4})$/

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
  const inputEl = event.target as HTMLInputElement
  const formattedValue = inputEl.value.replace(REGEX, '$1/$2/$3')
  inputEl.value = inputEl.value.replace(/\D/g, '')
  const checkDate = dayjs(formattedValue, mask.value)
  inputEl.value = dateValidate(inputEl.value)

  if (mask.value === 'MM/DD/YYYY') {
    // parseInt(inputEl.value.slice(0, 2)) > 12
  }
  if (formattedValue.length === 10) {
    if (checkDate.isValid() && checkDate.isBefore(maxDate) && checkDate.isAfter(minDate)) {
      emit('update:modelValue', format(formattedValue))
    }
  }
}

function dateValidate(value: string): string {
  const minDate = 1990
  const maxDate = new Date().getFullYear() + 1
  let dateValue: string = value

  const month = value.slice(0, 2)
  const day = value.slice(2, 4)
  const year = value.slice(4, 8)
  console.log(+month < 12)

  return dateValue
}
</script> -->
