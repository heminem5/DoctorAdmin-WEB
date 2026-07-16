<template>
  <div class="article-detail">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="标题">{{ form.title }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="statusTagType(form.status)">
          {{ statusLabel(form.status) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="作者">{{
        form.author || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{
        form.createtime || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{
        form.updatetime || "-"
      }}</el-descriptions-item>
      <el-descriptions-item label="摘要">{{
        form.summary || "-"
      }}</el-descriptions-item>
    </el-descriptions>
    <div class="content-title">正文</div>
    <v-md-preview :text="form.contentMd || ''" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/style/preview.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import Prism from "prismjs";

VMdPreview.use(githubTheme, { Prism });

const form = ref({});

const render = async (id) => {
  Msg.loading("loading...");
  const { data, message } = await Http.get("/article/detail", { id });
  if (data) {
    form.value = data;
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

defineExpose({ render });
</script>

<style scoped>
.article-detail {
  padding: 8px 0;
}
.content-title {
  margin: 12px 0 8px;
  font-weight: 600;
}
</style>
