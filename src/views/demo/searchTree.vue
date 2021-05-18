<template>
  <div class="test">
    <tree :data="data" :replace-fields="replaceFields" @onNodeSelected="onNodeSelected"></tree>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import tree from '../../../package/search-tree/index.vue'

@Component({
  components: {
    tree
  }
})
export default class SearchTree extends Vue {
  public replaceFields = { children: 'childs', title: 'title', key: 'k' };
  public data = [{
    k: 'aaa',
    title: '模拟数据1',
    childs: [{
      k: 'aaa-a',
      title: '模拟数据1-1'
    }]
  },
  {
    k: 'bbb',
    title: '模拟数据2',
    childs: [{
      k: 'adada',
      title: '模拟数据2-1'
    }, {
      k: 'eqe',
      title: '模拟数据2-2'
    }]
  }]

  onNodeSelected(selectedKeys:any, info:any) {
  }
}
</script>

<style lang="less">
  .test {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 300px;
    margin-top: 10px;
  }
</style>
