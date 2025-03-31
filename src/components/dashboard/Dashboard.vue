<template>
  <!-- <div class="top-content">
    <div class="lefe-nav">
      <span v-show="infoState"
        >数据库：<el-tag class="ml-2" type="success">{{ dbName }}</el-tag></span
      ><span v-show="infoState"
        >数据表：<el-tag class="ml-2" type="success">{{
          collectionName
        }}</el-tag></span
      >
    </div>
    <div class="right-btn">
      <ElButton @click="state = !state">{{
        state ? "展示全部" : "修改展示"
      }}</ElButton>
    </div>
  </div> -->
  <div class="center-content">
  <el-row class="search-form" :gutter="10">
    <el-col
      class="form-item"
      :span="6"
      v-for="(column, index) in activeColumns"
      :key="index"
      
    >
      <span class="form-label">{{column}}</span>
    <!-- style="margin: 2px; display: flex; align-items: center" -->
      <el-select
        class="form-select"
        v-model="columns[column]"
        filterable
        clearable
        size="large"
        :placeholder="column"
        @change="handleChange"
        @focus="handleFocus(activeColumns[index])"
        @clear="handleClear(index)"
      >
        <el-option
          v-for="item in nameAndCounts"
          :key="item.name"
          :value="item.name"
        >
          <span style="float: left">{{ item.name }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.count }}</span
          >
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  <el-row :gutter="10" style="margin-top: 15px">
    <!-- <el-col class="left-content" :span="state ? 18 : 24"> -->
    <el-col class="left-content" :span="18">
      <el-table
        :data="activeTableData"
        max-height="500px"
        min-height="500px"
        border
        size="small"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="custom-table"
        show-overflow-tooltip
        :min-width="120"
      >
      <el-table-column width="50" >
        <template #default="scope">
          <div @click="handleDrawerOpen(scope.row,scope.$index)"  class="table-svg-box">
            <!-- <el-button type="primary" @click="handleDrawerOpen(scope.row)">打开抽屉</el-button> -->
            <svg v-if="drawerState[scope.$index] " xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit" role="img" aria-hidden="true"><path d="m1.146 14.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4ZM6.5 8A1.5 1.5 0 0 1 8 9.5v3a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1 0-1h3Zm2-5a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 8 6.5v-3a.5.5 0 0 1 .5-.5Zm1.651 2.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4Z" fill="#1268A7"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit" role="img" aria-hidden="true"><path fill-rule="evenodd" d="m4.354 12.354 8-8a.5.5 0 0 0-.708-.708l-8 8a.5.5 0 0 0 .708.708ZM1 10.5a.5.5 0 1 1 1 0v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 1 13.5v-3Zm14-5a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 1 0-1h3A1.5 1.5 0 0 1 15 2.5v3Z" fill="#1268A7"></path></svg>
          </div>
        </template>
      </el-table-column>

        <el-table-column
          v-for="column in activeColumns"
          :key="column"
          :prop="column"
          :label="column"
          width="120"
        ></el-table-column>
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
    <el-col class="right-content" :span="6">
      <CollectionInfo
        @selectColInfo="handleSelectColInfo"
        @checkedColumnsChange="handleCheckedColumnsChange"
      >
      </CollectionInfo>
    </el-col>
  </el-row>

  <el-drawer
    v-model="drawer"
    direction="rtl"
    title="JSON"
    @close="handleDrawerClose"
  >
  <div class="drawer-content">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="euiIcon css-1sl2y4w-euiIcon-s-inherit" role="img" aria-hidden="true"><path d="M2 2.729V2a1 1 0 0 1 1-1h2v1H3v12h4v1H3a1 1 0 0 1-1-1V2.729zM14 5V2a1 1 0 0 0-1-1h-2v1h2v3h1zm-1 1h2v9H8V6h5V5H8a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v1z" fill="#1268A7"></path><path d="M9 10h5V9H9v1zm0-2h5V7H9v1zm0 4h5v-1H9v1zm0 2h5v-1H9v1zm2-12V1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1h1V1h4v1h1zM5 3h6V2H5v1z" fill="#1268A7"></path></svg>
    <span @click="copyToClipboard" style="margin-left: 5px; cursor: pointer">Copy to clipboard</span>
    <div class="json-content">
    <VueJsonPretty :data="jsonData" showLineNumber></VueJsonPretty>
    </div>
  </div>

  </el-drawer>

  </div>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance, onMounted } from "vue";
import { ElMessage } from "element-plus";
import CollectionInfo from "@/components/dashboard/CollectionInfo.vue";
import { getFeildListAndCount, getDocumentsByFilterColumn ,getCustomers} from "@/axios/api";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

onMounted(async () => {
  let params = {
    size:3,
    filterReq:{
      query:[
        {
        attribute:'clientCode',
        operator:'=',
        value:'S12004'
        }
      ]
    }
  }
  let result = await getCustomers(params);

})

// const state = ref(false);
const infoState = ref(false);
let collectionName = ref("");
let dbName = ref("");
// 选中的列
const activeColumns = ref([]);
const columns = ref([]);

const drawer = ref(false);
const jsonData = ref({});
const drawerState = ref([])

const { proxy } = getCurrentInstance();

const page = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 100,
});

const handleDrawerOpen =(rowData,index)=>{
  drawer.value = true;
  jsonData.value = rowData;
  drawerState.value[index] = !drawerState.value[index];
}


const copyToClipboard =async ()=>{
  try{
    await navigator.clipboard.writeText(JSON.stringify(jsonData.value));
    ElMessage.success("复制成功");
  }catch(err){
    ElMessage.error("复制失败");

  }
  
}

const handleDrawerClose = () => {
  drawerState.value.forEach((item, index) => {
    drawerState.value[index] = false;
  })
}

//选中要筛选的el-select的列
let selectedColumns = [];

watch(activeColumns, (newVal, oldVal) => {
  console.log("activeColumns change",newVal, oldVal);
  console.log("proxy", proxy);
  //    selectedColumns = []
});

// 表格数据
const activeTableData = ref([]);

//点击的input框对应的名字和数量
const nameAndCounts = ref([]);

let selectedColumnName = "";

const handleFocus = async (val) => {
  selectedColumnName = val;
  let params = {
    collectionName: collectionName.value,
    currentField: val,
    fields: activeColumns.value,
    filters: selectedColumns,
  };
  let result = await getFeildListAndCount(params);

  if (result.code !== 200) {
    ElMessage.error(result.msg);
    return;
  }
  nameAndCounts.value = result.data;
};

const handleChange = async (val) => {
  //通过selectedColumns数组，筛选出field为selectedColumnName的对象，如果value没有值，则构建对象，推入selectedColumns数组
  page.currentPage = 1;
  let index = selectedColumns.findIndex(
    (item) => item.field === selectedColumnName
  );
  if (index == -1) {
    selectedColumns.push({ field: selectedColumnName, value: val });
  } else {
    if (!selectedColumns[index].value || selectedColumns[index].value !== val) {
      selectedColumns[index].value = val;
    }
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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
};

const handleSelectColInfo = async (data, val, val2) => {
  page.currentPage = 1;
  collectionName.value = data;
  activeColumns.value = val;
  infoState.value = true;
  selectedColumns = [];

  activeColumns.value.forEach((v) => {
    columns.value[v] = "";
  });

  dbName.value = val2;
  let params = {
    filters: [],
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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
};

const handleCheckedColumnsChange = async (val) => {
  page.currentPage = 1;
  activeColumns.value = val;
  activeColumns.value.forEach((v) => {
    columns.value[v] = "";
  });
  let params = {
    filters: [],
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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
};

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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
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
  activeTableData.value = tableData;
  tableData.forEach((item, index) => {
    drawerState.value[index] = false;
  })
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

.left-content {
  height: 100%;
  min-height:380px;
}

.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.center-content{
  padding: 10px;
}
.search-form{
  width: 100%;
}
.form-item{
  margin: 5px 0;
   display: flex !important;
   
}
.form-label{
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
.form-select{
  flex: 1;
}

.form-select :deep(.el-select__wrapper){
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.custom-table :deep(td) {
  padding: 2px 0;
}

.pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.drawer-content{
  text-align: right;
  color: #1268A7;
  font-size: 14px;
}

.json-content{
  margin-top: 10px;
}

.drawer-content span:hover{
  cursor: pointer;
  text-decoration: underline;
}

.table-svg-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
