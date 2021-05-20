<template>
  <div class="meta-search-tree">
      <div class="m-input-search">
        <a-input-search style="margin-bottom: 8px; margin-top: 8px" placeholder="Search" @change="onChange" />
      </div>
      <div class="m-a-tree">
        <template v-if="status.success">
        <a-tree :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent"
                :tree-data="fData"
                :replace-fields="replaceFields"
                @expand="onExpand"
                @select="onSelect">
                  <template :slot="replaceFields.title" slot-scope="data">
                      <span v-if="data[replaceFields.title].indexOf(searchValue) > -1">
                        <a-icon type="project" /> {{ data[replaceFields.title].substr(0, data[replaceFields.title].indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>{{ data[replaceFields.title].substr(data[replaceFields.title].indexOf(searchValue) + searchValue.length) }}
                      </span>
                      <span v-else><a-icon type="project" /> {{ data[replaceFields.title] }}</span>
                  </template>
        </a-tree>
        </template>
        <template v-else>
          <div class="m-unsuccess-message">
            <a-spin></a-spin>
           <span>{{ status.message }}</span>
          </div>
        </template>
      </div>
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

  mounted() {
  }

  @Prop({ required: true, default: [{ title: '无数据', key: 'none' }] })
  gData!:[]

  @Prop({
    required: false,
    default: () => {
      return { children: 'children', title: 'title', key: 'key' }
    }
  })
  replaceFields!:{children: string, title: string, key: string}

  @Prop({ required: false, default: { success: true, message: '加载成功' } })
  status!:{ success: boolean, message: string }

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
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    .m-input-search {
      width: 100%;
      height: auto;
    }
    .m-a-tree{
      width: 100%;
      flex: 1;
      overflow: auto;
    }
    .m-unsuccess-message{
      margin: 10px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      span{
        color: #c5c5c5;
        max-width: 100%;
        text-align: center;
      }
    }
  }
</style>
