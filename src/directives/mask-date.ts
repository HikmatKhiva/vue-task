import { Directive, DirectiveBinding } from "vue";
const maskDateDirective: Directive = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    const input = el;
  },
};
export default maskDateDirective;