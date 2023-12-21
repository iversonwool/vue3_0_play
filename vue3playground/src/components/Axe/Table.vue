<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import { NDataTable } from 'naive-ui'

import type { PaginationProps } from 'naive-ui'
import type { ITableProps } from './AxeTypes'
import { RowData } from 'naive-ui/es/data-table/src/interface'

const props = defineProps<ITableProps>()

const pagination = reactive<PaginationProps>({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

const dataSource = ref<any>([])
const loading = ref<boolean>(false)
async function fetchTableData(params?: any) {
  if (params) {
    try {
      loading.value = true
      const tableData = await props.request(params)
      dataSource.value = tableData
    } catch (error) {
      console.log('error', error)
    } finally {
      loading.value = false
    }
  }
}

const rowClassName = (row: RowData) => {
  if (row.deleteFlag !== 0) {
    return 'too-old'
  }
  return ''
}

defineExpose({
  fetchTableData
})
</script>

<template>
  <div class="nav">
    <slot name="extra"></slot>
  </div>
  <n-data-table
    class="table"
    :columns="columns"
    :bordered="false"
    :data="dataSource"
    size="small"
    :loading="loading"
    :pagination="pagination"
    :max-height="502"
    :row-class-name="rowClassName"
  />
</template>

<style lang="less" scoped>
/deep/.n-data-table-base-table .n-icon {
  padding-top: 6px !important;
  width: 32px !important;
  height: 32px !important;
  box-sizing: border-box !important;
  &:hover {
    background: #ffffff;
    border: 1px solid #dcdee0;
    padding-top: 5px !important;
    box-sizing: border-box !important;
  }
}
/deep/.n-data-table-base-table {
  .n-scrollbar {
    height: inherit !important;
  }
}
/deep/.n-base-selection-label {
  height: 32px !important;
  line-height: 32px !important;
}
/deep/.el-select {
  height: 32px !important;
}
/deep/.n-base-selection {
  height: 32px !important;
  line-height: 32px !important;
}
/deep/.n-input .n-input__input-el {
  height: 32px;
}
/deep/.n-form-item .n-form-item-feedback-wrapper {
  min-height: 0px !important;
}
/deep/.n-form-item-blank .n-input {
  border-radius: 0 !important;
  // width: 220px !important;
  height: 32px !important;
}

:deep(th) {
  padding-left: 16px !important;
  height: 40px !important;
  box-sizing: border-box !important;
}
:deep(td) {
  padding-left: 16px !important;
  height: 40px !important;
  box-sizing: border-box !important;
}
/deep/.n-data-table-td.n-data-table-td--fixed-right {
  text-align: left !important;
}
/deep/.n-data-table-th.n-data-table-th--fixed-right {
  text-align: left !important;
}
:deep(.n-data-table-td--last-col) {
  // padding-left: 16px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-right: 8px !important;
  // line-height: 25px;
  box-sizing: border-box !important;
}
// /deep/[class="n-icon"] {
//   padding-top: 6px !important;
//   width: 32px !important;
//   height: 32px !important;
//   box-sizing: border-box !important;
//   &:hover {
//   background: #ffffff;
//   border: 1px solid #DCDEE0;
//   padding-top: 5px !important;
//   box-sizing: border-box !important;
//   }
// }
/deep/.n-base-icon.n-base-suffix__arrow {
  margin-top: 0 !important;
}
.empty_css:hover {
  border: none !important;
  padding-top: 0 !important;
}

.nav {
  margin-bottom: 16px;
  text-align: right;
}
</style>
