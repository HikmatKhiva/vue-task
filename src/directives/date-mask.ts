import type { Directive, DirectiveBinding } from 'vue'
import dayjs from 'dayjs'
const maskDate: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    console.log(binding.value);
    const inputEl: HTMLInputElement = el as HTMLInputElement
    inputEl.maxLength = 8
    const locale = (navigator.language || 'en-US') === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
    inputEl.placeholder = locale
    inputEl.addEventListener('input', () => {
      const value = isValid(inputEl.value, locale)
      inputEl.value = value
    })
    function isValid(date: string, mask: string): string {
      const REGEX = /^(\d{2})(\d{2})(\d{4})$/
      date = date.replace(/\D/g, '')
      inputEl.classList.remove('error')
      const formattedValue = inputEl.value.replace(REGEX, '$1/$2/$3')
      const month = dayjs(date.slice(0, 2)).month()
      const day = dayjs(date.slice(2, 4)).day()
      if (isNaN(month) && date[1]?.replace(/^[A-Z]{3,9}$/, '')) {
        date = date[0] + ''
      }
      if (isNaN(day) && parseInt(date.slice(2, 4)) > 31) {
        date = date.slice(0, 2) + ''
      }
      if (parseInt(date.slice(2, 4)) > 31) {
        date = date.slice(0, 3) + ''
      }
      if (parseInt(date[4]) < 1 || parseInt(date[4]) > 2) {
        date = date.slice(0, 4) + ''
      }
      if (parseInt(date[4]) > 1 && parseInt(date[5]) > 0) {
        date = date.slice(0, 5)
      }
      if (parseInt(date[4]) > 1 && parseInt(date[6]) > 2) {
        date = date.slice(0, 6)
      }
      if (parseInt(date[4]) > 1 && parseInt(date[6]) > 1 && parseInt(date[7]) > 0) {
        date = date.slice(0, 7)
      }
      if (date.length === 8 && dayjs(formattedValue, mask, true).isValid()) {
        date = dayjs(formattedValue).format(mask)
      }
      return date
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding)  {
    const inputEl: HTMLInputElement = el as HTMLInputElement
    const locale = (navigator.language || 'en-US') === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
    const REGEX = /^(\d{2})(\d{2})(\d{4})$/
    const formattedValue = inputEl.value.replace(REGEX, '$1/$2/$3')
    if(inputEl.value.length === 8 ) {
      const formatted = dayjs(formattedValue).format(locale)
      const parsed = dayjs(formatted,'YYYY-MM-DD')
      parsed.isValid() ? parsed.format('YYYY/MM/DD') : undefined
      console.log( parsed.isValid() ? parsed.format('YYYY/MM/DD') : undefined);
      binding.value = parsed.isValid() ? parsed.format('YYYY/MM/DD') : undefined
    }
  }
  
}
export default maskDate
