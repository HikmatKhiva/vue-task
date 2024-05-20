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
    test="salom"
    :aria-errormessage="errorMessage"
  />
</template>
<style scoped>
input {
  padding: 5px;
  outline: none;
  position: relative;
}
input::before {
  content: "attr(aria-errormessage)";
  position: absolute;
  left: 0;
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
const errorMessage = ref<string>('asd')
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
  if (inputEl.value.length > 10) return
  inputEl.value = inputEl.value.replace(/\D/g, '')
  const validValue = isDateValid(inputEl.value)
  const formattedValue = validValue.replace(REGEX, '$1/$2/$3')
  const checkDate = dayjs(formattedValue, mask.value)
  if (
    formattedValue.length == 10 &&
    checkDate.isValid() &&
    checkDate.isBefore(maxDate) &&
    checkDate.isAfter(minDate)
  ) {
    console.log(formattedValue)
    inputEl.style.borderColor = ''
    inputEl.value = formattedValue
  } else {
    inputEl.ariaInvalid = 'invalid date time'
    inputEl.style.borderColor = 'red'
  }

  // if (
  //   formattedValue.length === 10 &&
  //   checkDate.isValid() &&
  //   checkDate.isBefore(maxDate) &&
  //   checkDate.isAfter(minDate)
  // ) {
  //   inputEl.value = formattedValue
  //   // inputEl.style.borderColor = 'inherit'
  //   emit('update:modelValue', format(formattedValue))
  // }
}

function isDateValid(date: string): string {
  const minYear = 1900
  const maxYear = new Date().getFullYear()
  const m = date.slice(0, 2)
  const d = date.slice(2, 4)
  const y = date.slice(4, 8)
  // console.log(dayjs(m,'month'));
  let ttt = dayjs()
  const isValidMonth = dayjs(m, 'MM', true)
  console.log(isValidMonth)

  let month: string = ''
  let day: string = ''
  let year: string = ''

  // if (parseInt(m) <= 12 && parseInt(m) > 0) {
  //   month = parseInt(m) < 10 ? '0' + m : m
  // }

  if (parseInt(d) <= 31 && parseInt(d) > 0) {
    day = parseInt(d) < 10 ? '0' + d : d
  }

  if (minYear <= parseInt(y) && maxYear >= parseInt(y)) {
    year = y
  } else {
    year = ''
  }

  return `${month}${day}${year}`
}
</script> -->
