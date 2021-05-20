<template>
  <div class="test">
    <tree style="width:200px" :status="{success: true, message: ''}" :data="data" :replace-fields="replaceFields" @onNodeSelected="onNodeSelected"></tree>
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
  public replaceFields = { children: 'childs', title: 'damn', key: 'k' };
  public data = [{
    k: 'aaa',
    damn: '模拟数据11111111111111111111111111111111111111',
    childs: [{
      k: 'aaa-a',
      damn: '模拟数据1-1'
    }]
  },
  {
    k: 'bbb',
    damn: '模拟数据2',
    childs: [{
      k: 'adada',
      damn: '模拟数据2-1'
    }, {
      k: 'eqe',
      damn: '模拟数据2-2'
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
