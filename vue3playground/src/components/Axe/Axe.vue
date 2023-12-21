<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import { DataTableInst } from 'naive-ui'
import Table from './Table.vue'
import Filter from './Filter.vue'
import type { IAxeProps } from './AxeTypes'

const props = defineProps<IAxeProps>()
let tableRef = ref(null)

function searchAction(formValues) {
  console.log('formValues', formValues)
  loadData(formValues)
}
function loadData(params) {
  tableRef.value?.fetchTableData(params)
}
onMounted(() => {
  console.log('Axe Props', props)
  loadData({})
})
</script>

<template>
  <Filter :="filterProps" @query-action="searchAction" />
  <Table ref="tableRef" :="tableProps" />
</template>

<style lang="less" scoped></style>
