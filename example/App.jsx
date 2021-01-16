import { defineComponent } from 'vue';
import A from './A';
import { B } from './B';

const App = defineComponent({
  data() {
    return {
      a: 1
    }
  },
  render() {
    const { a } = this;
    return (
      <>
        {a}
        <div onClick={() => { this.a++; }}>Hello World!</div>
        <A />
        <B />
      </>
    )
  }
});

export default App;
