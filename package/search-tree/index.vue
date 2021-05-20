<template>
    <tree :status="status" :g-data="scopedData" :replace-fields="replaceFields" @onNodeSelected="onNodeSelected" />
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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

  @Prop({ required: false, default: { success: true, message: '加载成功' } })
  status!:{ success: boolean, message: string }

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
      data.scopedSlots = { title: this.replaceFields.title }
      this.setScopeRecusive(data[this.replaceFields.children] || []);
    }
  }
}
</script>

<style lang="less">
</style>
