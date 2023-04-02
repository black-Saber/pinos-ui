import { createApp, defineComponent, h } from 'vue'

type InstanceType<V> = V extends { new(...arg: any[]): infer X } ? X : never
type VM<V> = InstanceType<V> & { unmount: () => void }

export function mount<V>(Comp: V) {
  const el = document.createElement('div')
  const app = createApp(Comp as any)

  const unmount = () => app.unmount()
  const comp = app.mount(el) as any as VM<V>
  comp.unmount = unmount
  return comp
}

export function useSetup<V>(setup: () => V) {
  // eslint-disable-next-line vue/require-name-property
  const Comp = defineComponent({
    setup,
    render() {
      return h('div', [])
    }
  })

  return mount(Comp)
}
