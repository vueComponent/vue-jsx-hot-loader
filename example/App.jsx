import { defineComponent } from 'vue'
import A from './A'
import { B } from './B'
import C from './C'

const App = defineComponent({
  data() {
    return {
      a: 1,
    }
  },
  render() {
    const { a } = this
    return (
      <>
        {a}
        <div
          onClick={() => {
            this.a++
          }}
        >
          Hello World!
        </div>
        <A />
        <B />
        <C />
      </>
    )
  },
})
export default App
