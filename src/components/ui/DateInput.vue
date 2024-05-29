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

<!-- <template>
  <input
    ref="inputRef"
    @input="handleInput"
    v-model="formattedDate"
    maxlength="8"
    :placeholder="mask"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
const inCorrect = ref(false)
onMounted(() => {
  const locale = navigator.language || 'en-US'
  mask.value = locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
})

const format = (date: string) => {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : undefined
}
// const REGEX = /^(\d{2})(\d{2})(\d{4})$/
// watch(
//   () => formattedDate.value,
//   (n, o) => {
//     // Remove non-digit characters from the input
//     let value = n.replace(/\D/g, '')
//     // Check if the new value is different from the old value
//     if (value !== o) {
//       formattedDate.value = value
//     }
//     if (!isValid(formattedDate.value)) {
//       formattedDate.value = o
//     }
//     if (formattedDate.value.length === 8) {
//       formattedDate.value = formattedDate.value.replace(REGEX, '$1/$2/$3')
//       formattedDate.value = dayjs(formattedDate.value, mask.value).format(mask.value)
//       emit('update:modelValue', format(formattedDate.value))
//     }
//   }
// )

// function isValid(date: string): boolean {
//   const day = mask.value !== 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
//   const month = mask.value === 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
//   if (isNaN(parseInt(date))) {
//     return false
//   }
//   if (parseInt(day) > 31) {
//     return false
//   }
//   if (
//     dayjs(month).format('MM') === 'Invalid Date' ||
//     (parseInt(day) > 29 && dayjs(month).format('MM') == '02')
//   ) {
//     return false
//   }
//   if (date.length === 8 && dayjs(date.slice(4, 8)).format('YYYY') === 'Invalid Date') {
//     return false
//   }
//   return true
// }
const isValidDate = (dateString: string) => {
  // Implement your date validation logic here
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(dateString)
}

function getFormattedDate(date: Date) {
  let year = date.getFullYear()
  let month = (1 + date.getMonth()).toString().padStart(2, '0')
  let day = date.getDate().toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}
const inputMaskFormat = '__/__/____'
const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const inputValue = input.value
  console.log(parse(inputValue))
}
function parse(str: string) {
  console.log(str)
  const yearMonthDay = str.split('-')
  console.log(yearMonthDay)
}
</script> -->

<template>
  <input v-model="formattedDate" @input="updateDate" maxlength="8" :placeholder="mask" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
const emit = defineEmits(['update:modelValue'])
dayjs.extend(isLeapYear)
import { onMounted, ref } from 'vue'
const formattedDate = ref<string>('')
const oldValue = ref<string>('')
const mask = ref<string>('')
onMounted(() => {
  mask.value = navigator.language !== 'en_US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
})
const REGEX = /^(\d{2})(\d{2})(\d{4})$/
const updateDate = (event: Event) => {
  let inputDate = event.target as HTMLInputElement
  const parsedDate = dayjs(inputDate.value, mask.value, true)
  inputDate.value = inputDate.value.replace(/\D/g, '')
  if (inputDate.value.length === 8 && parsedDate.isValid()) {
    inputDate.value = inputDate.value.replace(REGEX, '$1/$2/$3')
    formattedDate.value = inputDate.value
    emit('update:modelValue', format(formattedDate.value))
  }
  if (isValid(inputDate.value)) {
    inputDate.value = inputDate.value
    oldValue.value = inputDate.value
  } else {
    inputDate.value = oldValue.value
  }
}
const config = {
  minYear: 1990,
  maxYear: 2020
}

function isValid(date: string): boolean {
  const day = mask.value !== 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
  const month = mask.value === 'MM/DD/YYYY' ? date.slice(0, 2) : date.slice(2, 4)
  const year = date.slice(6, 10)
  if (date.length === 0) {
    return true
  }
  // Check if the month is valid
  if (dayjs(month).format('MM') === 'Invalid Date') {
    return false
  }
  // Check if the day is valid over 29
  if (
    (parseInt(day[1]) < 1 && day[0] === '0') ||
    parseInt(day) > 31 ||
    (dayjs(month).format('MM') === '02' && parseInt(day) > 29)
  ) {
    return false
  }
  // Check if the year is valid
  if (year.length === 4 && (parseInt(year) < config.minYear || parseInt(year) > config.maxYear)) {
    return false
  }
  if (date.length === 10 && !dayjs(date, mask.value).isLeapYear()) {
    return false
  }
  return true
}
function format(date: string) {
  const parsedDate = dayjs(date, 'YYYY-MM-DD')
  return parsedDate.isValid() ? parsedDate.format('YYYY/MM/DD') : ''
}
</script>
