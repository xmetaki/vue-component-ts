<template>
    <tree :g-data="scopedData" :replace-fields="replaceFields" @onNodeSelected="onNodeSelected"></tree>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Emit } from 'vue-property-decorator'
import tree from './search-tree.vue'

@Component({
  components: {
    tree
  }
})
export default class SearchTreeEntry extends Vue {
  @Prop({
    required: false,
    default: () => {
      return { children: 'children', title: 'title', key: 'key' }
    }
  })
  replaceFields!:{children: string, title: string, key: string}

  @Prop({ required: true, default: [] })
  data!:[]

  created() {
  }

  @Emit('onNodeSelected')
  onNodeSelected(selectedKeys:any, info:any) {
  }

  get scopedData() {
    this.setScopeRecusive(this.data)
    return this.data;
  }

  setScopeRecusive(data:any) {
    if (Array.isArray(data)) data.forEach(item => this.setScopeRecusive(item));
    else {
      data.scopedSlots = { title: 'title' }
      this.setScopeRecusive(data[this.replaceFields.children] || []);
    }
  }
}
</script>

<style lang="less">
</style>
