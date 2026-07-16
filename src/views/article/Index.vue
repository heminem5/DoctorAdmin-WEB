<template>
  <x-main>
    <el-row class="search-row">
      <div class="search-item">
        <span>标题</span>
        <div style="width: 220px">
          <el-input
            clearable
            placeholder="请输入标题"
            v-model="searchForm.title"
          />
        </div>
      </div>
      <div class="search-item">
        <span>状态</span>
        <div style="width: 160px">
          <el-select clearable placeholder="全部" v-model="searchForm.status">
            <el-option label="草稿" :value="'0'" />
            <el-option label="未发布" :value="'1'" />
            <el-option label="已发布" :value="'2'" />
          </el-select>
        </div>
      </div>
      <button class="btn btn-m" type="primary" @click="loadThisPage">
        查询
      </button>
      <button class="btn btn-success btn-m" v-if="isAdmin" @click="onAdd">
        新增
      </button>
    </el-row>

    <el-table :data="pager.records" style="width: 100%">
      <el-table-column label="标题" prop="title" min-width="200" />
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="statusTagType(scope.row.status)">
            {{ statusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author" width="140" />
      <el-table-column label="创建时间" prop="createtime" width="170" />
      <el-table-column label="更新时间" prop="updatetime" width="170" />
      <el-table-column fixed="right" label="操作" width="220">
        <template #default="scope">
          <button class="btn" @click="onDetail(scope.row.id)">查看</button>
          <button
            class="btn btn-warn"
            v-if="isAdmin"
            @click="onEdit(scope.row.id)"
          >
            编辑
          </button>
          <button
            class="btn btn-error"
            v-if="isAdmin"
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

<script setup name="article">
import { onMounted, ref, computed } from "vue";
import DetailPage from "./Detail";
import EditPage from "./Edit";
import AddPage from "./Add";

const user = Cache.getUser();
const isAdmin = computed(
  () => user && user.role && user.role.toLowerCase() === "admin"
);

const searchForm = ref({
  title: "",
  status: "",
});

const pager = ref({ current: 1, size: 10 });

onMounted(() => {
  loadThisPage();
});

const loadThisPage = async () => {
  Msg.loading("加载中...");
  const params = Object.assign(searchForm.value, {
    current: pager.value.current,
    size: pager.value.size,
  });
  const { data, message } = await Http.get("/article/list", params);
  if (data) {
    pager.value = data;
  } else {
    Msg.error(message);
  }
  Msg.loading(false);
};

const statusLabel = (val) => {
  const v = String(val);
  if (v === "0") return "草稿";
  if (v === "1") return "未发布";
  if (v === "2") return "已发布";
  return "-";
};

const statusTagType = (val) => {
  const v = String(val);
  if (v === "0") return "info";
  if (v === "1") return "warning";
  if (v === "2") return "success";
  return "info";
};

const onDetail = (id) => {
  const op = Dialog.open(DetailPage, "文章详情")
    .setCancelText("")
    .setConfirmText("");
  op.mounted((c) => {
    c.render(id);
  });
};

const onEdit = (id) => {
  const op = Dialog.open(EditPage, "编辑文章");
  op.mounted((c) => {
    c.render(id, loadThisPage);
  });
  op.confirm((c) => {
    c.submit();
  });
};

const onAdd = () => {
  const op = Dialog.open(AddPage, "新增文章");
  op.mounted((c) => {
    c.render(loadThisPage);
  });
  op.confirm((c) => {
    c.submit();
  });
};

const onDelete = (id) => {
  const op = Msg.confirm("确定删除本条文章？");
  op.then(async () => {
    const { success, message } = await Http.post(`/article/delete?id=${id}`);
    if (!success) {
      Msg.error(message);
      return;
    }
    Msg.success(message);
    loadThisPage();
  });
};
</script>

<style scoped>
.search-row {
  display: flex;
  margin-bottom: 10px;
}
.search-item {
  display: flex;
  align-items: center;
  margin-right: 12px;
}
.search-item span {
  white-space: nowrap;
  line-height: 32px;
  margin-right: 6px;
}
.el-pagination {
  float: right;
}
</style>
