<template>
  <div class="meta-search-tree">
      <a-input-search style="margin-bottom: 8px; margin-top: 8px" placeholder="Search" @change="onChange" />
      <a-tree :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="fData"
              :replace-fields="replaceFields"
              @expand="onExpand"
              @select="onSelect">
                <template slot="title" slot-scope="{title}">
                    <span v-if="title.indexOf(searchValue) > -1">
                      <a-icon type="project" /> {{ title.substr(0, title.indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    </span>
                    <span v-else><a-icon type="project" /> {{ title }}</span>
                </template>
      </a-tree>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

interface dataType {
  title: string,
  key: string,
  children:dataType[]
}

@Component({
  components: {}
})
export default class SearchTree extends Vue {
  public expandedKeys = []
  public autoExpandParent = true
  public selectedKeys = []
  public searchValue = ''
  public dataFilter = (item:dataType[]):dataType[] => item

  @Prop({ required: true, default: [{ title: '无数据', key: 'none' }] })
  gData!:[]

  @Prop({
    required: false,
    default: () => {
      return { children: 'children', title: 'title', key: 'key' }
    }
  })
  replaceFields!:{children: string, title: string, key: string}

  get fData() {
    return this.dataFilter(this.gData as any);
  }

  get title() {
    return this.replaceFields.title;
  }

  get children() {
    return this.replaceFields.children;
  }

  get key() {
    return this.replaceFields.key;
  }

  onExpand(expandedKeys:any) {
    this.expandedKeys = expandedKeys
    this.autoExpandParent = false
  }

  @Emit('onNodeSelected')
  onSelect(selectedKeys:any, info:any) {
    this.selectedKeys = selectedKeys
  }

  filterUtil(data: any, value: string):any {
    const title = this.title;
    const children = this.children;
    if (Array.isArray(data)) {
      return data.map((item:any) => this.filterUtil(item, value)).filter((item:any) => item !== undefined);
    } else if (data[title].indexOf(value) >= 0) {
      return data;
    } else if (data[title].indexOf(value) < 0 && data[children] === undefined) {
      return undefined;
    } else {
      const f = this.filterUtil(data[children], value);
      if ((f || []).length === 0) return undefined;
      // 不要直接操作data, 会引起无限递归
      const temp = JSON.parse(JSON.stringify(data));
      temp[children] = f;
      return temp;
    }
  }

  onChange(e:any) {
    const value = e.target.value
    if (value === undefined || value.trim() === '') {
      this.dataFilter = (item:dataType[]):dataType[] => item;
    } else {
      this.dataFilter = (item:dataType[]):dataType[] => this.filterUtil(item, value);
    }
    this.searchValue = value;
    this.autoExpandParent = true;
    this.expandedKeys = this.getExpandKey(this.dataFilter(this.gData as dataType[]));
  }

  getExpandKey(data:[] | any):any {
    const key = this.key;
    const children = this.children;
    if (Array.isArray(data)) {
      return data.map(item => this.getExpandKey(item)).reduce((total, current) => {
        return total.concat(current)
      }, []);
    } else return [data[key]].concat(this.getExpandKey(data[children] || []));
  }
}
</script>

<style lang="less">
  .meta-search-tree {
    display: flex;
    padding: 8px;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #fff;
    box-shadow: 0px 1px 2px 3px #efefef;
    border-radius: 3px;
    min-width: 20vw;
    height: 100%;
    text-align: left;
    overflow: auto;
  }
</style>
