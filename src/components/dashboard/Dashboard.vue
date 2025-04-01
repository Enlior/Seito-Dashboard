<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main-content no-selected">
    <div class="top-content">
      <el-row class="search-form" :gutter="10">
        <el-col
          class="form-item"
          :span="6"
          v-for="column in searchFormData"
          :key="column"
        >
          <span class="form-label">{{ column.label }}</span>
          <el-select
            class="form-select"
            v-model="selectedItems[column.prop]"
            value-key="value"
            multiple
            collapse-tags
            collapse-tags-tooltip
            filterable
            clearable
            size="large"
            :placeholder="column.label"
            @change="handleChange(column.prop, $event)"
          >
          <!-- :multiple-limit="1" -->
          <!-- @focus="handleFocus(columns[index])" -->
            <!-- @clear="handleClear(index)" -->
            <template #header>
              <el-input
                v-model="searchInput"
                placeholder="Starts with..."
                :prefix-icon="Search"
                @change="handleSearch"
              />
            </template>
            <el-option
              v-for="item in column.options"
              :key="item.value"
              :value="item.value"
            >
              <span style="float: left">{{ item.value }}</span>
              <!-- <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.count }}</span
              > -->
            </el-option>

            <template #footer>
              <el-button type="primary" size="small"> Include </el-button>
              <el-button text bg size="small"> Exclude </el-button>
            </template>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="center-content">
      <el-row class="table-content" :gutter="10">
        <el-col :span="24">
          <el-table
            :data="tableData"
            max-height="500px"
            min-height="500px"
            stripe
            size="small"
            :header-cell-style="{'text-align': 'left','color':'#1a1c21'}"
            cell-class-name="table-cell"
            class="custom-table"
            show-overflow-tooltip
            :min-width="120"
          >
            <template #empty>
              <div>{{ $t("table.notdata") }}</div>
            </template>
            <el-table-column width="50">
              <template #default="scope">
                <div
                  @click="handleDrawerOpen(scope.row, scope.$index)"
                  class="table-svg-box"
                >
                  <!-- <el-button type="primary" @click="handleDrawerOpen(scope.row)">打开抽屉</el-button> -->
                  <svg
                    v-if="drawerState[scope.$index]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      d="m1.146 14.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4ZM6.5 8A1.5 1.5 0 0 1 8 9.5v3a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1 0-1h3Zm2-5a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 8 6.5v-3a.5.5 0 0 1 .5-.5Zm1.651 2.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4Z"
                      fill="#1268A7"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m4.354 12.354 8-8a.5.5 0 0 0-.708-.708l-8 8a.5.5 0 0 0 .708.708ZM1 10.5a.5.5 0 1 1 1 0v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 1 13.5v-3Zm14-5a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 1 0-1h3A1.5 1.5 0 0 1 15 2.5v3Z"
                      fill="#1268A7"
                    ></path>
                  </svg>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-for="column in columns"
              :key="column"
              :prop="column"
              :label="column"
              width="120"
            >
            </el-table-column>
          </el-table>
          <div class="pagination-block">
            <el-pagination
              v-model:current-page="page.currentPage"
              v-model:page-size="page.pageSize"
              :page-sizes="[10, 20, 30, 50]"
              v-model:total="page.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handlePagesizeChange"
              @current-change="handleCurrentPageChange"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <DocumentDrawer
      direction="rtl"
      title="Document"
      :drawerVisible="drawerVisible"
      :data="jsonData"
      @handleClose="handleDrawerClose"
    ></DocumentDrawer>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  // computed,
} from "vue";
// import CollectionInfo from "@/components/dashboard/CollectionInfo.vue";
import {  getCustomers } from "@/axios/api";
import { Search } from "@element-plus/icons-vue";
import DocumentDrawer from "@/components/dashboard/DocumentDrawer.vue";

//列信息
const columns = ref([]);
const searchInput = ref("");
const selectedItems = ref({});
const searchFormData = ref([]);
const selectOptions = ref([]);
// 表格数据
const tableData = ref([]);
const showColumns = [
  "modelName1",
  "clientCode",
  "officeCode",
  "clientName1",
  "modelType",
  "status",
  "handledBy",
  "warrantyType",
  "reqDateTime",
  "salesmanCountry",
  "server",
];


onMounted(async () => {
  loadData();
});

const loadData = async(searchParam) =>{
  let params = {
    size: 20,
    filterReq: {
      query: searchParam || [],
    },
  };
  await getCustomers(params).then((result)=>{
    console.log("data", result.data);
    const items = result.data.items;
    tableData.value = items;
    tableData.value.forEach((item, index) => {
      drawerState.value[index] = false;
    });
    items.map((v) => {
      const keys = Object.keys(v);
      columns.value = [...new Set([...columns.value, ...keys])];
    });
    if(searchFormData.value.length === 0){
      const optionArr = getSelectOptions();
      selectOptions.value = optionArr;
      showColumns.map((v)=>{
        selectedItems.value[v] = [];
        searchFormData.value.push({
          label:v,
          prop:v,
          options:optionArr[v],
        })
      });
      console.log('showColumns',selectedItems.value)
      
      console.log('options',searchFormData.value)
    }
  }).catch((err)=>{
    console.error(err?.msg)
  });
  
}

// const selectOptions = computed(() => {
const getSelectOptions = () => {
  const options = {};
  columns.value.forEach((column) => {
    const uniqueValues = [
      ...new Set(tableData.value.map((item) => item[column])),
    ];
    options[column] = uniqueValues.map((value) => ({label: column, value:value }));
  });
  return options;
};

// const state = ref(false);
// const infoState = ref(false);
let collectionName = ref("");
// let dbName = ref("");
// 选中的列
const activeColumns = ref([]);
// const columns = ref([]);

const drawerVisible = ref(false);
const jsonData = ref({});
const drawerState = ref([]);

const { proxy } = getCurrentInstance();

const page = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 100,
});

const handleDrawerOpen = (rowData, index) => {
  drawerVisible.value = true;
  jsonData.value = rowData;
  drawerState.value[index] = !drawerState.value[index];
};

const handleDrawerClose = () => {
  drawerVisible.value = false;
  drawerState.value.forEach((item, index) => {
    drawerState.value[index] = false;
  });
};

//选中要筛选的el-select的列
let selectedColumns = [];

watch(activeColumns, (newVal, oldVal) => {
  console.log("activeColumns change", newVal, oldVal);
  console.log("proxy", proxy);
  //    selectedColumns = []
});

const handleSearch = () => {
  console.log(searchInput);
};


const handleChange = async (column,selectVal) => {
  console.log('selectVal',selectVal,selectedItems.value);
  const searchParam = [];

  showColumns.map((column)=>{
    const item = selectedItems.value[column];
    const val = Object.values(item);
    val.map((v)=>{
      const params = {
        attribute:column,
        operator:'=',
        value:v
      }
      searchParam.push(params);
    })
    
  })
    
  loadData(searchParam);
};

const handlePagesizeChange = async () => {
  page.currentPage = 1;
  let params = {
    filters: selectedColumns,
    collectionName: collectionName.value,
    fields: activeColumns.value,
    pageSize: page.pageSize,
    currentPage: page.currentPage,
  };
  let result = await getCustomers(params);
  if (result.code !== 200) {
    new proxy.$tips(result.msg, "error").showMsg();
    return;
  }
  let tableData = constrcutObject(result.data.data);
  tableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  });
};

const handleCurrentPageChange = async () => {
  let params = {
    filters: selectedColumns,
    collectionName: collectionName.value,
    fields: activeColumns.value,
    pageSize: page.pageSize,
    currentPage: page.currentPage,
  };
  let result = await getCustomers(params);
  if (result.code !== 200) {
    new proxy.$tips(result.msg, "error").showMsg();
    return;
  }
  let tableData = constrcutObject(result.data.data);
  tableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  });
};

const constrcutObject = (data) => {
  //循环data数组，将每一个map转换为对象
  let result = [];
  data?.forEach((item) => {
    let obj = {};
    for (let key in item) {
      obj[key] = item[key];
    }
    result.push(obj);
  });
  return result;
};
</script>

<style scoped>
.main-content {
  background-color: #f7f8fc;
  color: rgb(52, 55, 65);
}
.top-content {
  margin: 0 8px;
  padding-bottom: 4px;
  padding-top: 8px;
}
.center-content{
  padding:5px 8px;
}

.right-btn {
  text-align: right;
  margin: 3px 0;
}

.table-content {
  height: 100%;
  min-height: 380px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0.9px 4px,
    rgba(0, 0, 0, 0.06) 0px 2.6px 8px, rgba(0, 0, 0, 0.05) 0px 5.7px 12px,
    rgba(0, 0, 0, 0.04) 0px 15px 15px;
}

.table-content .el-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

:deep(.table-content .el-table tr){
  height: 32px;
}

:deep(.table-content .el-table tr.el-table__row--striped td.el-table__cell){
  background-color: #f5f7fa;
}


.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.search-form {
  width: 100%;
}
.form-item {
  margin: 5px 0;
  display: flex !important;
}
.form-label {
  height: 38px;
  line-height: 38px;
  background-color: var(--el-fill-color-blank);
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border:1px solid #d3dae6e6;
  border-right: 0;
  text-align: center;
  padding: 0px 12px;
  justify-content: center;
  text-align: center;
  background-color: #e9edf3;
  color: #1a1c21;
  font-size: 12px;
  font-weight: 600;
}
.form-select {
  flex: 1;
}

.form-select :deep(.el-select__wrapper) {
  height: 38px;
  line-height: 38px;
  border:1px solid #d3dae6e6;
  border-left: 0;
  box-shadow: none;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.custom-table{
  border-radius: 6px;
}

.table-cell{
  text-align: 'center';
  color:'#343741';
}

.pagination-block {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
}
.drawer-content {
  text-align: right;
  color: #1268a7;
  font-size: 14px;
}

.json-content {
  margin-top: 10px;
}

.drawer-content span:hover {
  cursor: pointer;
  text-decoration: underline;
}

.table-svg-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
