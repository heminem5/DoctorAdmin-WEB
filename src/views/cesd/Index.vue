<template>
  <x-main>
    <!--搜索查询表单-->
    <el-row class="search-row">
      <div v-if="user.role !== 'patient'" class="search-item">
        <span>测试人</span>
        <div style="width: 150px">
          <x-select-table
            :header="[{ label: '患者', field: 'name', width: '100%' }]"
            v-model="searchForm.cesr"
            :queryParams="[{ name: 'name', label: '患者' }]"
            api="/patient/list"
            labelField="name"
            valueField="id"
          ></x-select-table>
        </div>
      </div>
      <div class="search-item">
        <span>总分</span>
        <div style="width: 150px">
          <el-input
            clearable
            placeholder="总分起始值"
            v-model.number="searchForm.scoreL"
            type="number"
          />
        </div>
        <span>至</span>
        <div style="width: 150px">
          <el-input
            clearable
            placeholder="总分结束值"
            v-model.number="searchForm.scoreR"
            type="number"
          />
        </div>
      </div>
      <div class="search-item">
        <span>结果</span>
        <div style="width: 150px">
          <el-input
            clearable
            placeholder="请输入结果"
            v-model="searchForm.jieg"
            maxlength="255"
          />
        </div>
      </div>

      <button class="btn btn-m" type="primary" @click="loadThisPage">
        查询
      </button>
      <button
        class="btn btn-success btn-m"
        v-if="user && user.role.toLowerCase() == 'patient'"
        @click="onAdd"
      >
        新增
      </button>
      <button class="btn btn-m" v-if="conf.EnableExcel" @click="onExcel">
        导出excel
      </button>
      <button
        class="btn btn-m"
        v-if="user && user.role.toLowerCase() == ''"
        @click="importExcel"
      >
        导入excel
      </button>
    </el-row>
    <!--搜索查询表单 end-->

    <div class="statistic-info" v-if="pager.statisticInfo">
      {{ pager.statisticInfo }}
    </div>

    <!--数据表-->
    <el-table :data="pager.records" style="width: 100%">
      <el-table-column sortable label="测试时间">
        <template #default="scope">
          <el-icon><timer /></el-icon><span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试人">
        <template #default="scope">
          <el-button
            v-if="scope.row.cesrFrn"
            type="primary"
            text
            bg
            @click="cesrDetail(scope.row.cesr)"
            >{{ scope.row.cesrFrn.name }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="因小事而烦恼">
        <template #default="scope">
          <span>{{ scope.row.s1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="不想吃东西胃口差">
        <template #default="scope">
          <span>{{ scope.row.s2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="即时有人帮仍苦闷">
        <template #default="scope">
          <span>{{ scope.row.s3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="觉得不如多数人好">
        <template #default="scope">
          <span>{{ scope.row.s4 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="做事无法集中注意">
        <template #default="scope">
          <span>{{ scope.row.s5 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感到情绪低落">
        <template #default="scope">
          <span>{{ scope.row.s6 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="做任何事都很费力">
        <template #default="scope">
          <span>{{ scope.row.s7 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感觉前途没有希望">
        <template #default="scope">
          <span>{{ scope.row.s8 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="我的生活是失败的">
        <template #default="scope">
          <span>{{ scope.row.s9 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感到害怕">
        <template #default="scope">
          <span>{{ scope.row.s10 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="睡眠不好">
        <template #default="scope">
          <span>{{ scope.row.s11 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感到不高兴">
        <template #default="scope">
          <span>{{ scope.row.s12 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="比平时说话要少">
        <template #default="scope">
          <span>{{ scope.row.s13 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感到孤单">
        <template #default="scope">
          <span>{{ scope.row.s14 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人们对我不太好">
        <template #default="scope">
          <span>{{ scope.row.s15 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生活没有意思">
        <template #default="scope">
          <span>{{ scope.row.s16 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="我曾哭泣">
        <template #default="scope">
          <span>{{ scope.row.s17 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="我感到忧愁">
        <template #default="scope">
          <span>{{ scope.row.s18 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="感到人们不喜欢我">
        <template #default="scope">
          <span>{{ scope.row.s19 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="无法继续生活">
        <template #default="scope">
          <span>{{ scope.row.s20 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总分">
        <template #default="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果">
        <template #default="scope">
          <span>{{ scope.row.jieg }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <button class="btn" @click="onDetail(scope.row.id)">详情</button>
          <button
            class="btn btn-warn"
            v-if="user.role.toLowerCase() == ''"
            @click="onEdit(scope.row.id)"
          >
            编辑
          </button>
          <button
            class="btn btn-error"
            v-if="
              user.role.toLowerCase() == 'doctor' ||
              user.role.toLowerCase() == 'patient'
            "
            @click="onDelete(scope.row.id)"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pager.current"
      v-model:page-size="pager.size"
      background
      :page-sizes="[5, 10, 15, 20, 50]"
      layout="total,sizes, prev, pager, next, jumper"
      :total="pager.total"
      @size-change="loadThisPage"
      @current-change="loadThisPage"
    />
  </x-main>
</template>

<script setup name="cesd">
let conf = codeying;
import { Helper } from "core";
let user = Cache.getUser(); //当前登录用户
import {
  Timer,
  ChatDotSquare,
  Delete,
  Edit,
  InfoFilled,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import DetailPage from "./Detail";
import EditPage from "./Edit";
import AddPage from "./Add";

//搜索条件表单
let searchForm = ref({
  cesr: "",
  scoreL: "",
  scoreR: "",
  jieg: "",
});
//分页信息 默认查询第一页，20条数据
let pager = ref({ current: 1, size: 20 });

//钩子函数，挂载
onMounted(() => {
  loadThisPage();
});

//加载本页数据
const loadThisPage = async () => {
  Msg.loading("加载中...");
  //表单查询参数和分页参数
  let params = Object.assign(searchForm.value, {
    current: pager.value.current,
    size: pager.value.size,
  });
  let { data, message } = await Http.get(`/cesd/list`, params);

  if (data) {
    pager.value = data;
  } else {
    Msg.error(message);
  }
  Msg.loading(false);
};

//详情页
const onDetail = async (id) => {
  const op = Dialog.open(DetailPage, "详情")
    .setCancelText("")
    .setConfirmText("");
  op.mounted((c) => {
    c.render(id);
  });
};
//编辑页
const onEdit = async (id) => {
  const op = Dialog.open(EditPage, `编辑`);
  op.mounted((c) => {
    c.render(id, loadThisPage);
  });
  op.confirm(async (c) => {
    c.submit();
  });
};
//新增页
const onAdd = async () => {
  const op = Dialog.open(AddPage, `新增`);
  op.mounted((c) => {
    c.render(loadThisPage);
  });
  op.confirm(async (c) => {
    c.submit();
  });
};
//onExcel
const onExcel = async () => {
  Http.download({}, false, "/cesd/excel");
};
//删除
const onDelete = async (id) => {
  const op = Msg.confirm("确定删除本条数据？");
  op.then(async () => {
    let { success, message } = await Http.post(`/cesd/delete?id=` + id);
    if (!success) {
      Msg.error(message);
    } else {
      Msg.success(message);
      await loadThisPage();
    }
  });
};

//测试人详情页
import cesrDetailPage from "../patient/Detail";
const cesrDetail = async (id) => {
  const op = Dialog.open(cesrDetailPage, "详情")
    .setCancelText("")
    .setConfirmText("");
  op.mounted((c) => {
    c.render(id);
  });
};

import ImportExcel from "../../components/lib/ImportExcel";
const importExcel = () => {
  const op = Dialog.open(ImportExcel, `导入CES-D量表数据`)
    .setCancelText("")
    .setConfirmText("");
  op.mounted((c) => {
    c.render("cesd", loadThisPage);
  });
};
</script>

<style>
/*分页右对齐*/
.el-pagination {
  float: right;
}
.el-form--inline .el-form-item {
  margin-right: 0 !important;
}
.search-row {
  display: flex;
  margin-bottom: 10px;
}
.search-item {
  display: flex;
}
.search-item span {
  white-space: nowrap;
  line-height: 32px;
  margin: 0 5px;
}
</style>
