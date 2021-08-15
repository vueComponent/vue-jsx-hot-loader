import { defineComponent } from "vue";

export default defineComponent({
  setup() {

    const string = "component C";

    return () => <div>{string}</div>;
  },
});
