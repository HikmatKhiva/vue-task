import type { Directive } from 'vue'
import dayjs from 'dayjs'
const maskDate: Directive = {
  mounted(el: HTMLElement) {
    const inputEl: HTMLInputElement = el as HTMLInputElement
    const locale = (navigator.language || 'en-US') === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
    inputEl.placeholder = locale
    inputEl.addEventListener('input', () => {
      const value = isValid(inputEl.value, locale)
      inputEl.value = value
    })

    function isValid(date: string, mask: string): string {
      const minYear = 1990
      const maxYear = 2020
      const REGEX = /^(\d{2})(\d{2})(\d{4})$/
      date = date.replace(/\D/g, '')
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
      if (date.length === 8) {
        date = formattedValue
      }
      if (
        dayjs(formattedValue, mask).isValid() &&
        dayjs(formattedValue).isAfter(minYear) &&
        dayjs(formattedValue).isBefore(maxYear)
      ) {
        date = formattedValue
      }
      return date
    }
  }
}
export default maskDate
