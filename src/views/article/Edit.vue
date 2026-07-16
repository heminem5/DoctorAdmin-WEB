<template>
  <el-form
    label-position="left"
    label-width="100px"
    ref="formRef"
    :model="form"
    style="max-width: 780px"
    :rules="rules"
  >
    <el-form-item label="标题" prop="title">
      <el-input maxlength="200" v-model="form.title" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择">
        <el-option label="草稿" :value="'0'" />
        <el-option label="未发布" :value="'1'" />
        <el-option label="已发布" :value="'2'" />
      </el-select>
    </el-form-item>
    <el-form-item label="作者">
      <el-input maxlength="100" v-model="form.author" />
    </el-form-item>
    <el-form-item label="摘要">
      <el-input type="textarea" maxlength="500" v-model="form.summary" />
    </el-form-item>
    <el-form-item label="内容" prop="contentMd">
      <v-md-editor v-model="form.contentMd" height="360px" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import VMdEditor from "@kangc/v-md-editor";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import Prism from "prismjs";

VMdEditor.use(githubTheme, { Prism });

const formRef = ref();
const form = ref({});
let callBack;
let currentId;

const rules = reactive({
  title: { required: true, message: "标题必填", trigger: "blur" },
  status: { required: true, message: "状态必选", trigger: "change" },
  contentMd: { required: true, message: "内容必填", trigger: "blur" },
});

const render = (id, loadThisPage) => {
  callBack = loadThisPage;
  currentId = id;
  loadDetail();
};

const loadDetail = async () => {
  Msg.loading("加载中...");
  const { data, message } = await Http.get("/article/detail", {
    id: currentId,
  });
  if (!data) {
    Msg.error(message || "获取详情失败");
  } else {
    form.value = {
      ...data,
      status: data.status === undefined ? "" : String(data.status),
    };
  }
  Msg.loading(false);
};

const submit = async () => {
  await formRef.value.validate(async (isValid, invalidFields) => {
    if (!isValid) {
      Msg.error(Helper.getFirstMessage(invalidFields));
      return;
    }
    const payload = Object.assign({}, form.value, {
      status: String(form.value.status),
    });
    const { success, message } = await Http.post("/article/save", payload);
    if (!success) {
      Msg.error(message);
      return;
    }
    Msg.success(message);
    Dialog.close();
    callBack && callBack();
  });
};

defineExpose({ render, submit });
</script>
