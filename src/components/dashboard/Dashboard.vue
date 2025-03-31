<template>
  <div class="main-content">
    <el-row class="search-form" :gutter="10">
      <el-col
        class="form-item"
        :span="6"
        v-for="(column, index) in showColumns"
        :key="column"
      >
        <span class="form-label">{{ column }}</span>
        <!-- style="margin: 2px; display: flex; align-items: center" -->
        <el-select
          class="form-select"
          v-model="selectedValues[column]"
          filterable
          clearable
          size="large"
          :placeholder="column"
          @change="handleChange"
          @focus="handleFocus(columns[index])"
          @clear="handleClear(index)"
        >
          <template #header>
            <el-input
              v-model="searchInput"
              placeholder="Starts with..."
              :prefix-icon="Search"
              @change="handleSearch"
            />
          </template>
          <!-- v-for="item in tableData.map(item => item[column])" -->
          <el-option
            v-for="item in selectOptions[column]"
            :key="item.value"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.count }}</span
            >
          </el-option>

          <template #footer>
            <el-button type="primary" size="small"> Include </el-button>
            <el-button text bg size="small"> Exclude </el-button>
          </template>
        </el-select>
      </el-col>
    </el-row>
    <!-- <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <el-button v-if="showCollapse" type="link" class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? '收起' : '展开' }}
              <component :is="collapsed ? UpOutlined : DownOutlined"></component>
          </el-button>
        </el-col>
      </el-row> -->
    <el-row :gutter="10" style="margin-top: 15px">
      <el-col class="table-content" :span="24">
        <el-table
          :data="tableData"
          max-height="500px"
          min-height="500px"
          border
          stripe
          size="small"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
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
      <template #header="scope" >
        <div class="header-container"  @mouseover="showMoreIcon(column)" @mouseout="hideMoreIcon(column)">
          <span> {{ column }} </span>
          <el-icon  class="header-icon" v-if="showColumnIcon[column]">
            <More />
          </el-icon>
        </div>
      </template>

      <!-- <template #default="scope">
        {{ scope.row[column] }}
      </template> -->


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
  computed,
} from "vue";
// import CollectionInfo from "@/components/dashboard/CollectionInfo.vue";
import { getDocumentsByFilterColumn, getCustomers } from "@/axios/api";
import { Search } from "@element-plus/icons-vue";
import DocumentDrawer from "@/components/dashboard/DocumentDrawer.vue";

//列信息
const columns = ref([]);
const searchInput = ref("");
const selectedValues = ref({});
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
  let params = {
    size: 20,
    filterReq: {
      query: [
        // {
        // attribute:'clientCode',
        // operator:'=',
        // value:'S12004'
        // }
      ],
    },
  };
  let result = await getCustomers(params);
  console.log("data", result.data);
  const items = result.data.items;
  tableData.value = items;
  // searchColumnsData.value = items;
  tableData.value.forEach((item, index) => {
    drawerState.value[index] = false;
  });
  items.map((v) => {
    const keys = Object.keys(v);
    columns.value = [...new Set([...columns.value, ...keys])];
  });
});


const showMoreIcon = (col)=>{
  showColumnIcon.value[col] = true;
}

const hideMoreIcon = (col)=>{
  showColumnIcon.value[col] = false;
}

const selectOptions = computed(() => {
  const options = {};
  columns.value.forEach((column) => {
    const uniqueValues = [
      ...new Set(tableData.value.map((item) => item[column])),
    ];
    options[column] = uniqueValues.map((value) => ({ label: value, value }));
  });
  return options;
});

// const state = ref(false);
// const infoState = ref(false);
let collectionName = ref("");
// let dbName = ref("");
// 选中的列
const activeColumns = ref([]);
// const columns = ref([]);

const drawerVisible = ref(false);
const jsonData = ref({});
const drawerState = ref([])
const showColumnIcon = ref([])

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

watch(columns,(newVal, oldVal)=>{
  console.log("columns change",newVal, oldVal)
  newVal.forEach((item, index) => {
    showColumnIcon.value[index+1] = false;
  })
})


//点击的input框对应的名字和数量
// const nameAndCounts = ref([]);

// let selectedColumnName = "";

const handleFocus = async (val) => {
  console.log(val);
  // selectedColumnName = val;
  // let params = {
  //   collectionName: collectionName.value,
  //   currentField: val,
  //   fields: activeColumns.value,
  //   filters: selectedColumns,
  // };
  // let result = await getFeildListAndCount(params);

  // if (result.code !== 200) {
  //   ElMessage.error(result.msg);
  //   return;
  // }
  // nameAndCounts.value = result.data;
};

const handleSearch = () => {
  console.log(searchInput);
};

const handleChange = async (val) => {
  console.log(val);
  //通过selectedColumns数组，筛选出field为selectedColumnName的对象，如果value没有值，则构建对象，推入selectedColumns数组
  // page.currentPage = 1;
  // let index = selectedColumns.findIndex(
  //   (item) => item.field === selectedColumnName
  // );
  // if (index == -1) {
  //   selectedColumns.push({ field: selectedColumnName, value: val });
  // } else {
  //   if (!selectedColumns[index].value || selectedColumns[index].value !== val) {
  //     selectedColumns[index].value = val;
  //   }
  // }

  // let params = {
  //   filters: selectedColumns,
  //   collectionName: collectionName.value,
  //   fields: activeColumns.value,
  //   pageSize: page.pageSize,
  //   currentPage: page.currentPage,
  // };
  // let result = await getDocumentsByFilterColumn(params);
  // if (result.code !== 200) {
  //   new proxy.$tips(result.msg, "error").showMsg();
  //   return;
  // }
  // page.total = result.data.totalCount;
  // let tableData = constrcutObject(result.data.data);
  // activeTableData.value = tableData;
};

const handleClear = async (index) => {
  page.currentPage = 1;
  let clearName = activeColumns.value[index];
  let nameIndex = selectedColumns.findIndex((item) => item.field === clearName);
  if (nameIndex != -1) {
    selectedColumns.splice(nameIndex, 1);
  }
  let params = {
    filters: selectedColumns,
    collectionName: collectionName.value,
    fields: activeColumns.value,
    pageSize: page.pageSize,
    currentPage: page.currentPage,
  };
  let result = await getDocumentsByFilterColumn(params);
  if (result.code !== 200) {
    new proxy.$tips(result.msg, "error").showMsg();
    return;
  }
  page.total = result.data.totalCount;
  let tableData = constrcutObject(result.data.data);
  tableData.value = tableData;
  tableData.value.forEach((item, index) => {
    drawerState.value[index] = false;
  });
};

// const handleSelectColInfo = async (data, val, val2) => {
//   page.currentPage = 1;
//   collectionName.value = data;
//   activeColumns.value = val;
//   infoState.value = true;
//   selectedColumns = [];

//   activeColumns.value.forEach((v) => {
//     columns.value[v] = "";
//   });

//   dbName.value = val2;
//   let params = {
//     filters: [],
//     collectionName: collectionName.value,
//     fields: activeColumns.value,
//     pageSize: page.pageSize,
//     currentPage: page.currentPage,
//   };
//   let result = await getDocumentsByFilterColumn(params);
//   if (result.code !== 200) {
//     new proxy.$tips(result.msg, "error").showMsg();
//     return;
//   }
//   page.total = result.data.totalCount;
//   let tableData = constrcutObject(result.data.data);
//   tableData.value = tableData;
//   tableData.forEach((item, index) => {
//     drawerState.value[index] = false;
//   })
// };

// const handleCheckedColumnsChange = async (val) => {
//   page.currentPage = 1;
//   activeColumns.value = val;
//   activeColumns.value.forEach((v) => {
//     columns.value[v] = "";
//   });
//   let params = {
//     filters: [],
//     collectionName: collectionName.value,
//     fields: activeColumns.value,
//     pageSize: page.pageSize,
//     currentPage: page.currentPage,
//   };
//   let result = await getDocumentsByFilterColumn(params);
//   if (result.code !== 200) {
//     new proxy.$tips(result.msg, "error").showMsg();
//     return;
//   }
//   page.total = result.data.totalCount;
//   let tableData = constrcutObject(result.data.data);
//   tableData.value = tableData;
//   tableData.forEach((item, index) => {
//     drawerState.value[index] = false;
//   })
// };

// const handlePaginationChange = async () => {
//     let params = { filters: selectedColumns, "collectionName": collectionName.value, "fields": activeColumns.value, pageSize: page.pageSize, currentPage: page.currentPage }
//     let result = await getDocumentsByFilterColumn(params)
//     if(result.code !== 200){
//         new proxy.$tips(result.msg,'error').showMsg()
//         return
//     }
//     let tableData = constrcutObject(result.data.data)
//     activeTableData.value = tableData
// }

const handlePagesizeChange = async () => {
  page.currentPage = 1;
  let params = {
    filters: selectedColumns,
    collectionName: collectionName.value,
    fields: activeColumns.value,
    pageSize: page.pageSize,
    currentPage: page.currentPage,
  };
  let result = await getDocumentsByFilterColumn(params);
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
  let result = await getDocumentsByFilterColumn(params);
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
.header-icon{
  margin-left: 10px;
}

.header-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 3px;
}

.top-content span:nth-child(1) {
  margin: 0 5px;
}

.top-content span:nth-child(2) {
  margin: 0 15px;
}

.right-btn {
  text-align: right;
  margin: 3px 0;
}

.table-content {
  height: 100%;
  min-height: 380px;
  padding: 5px;
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0.9px 4px,
    rgba(0, 0, 0, 0.06) 0px 2.6px 8px, rgba(0, 0, 0, 0.05) 0px 5.7px 12px,
    rgba(0, 0, 0, 0.04) 0px 15px 15px;
}

.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.main-content {
  padding: 10px;
}
.search-form {
  width: 100%;
}
.form-item {
  margin: 5px 0;
  display: flex !important;
}
.form-label {
  height: 40px;
  line-height: 40px;
  background-color: var(--el-fill-color-blank);
  border-radius: var(--el-border-radius-base);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  border-right: 0;
  text-align: center;
  padding: 0px 10px;
  justify-content: center;
  text-align: center;
  background: #e9edf3;
  font-size: 14px;
}
.form-select {
  flex: 1;
}

.form-select :deep(.el-select__wrapper) {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.custom-table :deep(td) {
  padding: 2px 0;
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
