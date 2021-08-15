import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('C');
    });

    const c = ref(0);

    return () => (
      <>
        <div
          onClick={() => {
            c.value++;
          }}
        >
          {' '}
          点我加一个
        </div>
        <span>我是点C 我的值是 {c.value}</span>
      </>
    );
  },
});
