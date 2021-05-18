import SearchTree from './search-tree'

const components = [
  SearchTree
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

// 直接导入支持
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  SearchTree
}
