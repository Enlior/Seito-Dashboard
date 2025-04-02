<template>
  <el-dropdown :placement="placement" :popper-class="popperClass" :hide-on-click="hideOnClick" :trigger="trigger" :max-height="maxHeight" teleported>
    <div class="dropdown-icon"><img class="dropdown-icon-img" :src="icon">{{ $t('dashboard.moveColmun') }}</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-checkbox-group @change="changeColumnShow" v-model="checkList">
            <VueDraggable handle=".handle" ref="el" :modelValue="list" @onSort="onUpdate" @update="onUpdate">
              <el-dropdown-item v-for="column in filterColumns"  :key="column" style="display: flex;justify-content: space-between;"> 
                <el-checkbox :label="column?$t('col.'+column):$t(column)" :value="column" />
                <svg class="handle" xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="#1268A7" d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"></path></svg>
              </el-dropdown-item>
            </VueDraggable>
        </el-checkbox-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, defineProps, watch,computed,onMounted } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const props = defineProps({
  placement:{
    type: String,
    default: ''
  },
  popperClass:{
    type: String,
    default: ''
  },
  trigger:{
    type: String,
    default: ''
  },
  hideOnClick:{
    type:Boolean,
    default:false
  },
  icon:{
    type: String,
    default: ''
  },
  list:{
    type:Array,
    default:()=>[]
  },
  maxHeight:{
    type: Number,
    default: 380
  }
});

const onUpdate = (evt) => {
  let oldIndex = evt.oldIndex;
  let newIndex = evt.newIndex;
  [props.list[oldIndex], props.list[newIndex]] = [props.list[newIndex], props.list[oldIndex]]; 
};

const checkList = ref([])
const initCheckList = () => {
  checkList.value = [];
  for(let column of props.list) {
      // if(column.isShow)
      checkList.value.push(column)
  }
};

const changeColumnShow = ()=> {
  console.log("change:"+checkList.value)
  for(let column of props.list) {
    if(checkList.value.indexOf(column)!=-1 ) {
      column.isShow = true;
    } else {
      column.isShow = false;
    }
  }
}

  // All currently selected IDS arrays
const filterColumns = computed(() => {
  return props.list.filter(c=>!c.notColumn)
})

watch(
  () => props.list,
  () => {
    initCheckList();
  }
)

onMounted(()=>{
  initCheckList()
});

</script>

<style scoped>
/* 自定义样式 */
.dropdown-icon{
  display: flex;
  margin-left: 0.5em;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.dropdown-icon-img{
  display: flex;
  width: auto;
  height: 50%;
  object-fit: contain; 
  -o-object-fit: contain;
}
.dropdown {
  display: inline-flex;
  margin-left: 15px;
}
.dropdown-btn{
  display: flex;
  flex-direction: column;
  /*padding: 5px;*/
  gap: 5px;
  width: 150px;
  height: 34px;
  color: #ffffff;
  border: none;
}
.dropdown-btn:hover{
  color: #ffffff;
  border: none;
}
.green-btn{
    background-color: #b8e026;
}
.green-btn:hover{
    background-color: #b8e026;
}
.red-btn{
    background-color: #e91b67;
}
.red-btn:hover{
    background-color: #e91b67;
}
</style>