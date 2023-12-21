<script lang="ts" setup>
import { ref, reactive, toRaw, toRef, onMounted, VNodeProps } from 'vue'
import { NForm, NFormItemGi, NInput, NSelect, NButton, NSpace, FormInst } from 'naive-ui'
import _ from 'lodash-es'
import { IFilterProps } from './AxeTypes'
import { IFilterItem } from '@/interface/filters'

const COMPONENT_MAP: Record<string, VNodeProps> = {
  input: NInput,
  select: NSelect
  // DatePicke: NDatePicker
}

const props = defineProps<IFilterProps>()
const emits = defineEmits<{
  queryAction: [formValue: any]
}>()
let formRef = ref<FormInst | null>(null)
let rawConfig = (toRaw(toRef(props, 'config').value) as unknown) as IFilterItem[]

let formValues = rawConfig.reduce((prev: any, acc) => {
  const { key } = acc
  return {
    ...prev,
    [key]: ''
  }
}, {})

function omitNil(v) {
  console.log(v)
  return v === undefined || v === null || v === ''
}
let model = reactive(_.cloneDeep(formValues))
function handleSearch() {
  emits('queryAction', _.omitBy(toRaw(model), omitNil))
}
function handleReset() {
  Object.assign(model, formValues)
  emits('queryAction', _.omitBy(formValues, omitNil))
}
let generalOptions = []

function getComp(item: IFilterItem) {
  const { is } = item
  if (typeof is === 'string') {
    return COMPONENT_MAP[is] ?? NInput
  }
  return is
}

function onModelValueChangeByKey(key: string) {
  return (value: unknown) => {
    console.log(model)
    model[key] = value
  }
}
function getAttrs(item: IFilterItem) {
  const { is, key, ...rest } = item
  const attrs = _.omit(rest, ['label', 'slotName'])
  const onChange = onModelValueChangeByKey(key)
  let additons = {
    value: model[key],
    'onUpdate:value': onChange
  }
  if (typeof is === 'string') {
    switch (is) {
      case 'input':
        Object.assign(additons, {
          clearable: true
          // onKeyup: withKeys(onSearch, ['enter']),
          // onClear: () => {
          //   onChange('')
          //   onSearch()
          // }
        })
        break
      case 'select':
        Object.assign(additons, {
          clearable: true
          // onClear: () => {
          //   onChange('')
          //   onSearch()
          // },
          // 'onUpdate:value': (...args: unknown[]) => {
          //   onChange(args)
          //   onSearch()
          // }
        })
        break
      default:
        break
    }
  }
  return Object.assign(attrs, additons)
}
</script>

<template>
  <div class="card_box">
    <n-form ref="formRef" class="card" :model="model" label-placement="left" size="small">
      <n-grid :x-gap="16" :y-gap="16">
        <n-form-item-gi v-for="item in config" :key="item.key" :span="6" :label="item.label" :path="item.key">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :item="item"></slot>
          </template>
          <template v-else>
            <component :is="getComp(item)" v-bind="getAttrs(item)" />
          </template>
        </n-form-item-gi>

        <n-form-item-gi :span="6" class="item_but">
          <n-space justify="end" style="width: 100%">
            <n-button type="primary" @click="handleSearch"> 查询 </n-button>
            <n-button @click="handleReset"> 重置 </n-button>
          </n-space>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
.card_box {
  background: #f7f8fa;
  box-sizing: border-box;
  margin-bottom: 16px;
  .item_but {
    // margin-right: 0;
    margin-left: auto;
    /deep/.n-button {
      width: 60px !important;
      // height: 32px !important;
    }
  }
  .card {
    // display: flex;
    // flex-wrap: wrap;
    height: 100% !important;
    padding: 16px 16px 0 16px !important;
    box-sizing: border-box !important;
  }
  .data_css {
    display: flex;
    align-content: center;
    width: 100%;
    .picker_span {
      width: 23px;
      text-align: center;
      color: #646566;
      line-height: 200%;
    }
  }
}
</style>
