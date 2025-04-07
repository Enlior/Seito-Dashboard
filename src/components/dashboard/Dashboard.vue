<template>
  <div class="main-content no-selected">
    <div ref="searchHeader" class="top-content">
      <el-row class="search-form" :gutter="10">
        <el-col
          class="form-item"
          :span="columnWidth"
          v-for="column in searchFormData"
          :key="column"
        >
          <span class="form-label">{{ t(column.label) }}</span>
          <el-select
            class="form-select"
            v-model="column.value"
            value-key="value"
            multiple
            clearable
            size="large"
            :offset="0"
            :show-arrow="false"
            :placeholder="column.filterType"
            :fit-input-width="true"
            @change="handleChange(column)"
            @visible-change="handleSelectToggle(column, $event)"
          >
            <template #empty>
              <div>{{ $t("noSelect") }}</div>
            </template>
            <!-- :multiple-limit="1" -->
            <!-- @focus="handleFocus(columns[index])" -->
            <!-- @clear="handleClear(index)" -->
            <template #header>
              <el-input
                v-model="column.searchInput"
                size="default"
                placeholder="Starts with..."
                :prefix-icon="Search"
                clearable
                @input="handleSearch(column.searchInput)"
              />
              <div class="select-header-options">
                <span class="option-count">{{filteredOptions.length}} {{t('option')}}</span>
                <span class="option-btn">
                  <Buttons :buttons="buttons"></Buttons>
                </span>
              </div>
            </template>
            <el-option
              v-for="item in filteredOptions"
              :key="item.value"
              :value="item.value"
            >
              <span class="option-text">{{ item.value }}</span>
            </el-option>
            <template #tag>
              <div class="select-tag">
              <span v-if="column.value.length" class="tag-status">{{column.isInclude?'':'NOT'}}</span>
              <span class="tag-label" :title="column.value.join(',')">{{column.value.join(',')}}</span>
              <span v-if="column.value.length" class="tag-count">{{column.value.length}}</span>
              </div>
            </template>
            <template #footer>
              <el-radio-group v-model="column.isInclude" @change="handleChange(column)" size="default" class="radio-group" border-color="none" text-color="#ffffff" fill="#69707d">
                <el-radio-button :label="t('Include')" :value="true" />
                <el-radio-button :label="t('Exclude')" :value="false" />
              </el-radio-group>
            </template>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="center-content">
      <el-row class="table-content" :gutter="10">
        <el-col :span="24">
          <div style="text-align: right">
            <DropdownMenuList
              placement="bottom"
              popper-class="header-btn-dropdown"
              trigger="click"
              :list="columns"
              :icon="dropdownIcon"
              :maxHeight="380"
              @handleChangeColumns="handleChangeColumns"
            />
          </div>
          <el-table
            ref="mainTable"
            v-loading="loading"
            :data="tableData"
            :height="tableHeight"
            stripe
            :sort-by="sortBy"
            :sort-orders="sortOrders"
            size="small"
            :header-cell-style="{ 'text-align': 'left', color: '#1a1c21' }"
            cell-class-name="table-cell"
            class="custom-table"
            show-overflow-tooltip
            v-el-table-infinite-scroll="loadMore"
            :infinite-scroll-immediate="false"
            :infinite-scroll-distance="50"
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
              v-for="(column,index) in columns"
              :key="`col-${column}-${index}`"
              :prop="column"
              :label="column"
              width="120"
            >
            <template #header>
              <div class="header-container" >
                  <span class="column-text"> {{ t("col." + column) }} </span>

                  <el-popover
                    :ref="`col-${column}-${index}`"
                    :visible="activePopover === column"
                    trigger="click"
                    :width="150"
                    @hide="handlePopoverHide"
                    placement="bottom-start"
                    :teleported="true"
                    :hide-after="500"
                    v-if="dialogVisible"
                    @before-leave="handlePopoverBeforeLeave"
                  >
                    <template #reference>
                      <div class="more-btn" @click="handlePopoverShow(column)" :data-popover-anchor="column">
                        <el-icon>
                          <More />
                        </el-icon>
                      </div>
                    </template>
                    <div  @mouseleave="handlePopoverHide">
                      <OperationDetail
                        :column="column"
                        @handleOperation="handleOperation"
                      ></OperationDetail>
                    </div>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-block">
            <!-- <el-pagination
              v-model:current-page="page.currentPage"
              v-model:page-size="page.pageSize"
              :page-sizes="[10, 25, 50,100]"
              layout="total, sizes, prev, pager"
              @current-change="handleCurrentPageChange"
              @size-change="handlePagesizeChange"
              v-model:total="page.total"
            />
            <el-icon  @click="handleNextPage"  class="next-page-icon"><ArrowRightBold /></el-icon> -->
            <span>{{t("dashboard.total")}}</span><span class="total-count">{{page.total}} </span><span>{{t("dashboard.records")}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <DocumentDrawer
      direction="rtl"
      title="JSON"
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
  onMounted,
  computed,
  onBeforeUnmount,
} from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { getCustomers } from "@/axios/api";
import { Search } from "@element-plus/icons-vue";
import DocumentDrawer from "@/components/dashboard/DocumentDrawer.vue";
import { defaultSearchColumns } from "@/utils/fields"
import { ElMessage } from "element-plus";
import DropdownMenuList from "./DropdownMenuList.vue";
import OperationDetail from "./OperationDetail.vue";
import Buttons from "@/components/button/Buttons.vue";
import { ShowIcon,HideIcon,AscSortIcon, DescSortIcon} from "../../utils/icons";
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { debounce } from "@/utils/utils";


const dropdownIcon = ref(require("@/assets/add-remove-columns.png"));
const sortBy = ref(null);
const sortOrders = ref(null);

const activePopover = ref('')

const dialogVisible=ref(true)


//列信息
const columns = ref([]);
const searchInput = ref(""); //当前搜索下拉框数据条件
const searchFormData = ref([]); //搜索框表单数据
const selectOptions = ref([]); //下拉框数据
const currentSelect = ref({}); //当前筛选字段
const showSelcetOptions = ref(true); //选定选中选项
const colOptions = ref([]); //当前下拉框的数据
// 表格数据
const loading = ref(false);
const tableData = ref([]);
const pageTableData = ref([]);
const tableHeight = ref(300);
const searchHeader = ref(null);
const mainTable = ref(null);

const drawerVisible = ref(false);
const jsonData = ref({});
const drawerState = ref([]);
const showColumnIcon = ref([]);
let lastEvaluatedkey = {};

const showIconInfo = ref(true);

const page = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 0,
});

const buttons = reactive([
  {
    type: "",
    btnText: "",
    icon: true,
    get svg(){
      return showSelcetOptions.value ? ShowIcon:HideIcon
    },
    link:true,
    className: "btn-icon",
    get iconClass(){
      return showSelcetOptions.value ? 'btn-show':'btn-hide'
    },
    tooltipsPlacement:'top',
    get tooltipsText() {
      return showSelcetOptions.value ? 'btn.showTips':'btn.hideTips'
    },
    eventFn: function () {
      console.log("show",currentSelect.value);
      const allOptions = selectOptions.value[currentSelect.value.prop];
      const selectOption = currentSelect.value.value;
      if(showSelcetOptions.value){
        const arr = allOptions.filter((v)=>selectOption.includes(v.value));
        colOptions.value = arr;
        showSelcetOptions.value = false;
      }else{
        showSelcetOptions.value = true;
        colOptions.value = allOptions;
      }
    },
  },
  {
    type: "",
    btnText: "",
    icon: true,
    get svg(){
      return currentSelect.value.sortType === 'asc' ? AscSortIcon:DescSortIcon
    },
    link:true,
    className: "btn-icon",
    get iconClass(){
      return showSelcetOptions.value ? 'btn-sort':'btn-sort disable'
    },
    tooltipsPlacement:'top',
    get tooltipsText() {
      return (showSelcetOptions.value && colOptions.value.length > 0) ?(currentSelect.value.sortType === 'asc' ?'btn.sortAsc':'btn.sortDesc'):'btn.noDataSort'
    },
    get disabled(){
      return showSelcetOptions.value ? false : true
    },
    eventFn: function () {
      console.log("sort",currentSelect.value.sortType);
      const sort = currentSelect.value.sortType === 'asc' ? 'desc':'asc';
      currentSelect.value.sortType = sort;
    },
  },
]);

const handleChangeColumns = (cols)=>{
  columns.value = cols;
}



onMounted(async () => {
  loadData();

  // 首次计算
  handleResize();
  
  
  // 窗口变化监听
  window.addEventListener('resize', handleResize);
  
  // 监听搜索栏高度变化
  const resizeObserver = new ResizeObserver(handleResize);
  if (searchHeader.value) {
    resizeObserver.observe(searchHeader.value);
  }
  
  // 组件卸载时清理
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    resizeObserver.disconnect()
  })
  
});

const columnWidth = ref(6);
const handleResize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 840) {
    columnWidth.value = 24; // 小屏幕时占满整行
  } else if (screenWidth >= 840 && screenWidth < 1245) {
    columnWidth.value = 12; // 中等屏幕时占一半
  } else if (screenWidth >= 992 && screenWidth < 1655) {
    columnWidth.value = 8; // 中等屏幕时占一半
  } else {
    columnWidth.value = 6; // 大屏幕时占三分之一
  }
  calculateTableHeight();
}


const loadMore =  debounce( ()=>{
  let params = {
      size: 100,
      filterReq: {
        query: searchInput.value || [],
      },
      lastEvaluatedKey: lastEvaluatedkey,
    };
    loading.value = true;
    getCustomers(params)
      .then((result) => {
        loading.value = false;
        const items = result.data.items;
        lastEvaluatedkey = result.data.lastEvaluatedKey;
        tableData.value = [...tableData.value,...items];
        page.total = tableData.value.length;
        items.map((v) => {
          const keys = Object.keys(v);
          columns.value = [...new Set([...columns.value, ...keys])];
        });
        tableData.value.map((v) => {
          const keys = Object.keys(v);
          let colArr = [...new Set([...columns.value, ...keys])];
          colArr.map((col)=>{
            let colObj = {name:col,isShow:true}
          })
          columns.value = colArr;
          console.log('##$$$',columns.value)
        });
        updateSearchFormData();
      })
      .catch((err) => {
        loading.value = false;
        console.error(err?.msg);
      });
},500)

const handlePopoverBeforeLeave=()=>{
  dialogVisible.value = false
  setTimeout(() => {
    dialogVisible.value = true
  }, 100)
}

// 计算可用高度
const calculateTableHeight = () => {
  const windowHeight = window.innerHeight;
  const topHeight = searchHeader.value?.offsetHeight || 0;
  const padding = 110; // 上下边距总和
  tableHeight.value = windowHeight - topHeight - padding;
}

// const handleNextPage = async () => {
//   page.currentPage = page.currentPage + 1;
//   if (Math.floor(tableData.value.length / page.pageSize) < page.currentPage) {
//     let params = {
//       size: page.pageSize*4,
//       filterReq: {
//         query: searchInput.value || [],
//       },
//       lastEvaluatedKey: lastEvaluatedkey,
//     };
//     loading.value = true;
//     await getCustomers(params)
//       .then((result) => {
//         loading.value = false;
//         const items = result.data.items;
//         lastEvaluatedkey = result.data.lastEvaluatedKey;
//         tableData.value = [...tableData.value,...items];
//         page.total = tableData.value.length;
//         updatePageData()
//         items.map((v) => {
//           const keys = Object.keys(v);
//           columns.value = [...new Set([...columns.value, ...keys])];
//         });
//         if(searchFormData.value.length === 0){
//           const optionArr = getSelectOptions();
//           selectOptions.value = optionArr;
//           defaultSearchColumns.map((v)=>{
//             searchFormData.value.push({
//               label:v,
//               prop:v,
//               isInclude:true,
//               value:[],
//               searchInput:"",
//               sortType:'asc',
//               filterType:'Any'
//             })
//           });
//         }
//       })
//       .catch((err) => {
//         loading.value = false;
//         console.error(err?.msg);
//       });
//   } else {
//   updatePageData()
//   }
// };

const handlePopoverHide = () => {
        activePopover.value = '';
};

const handlePopoverShow = (column) => {
 activePopover.value =  activePopover.value === column ? '':  column;
}


const loadData = async (searchParam) => {
  let params = {
    size: page.pageSize*4,
    filterReq: {
      query: searchParam || [],
    },
  };
  loading.value = true;
  await getCustomers(params)
    .then((result) => {
      loading.value = false;
      const items = result.data.items;
      lastEvaluatedkey = result.data.lastEvaluatedKey;
      tableData.value = [...tableData.value,...items];
      page.total = tableData.value.length;
      updatePageData()
      items.map((v) => {
        const keys = Object.keys(v);
        columns.value = [...new Set([...columns.value, ...keys])];
      });
      tableData.value.map((v) => {
          const keys = Object.keys(v);
          let colArr = [...new Set([...columns.value, ...keys])];
          colArr.map((col)=>{
          return  {name:col,isShow:true}
          })
          columns.value = colArr;
          console.log('##$$$',columns.value)
        });
      updateSearchFormData();
    })
    .catch((err) => {
      loading.value = false;
      console.error(err?.msg);
    });
};

const updateSearchFormData = () =>{
  const optionArr = getSelectOptions();
  selectOptions.value = optionArr;
  if(searchFormData.value.length === 0){
        defaultSearchColumns.map((v)=>{
          searchFormData.value.push({
            label:v,
            prop:v,
            isInclude:true,
            value:[],
            searchInput:"",
            sortType:'asc',
            filterType:'Any'
            // options:optionArr[v],
          })
       });
  }  
}

const handleOperation = async ({ column, operation }) => {
  switch (operation) {
    case "moveLeft":
      if (column === columns.value[0]) {
        return;
      }
      let leftIndex = columns.value.findIndex((item) => item === column);
      columns.value = swapElements(columns.value, leftIndex);
      handlePopoverHide()
      break;
    case "moveRight":
      if (column === columns.value[columns.value.length - 1]) {
        return;
      }
      let rightIndex = columns.value.findIndex((item) => item === column);
      [columns.value[rightIndex], columns.value[rightIndex + 1]] = [
        columns.value[rightIndex + 1],
        columns.value[rightIndex],
      ];
      handlePopoverHide()
      break;
    case "copyName":
      try {
        await navigator.clipboard.writeText(column);
        ElMessage.success(t("dashboard.copySuccess"));
      } catch (err) {
        ElMessage.error(t("dashboard.copyFailed"));
      }
  
      break;
    case "copyColumn":
      let copArr = [];
      selectOptions.value[column].forEach((item) => {
        copArr.push(item.value);
      });
      try {
        await navigator.clipboard.writeText(JSON.stringify(copArr));
        ElMessage.success(t("dashboard.copySuccess"));
      } catch (err) {
        ElMessage.error(t("dashboard.copyFailed"));
      }
     
      break;
    case "sortAsc":
      sortBy.value = column;
      sortOrders.value = "ascending";
      // pageTableData.value.sort((a, b) => {
        tableData.value.sort((a, b) => {
        return a[column] > b[column] ? 1 : -1;
      });
   
      break;
    case "sortDesc":
      sortBy.value = column;
      sortOrders.value = "descending";
      // pageTableData.value.sort((a, b) => {
        tableData.value.sort((a, b) => {
        return a[column] < b[column] ? 1 : -1;
      });
      
      break;
    default:
      break;
  }
};

const swapElements = (arr, index) => {
  if (index <= 0 || index >= arr.length - 1) {
    return arr;
  }
  [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
  return arr;
};

const showOptinalMessage = () => {
  showIconInfo.value = true;
};

//获取下拉框数据
const getSelectOptions = () => {
  const options = {};
  columns.value.forEach((column) => {
    const uniqueValues = [
      ...new Set(tableData.value.map((item) => item[column])),
    ];
    options[column] = uniqueValues.map((value) => ({
      label: column,
      value: value,
    }));
  });
  return options;
};

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

watch(columns, (newVal, oldVal) => {
  newVal.forEach((item, index) => {
    showColumnIcon.value.push(false);
  });
});


const handleSearch = (val) => {
  searchInput.value = val || '';
  console.log(searchInput.value,colOptions.value);

};

// 过滤后的选项（计算属性）
const filteredOptions = computed(() => {
  const keyword = searchInput.value.toLowerCase();
  const data = colOptions.value.filter(item =>
    item.value?.toLowerCase().includes(keyword)
  );
  // sort value
  return sortArray(data, 'value', currentSelect.value.sortType);
});


const sortArray = (data, field, order = 'asc') => {
  return data.sort((a, b) => {
    if (a[field] < b[field]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// 监听下拉框状态
const handleSelectToggle = (column,visible) => {
  if (visible) {
    searchInput.value = column.searchInput || '';
    currentSelect.value = column;
    colOptions.value = selectOptions.value[column.prop];
    showSelcetOptions.value = true;
  }
}

//下拉数据选中
const handleChange = async (column) => {
  console.log('selectVal',column);
  const searchParam = [];
  searchFormData.value.map((columns)=>{
    let item = columns.value;
    if(!columns.isInclude){
      const columnOptions = selectOptions.value[columns.prop].map(v=>{
        return v.value
      });
      item = columnOptions.filter(v => !item.includes(v));
    }
    item.map((v)=>{
      const params = {
        attribute:columns.prop,
        operator:'=',
        value:v
      }
      searchParam.push(params);
    })
  })
  //搜索
  loadData(searchParam);
};

const updatePageData=()=>{
  //  pageTableData.value = tableData.value.slice((page.currentPage - 1)*page.pageSize, page.pageSize*page.currentPage)
  // drawerState.value = new Array(pageTableData.value.length).fill(false)
  drawerState.value = new Array(tableData.value.length).fill(false)
}


const handlePagesizeChange = async () => {
  page.currentPage = 1;
  updatePageData()
};

const handleCurrentPageChange = async () => {
  updatePageData()
};

</script>

<style scoped>
.total-count{
  margin:0 10px
}
.main-content {
  background-color: #f7f8fc;
  color: rgb(52, 55, 65);
}

.header-icon {
  margin-left: 10px;
  cursor: pointer;
}

.header-icon:hover {
  cursor: pointer;
}

.header-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.more-btn {
  position: absolute;
  right: 0;
  display: none;
  cursor: pointer;
  margin-left: 10px;
  flex: 1;
}

.header-container:hover .more-btn {
  display: block;
}
.optional-row-message {
  display: flex;
  margin: 3px 0;
}

.icon-box {
  margin-right: 5px;
}

.top-content {
  margin: 0 8px;
  padding-bottom: 4px;
  padding-top: 8px;
}
.center-content {
  padding: 5px 8px;
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

:deep(.table-content .el-table tr) {
  height: 32px;
}

:deep(.table-content .el-table tr.el-table__row--striped td.el-table__cell) {
  background-color: #f5f7fa;
}

.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.next-page-icon{
  cursor: pointer;
  margin-left: 5px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.message-text:hover {
  cursor: pointer;
  text-decoration: underline;
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
  border: 1px solid #d3dae6e6;
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

.form-select :deep(.el-select__wrapper),.form-select:hover :deep(.el-select__wrapper)  {
  height: 38px;
  line-height: 38px;
  border: 1px solid #d3dae6e6;
  border-left: 0;
  box-shadow: none;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.form-select :deep(.el-select__selected-item.el-tooltip__trigger){
    position: absolute;
    right: 0;
}

.form-select :deep(.el-tag){
  background-color: transparent;
  padding: 0;
  color: #000;
}
.form-select .select-tag{
  display: inline-flex;
}
.form-select .tag-status{
  color: #bd271e;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
}
.form-select .tag-label{
  max-width: 290px;
  color: rgb(52, 55, 65);
  font-size: 1rem;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.form-select .tag-count{
  position: absolute;
  right: 0;
  top: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  background-color: rgb(77, 210, 202);
  cursor: inherit;
}

.select-header-options{
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 5px;
}
.select-header-options .option-count{
  
}
.select-header-options .option-btn{
  flex: 1;
  text-align: right;
}

:deep(.el-select-dropdown__footer){
  background-color: rgb(247, 248, 252);
}
.radio-group{
    /* padding: 2px; */
    background-color: rgb(249, 251, 253);
    /* border: 1px solid rgba(211, 218, 230, 0.9); */
    border-radius: 4px;
}

.custom-table {
  border-radius: 6px;
  min-width: 120px;
  min-height: 300px;
}

.table-cell {
  text-align: "center";
  color: "#343741";
}

.pagination-block {
  display: flex;
  justify-content: left;
  align-items: center;
  padding:5px 10px;
  font-size: 12px;
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
  cursor: pointer;
}
</style>
<style>
.el-select-dropdown__header{
  padding: 10px 10px 5px 10px !important;
}

.option-btn .btn-icon{
  width: 20px;
  height: 20px;
}

.btn-show{
 padding: 3px;
}

.btn-hide{
  padding: 3px;
  border-radius: 4px;
  color: rgb(0, 97, 166);
  background-color: rgb(204, 228, 245);
}

.btn-sort{
  cursor: pointer;
}

.btn-sort.disable{
  cursor: no-drop;
  opacity: 0.3;
}
</style>