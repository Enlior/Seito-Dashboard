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
  <el-row :gutter="5">
    <el-col
      :span="5"
      v-for="(column, index) in activeColumns"
      :key="index"
      style="margin: 2px; display: flex; align-items: center"
    >
      <el-select
        v-model="columns[column]"
        filterable
        clearable
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
  </div>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance, onMounted } from "vue";
import { ElButton, ElMessage } from "element-plus";
import CollectionInfo from "@/components/dashboard/CollectionInfo.vue";
import { getFeildListAndCount, getDocumentsByFilterColumn ,getCustomers} from "@/axios/api";

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
  console.log('data',result.data)
})

// const state = ref(false);
const infoState = ref(false);
let collectionName = ref("");
let dbName = ref("");
// 选中的列
const activeColumns = ref([]);
const columns = ref([]);

const { proxy } = getCurrentInstance();

const page = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 100,
});

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
}

.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.center-content{
  padding: 10px;
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
</style>
