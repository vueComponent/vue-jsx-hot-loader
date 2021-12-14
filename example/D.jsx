import { VueComponent } from 'vue3-oop'

export class D1 extends VueComponent {
  render() {
    return <div>我是类命名导出组件</div>
  }
}

export default class D extends VueComponent {
  render() {
    return (
      <div>
        我是类默认导出组件
      </div>
    )
  }
}
