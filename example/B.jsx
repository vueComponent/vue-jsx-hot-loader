import { defineComponent } from 'vue';

const B = defineComponent({
  data() {
    return {
      a: 1
    }
  },
  render() {
    const { a } = this;
    return (
      <>
        <div onClick={() => { this.a++; }}>{a}d4s</div>
        <span>2</span>
      </>
    );
  }
});

export {
  B
};
