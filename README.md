# vue-component-ts
🐱‍🏍基于ant-design-vue的各种组件封装(TS版)

# 组件

## search-tree
>基于 ant-design-vue 的搜索树封装

## 依赖相关
本项目依赖于 一部分组件是依赖于 `ant-design-vue` 的某些组件封装的, 因此项目需要引入相关依赖

```typescript
  import Antd from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.less';
  Vue.use(Antd);
```

除此之外,项目可能不支持对less文件的解析,需要在和webpack配置相关的文件中配置如下信息

```js
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
```

## 使用方式

> 要确保以上的依赖问题已经处理 才可以按照如下流程进行使用

### 安装

```bash
$ npm install @metaki/vue-component-ts@latest
```
### 引入
```typescript
import metaki from '@metaki/vue-component-ts';
import '@metaki/vue-component-ts/lib/metaki-component.css'
```

### 使用

```vue
  // 引入搜索树组件
  <SearchTreeEntry :data="data" :replace-fields="replaceFields" @onNodeSelected="onNodeSelected" />
```

