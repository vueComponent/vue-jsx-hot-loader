import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const string: string = 'component C'

    return () => <div>{string}</div>
  },
})
