<template>
  <x-main>
    <div class="workbench">
      <div class="sidebar">
        <div class="panel">
          <div class="panel-header">选择患者</div>
          <div class="panel-body">
            <x-select-table
              v-model="selectedPatientId"
              :header="[{ label: '患者', field: 'name', width: '100%' }]"
              :queryParams="[{ name: 'name', label: '患者' }]"
              api="/patient/list"
              labelField="name"
              valueField="id"
            ></x-select-table>
            <el-button
              class="full-width"
              type="primary"
              :disabled="!selectedPatientId"
              @click="loadPatientContext"
              >加载患者</el-button
            >
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">最近就诊（5）</div>
          <div class="panel-body recent-body">
            <el-empty
              v-if="recentPatients.length === 0"
              description="暂无记录"
            />
            <el-scrollbar v-else class="recent-list">
              <div
                v-for="item in recentPatients"
                :key="item.id"
                class="recent-item"
                @click="selectRecent(item)"
              >
                <div class="recent-line">
                  <span class="recent-name">{{ item.name }}</span>
                  <el-tag size="small">{{ item.gender || "未知" }}</el-tag>
                </div>
                <div class="recent-line meta">
                  <span>{{ item.tele || "未留电话" }}</span>
                  <span>{{ formatRecentTime(item.updatedAt) }}</span>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>

      <div class="content" v-loading="pageLoading">
        <div v-if="!patientInfo.id" class="empty-state">
          <el-empty description="请选择患者" />
        </div>

        <div v-else class="content-body">
          <section class="summary-card">
            <div class="summary-left">
              <div class="summary-name">{{ patientInfo.name }}</div>
              <div class="summary-tags">
                <el-tag size="small" type="info">{{
                  patientInfo.gender || "未知"
                }}</el-tag>
                <el-tag size="small" type="warning" v-if="patientInfo.bingq">{{
                  patientInfo.bingq
                }}</el-tag>
              </div>
              <div class="summary-meta">
                <span>电话：{{ patientInfo.tele || "未填写" }}</span>
                <span>身份证：{{ patientInfo.idnum || "未填写" }}</span>
                <span>病情：{{ patientInfo.bingq || "未填写" }}</span>
              </div>
            </div>
            <div class="summary-right">
              <div class="summary-meta">
                <span>上次就诊：{{ lastVisitText }}</span>
              </div>
              <div class="actions">
                <el-button size="small" @click="refreshCurrent">刷新</el-button>
              </div>
            </div>
          </section>

          <section class="panel-group">
            <div v-for="type in scaleOrder" :key="type" class="panel">
              <div class="panel-header">
                <div>
                  <span class="panel-title">{{ scaleMeta[type].title }}</span>
                  <span class="panel-sub"
                    >共 {{ scaleState[type].list.length }} 条</span
                  >
                </div>
                <div class="panel-actions">
                  <el-button link size="small" @click="fetchScaleList(type)"
                    >刷新</el-button
                  >
                </div>
              </div>
              <el-table
                :data="scaleState[type].list"
                size="small"
                v-loading="scaleState[type].loading"
                :border="false"
                empty-text="暂无记录"
              >
                <el-table-column
                  label="测试时间"
                  prop="createtime"
                  width="170"
                />
                <el-table-column label="总分" prop="score" width="80" />
                <el-table-column label="结果" prop="jieg" min-width="120" />
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      link
                      @click="openScaleDetail(type, scope.row.id)"
                      >查看</el-button
                    >
                    <el-button
                      v-if="canDeleteScale"
                      type="danger"
                      link
                      @click="onDeleteScale(type, scope.row.id)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </section>

          <section class="panel advice-panel">
            <div class="panel-header">
              <div>
                <span class="panel-title">医生建议</span>
                <span class="panel-sub"
                  >共 {{ adviceState.list.length }} 条</span
                >
              </div>
              <div class="panel-actions">
                <el-button
                  type="primary"
                  size="small"
                  :disabled="!patientInfo.id"
                  @click="onAddAdvice"
                  >新增建议</el-button
                >
                <el-button link size="small" @click="loadAdviceList"
                  >刷新</el-button
                >
              </div>
            </div>
            <el-table
              :data="adviceState.list"
              size="small"
              v-loading="adviceState.loading"
              empty-text="暂无建议"
            >
              <el-table-column label="建议时间" prop="createtime" width="170" />
              <el-table-column label="医生" width="140">
                <template #default="scope">
                  <span>{{ scope.row.doidFrn?.name || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="建议"
                prop="jiany"
                min-width="160"
                show-overflow-tooltip
              />
              <el-table-column label="操作" width="240">
                <template #default="scope">
                  <el-button
                    type="primary"
                    link
                    @click="openAdviceDetail(scope.row.id)"
                    >查看</el-button
                  >
                  <el-button
                    type="warning"
                    link
                    @click="onEditAdvice(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    link
                    @click="onDeleteAdvice(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </section>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="activeScale.drawer"
      :title="activeScale.meta?.title || '量表详情'"
      size="40%"
      destroy-on-close
    >
      <div v-if="activeScale.loading" class="drawer-loading">
        <el-skeleton rows="6" animated />
      </div>
      <div v-else-if="activeScale.detail">
        <div class="drawer-meta">
          <div>测试人：{{ activeScale.detail.cesrFrn?.name || "-" }}</div>
          <div>测试时间：{{ activeScale.detail.createtime || "-" }}</div>
          <div>总分：{{ activeScale.detail.score || "-" }}</div>
          <div>结果：{{ activeScale.detail.jieg || "-" }}</div>
        </div>
        <el-descriptions :column="1" border>
          <el-descriptions-item
            v-for="field in activeScale.meta?.fields || []"
            :key="field.key"
            :label="field.label"
          >
            {{ activeScale.detail[field.key] || "-" }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else class="drawer-loading">
        <el-empty description="暂无数据" />
      </div>
    </el-drawer>

    <el-drawer
      v-model="adviceDrawer.visible"
      title="建议详情"
      size="30%"
      destroy-on-close
    >
      <div v-if="adviceDrawer.loading" class="drawer-loading">
        <el-skeleton rows="4" animated />
      </div>
      <div v-else-if="adviceDrawer.detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="医生">{{
            adviceDrawer.detail.doidFrn?.name || "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="患者">{{
            adviceDrawer.detail.huanzFrn?.name || "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="建议时间">{{
            adviceDrawer.detail.createtime || "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="建议">{{
            adviceDrawer.detail.jiany || "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="建议详情">{{
            adviceDrawer.detail.xiangq || "-"
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else class="drawer-loading">
        <el-empty description="暂无数据" />
      </div>
    </el-drawer>
  </x-main>
</template>

<script setup name="doctor-workbench">
import { computed, onMounted, reactive, ref, watch } from "vue";
import AddAdvice from "../doctorAdvice/Add";
import EditAdvice from "../doctorAdvice/Edit";

const user = Cache.getUser();
const RECENT_KEY = "doctor-workbench-recent";

const scaleMeta = {
  phq: {
    title: "PHQ-9",
    listApi: "/phq/list",
    detailApi: "/phq/detail",
    deleteApi: "/phq/delete",
    fields: [
      { key: "s1", label: "做事提不起劲没兴趣" },
      { key: "s2", label: "感到心情低落沮丧" },
      { key: "s3", label: "入睡难睡不安稳" },
      { key: "s4", label: "感觉疲倦没活力" },
      { key: "s5", label: "食欲不振或吃太多" },
      { key: "s6", label: "觉得自己很糟" },
      { key: "s7", label: "对事物专注有困难" },
      { key: "s8", label: "动作或说话速度缓" },
      { key: "s9", label: "有死或伤害自己的念头" },
    ],
  },
  madrs: {
    title: "MADRS",
    listApi: "/madrs/list",
    detailApi: "/madrs/detail",
    deleteApi: "/madrs/delete",
    fields: [
      { key: "s1", label: "观察到的抑郁" },
      { key: "s2", label: "抑郁主诉" },
      { key: "s3", label: "内心紧张" },
      { key: "s4", label: "睡眠减少" },
      { key: "s5", label: "食欲减退" },
      { key: "s6", label: "注意集中困难" },
      { key: "s7", label: "懒散" },
      { key: "s8", label: "感受不能" },
      { key: "s9", label: "悲观思想" },
      { key: "s10", label: "自杀观念" },
    ],
  },
  cesd: {
    title: "CES-D",
    listApi: "/cesd/list",
    detailApi: "/cesd/detail",
    deleteApi: "/cesd/delete",
    fields: [
      { key: "s1", label: "因小事而烦恼" },
      { key: "s2", label: "不想吃东西胃口差" },
      { key: "s3", label: "即时有人帮仍苦闷" },
      { key: "s4", label: "觉得不如多数人好" },
      { key: "s5", label: "做事无法集中注意" },
      { key: "s6", label: "感到情绪低落" },
      { key: "s7", label: "做任何事都很费力" },
      { key: "s8", label: "感觉前途没有希望" },
      { key: "s9", label: "我的生活是失败的" },
      { key: "s10", label: "感到害怕" },
      { key: "s11", label: "睡眠不好" },
      { key: "s12", label: "感到不高兴" },
      { key: "s13", label: "比平时说话要少" },
      { key: "s14", label: "感到孤单" },
      { key: "s15", label: "人们对我不太好" },
      { key: "s16", label: "生活没有意思" },
      { key: "s17", label: "我曾哭泣" },
      { key: "s18", label: "我感到忧愁" },
      { key: "s19", label: "感到人们不喜欢我" },
      { key: "s20", label: "无法继续生活" },
    ],
  },
};

const scaleOrder = ["phq", "madrs", "cesd"];

const selectedPatientId = ref("");
const patientInfo = ref({});
const pageLoading = ref(false);

const scaleState = reactive({
  phq: { list: [], loading: false },
  madrs: { list: [], loading: false },
  cesd: { list: [], loading: false },
});

const activeScale = reactive({
  drawer: false,
  loading: false,
  meta: null,
  detail: null,
});

const adviceState = reactive({
  list: [],
  loading: false,
});

const adviceDrawer = reactive({
  visible: false,
  loading: false,
  detail: null,
});

const recentPatients = ref(loadRecent());

const canDeleteScale = computed(
  () => user && user.role && user.role.toLowerCase() === "doctor"
);

const lastVisitText = computed(() => {
  const times = [];
  scaleOrder.forEach((type) => {
    scaleState[type].list.forEach((item) => {
      if (item.createtime) {
        times.push(item.createtime);
      }
    });
  });
  adviceState.list.forEach((item) => {
    if (item.createtime) {
      times.push(item.createtime);
    }
  });
  if (times.length === 0) return "暂无记录";
  return times.sort().reverse()[0];
});

watch(selectedPatientId, (val) => {
  if (val) {
    loadPatientContext();
  }
});

onMounted(() => {
  if (recentPatients.value.length > 0) {
    selectedPatientId.value = recentPatients.value[0].id;
  }
});

const loadPatientContext = async () => {
  if (!selectedPatientId.value) {
    Msg.error("请先选择患者");
    return;
  }
  pageLoading.value = true;
  try {
    const [detail] = await Promise.all([
      fetchPatientDetail(selectedPatientId.value),
      fetchScaleList("phq"),
      fetchScaleList("madrs"),
      fetchScaleList("cesd"),
      loadAdviceList(),
    ]);
    if (detail) {
      patientInfo.value = detail;
      updateRecent(detail);
    }
  } finally {
    pageLoading.value = false;
  }
};

const fetchPatientDetail = async (id) => {
  const { data, message } = await Http.get("/patient/detail", { id });
  if (!data) {
    Msg.error(message || "获取患者信息失败");
    return null;
  }
  return data;
};

const fetchScaleList = async (type) => {
  if (!selectedPatientId.value) return;
  const meta = scaleMeta[type];
  const state = scaleState[type];
  state.loading = true;
  const { data, message } = await Http.get(meta.listApi, {
    cesr: selectedPatientId.value,
    current: 1,
    size: 500,
  });
  if (!data) {
    Msg.error(message || `${meta.title} 获取失败`);
    state.list = [];
  } else {
    state.list = (data.records || []).sort((a, b) => {
      return new Date(b.createtime || 0) - new Date(a.createtime || 0);
    });
  }
  state.loading = false;
};

const openScaleDetail = async (type, id) => {
  const meta = scaleMeta[type];
  activeScale.drawer = true;
  activeScale.loading = true;
  activeScale.meta = meta;
  activeScale.detail = null;
  const { data, message } = await Http.get(meta.detailApi, { id });
  if (!data) {
    Msg.error(message || "获取详情失败");
    activeScale.loading = false;
    return;
  }
  activeScale.detail = data;
  activeScale.loading = false;
};

const onDeleteScale = async (type, id) => {
  const meta = scaleMeta[type];
  const op = Msg.confirm("确定删除本条记录？");
  op.then(async () => {
    const { success, message } = await Http.post(`${meta.deleteApi}?id=${id}`);
    if (!success) {
      Msg.error(message);
      return;
    }
    Msg.success(message);
    fetchScaleList(type);
  });
};

const loadAdviceList = async () => {
  if (!selectedPatientId.value) return;
  adviceState.loading = true;
  const { data, message } = await Http.get("/doctorAdvice/list", {
    huanz: selectedPatientId.value,
    current: 1,
    size: 500,
  });
  if (!data) {
    Msg.error(message || "获取建议失败");
    adviceState.list = [];
  } else {
    adviceState.list = (data.records || []).sort((a, b) => {
      return new Date(b.createtime || 0) - new Date(a.createtime || 0);
    });
  }
  adviceState.loading = false;
};

const openAdviceDetail = async (id) => {
  adviceDrawer.visible = true;
  adviceDrawer.loading = true;
  adviceDrawer.detail = null;
  const { data, message } = await Http.get("/doctorAdvice/detail", { id });
  if (!data) {
    Msg.error(message || "获取建议详情失败");
    adviceDrawer.loading = false;
    return;
  }
  adviceDrawer.detail = data;
  adviceDrawer.loading = false;
};

const onAddAdvice = () => {
  if (!patientInfo.value.id) {
    Msg.error("请先选择患者");
    return;
  }
  const op = Dialog.open(AddAdvice, "新增建议");
  op.mounted((c) => {
    c.render(loadAdviceList, {
      doctorId: user.id,
      patientId: patientInfo.value.id,
    });
  });
  op.confirm(async (c) => {
    c.submit();
  });
};

const onEditAdvice = (id) => {
  const op = Dialog.open(EditAdvice, "编辑建议");
  op.mounted((c) => {
    c.render(id, loadAdviceList);
  });
  op.confirm(async (c) => {
    c.submit();
  });
};

const onDeleteAdvice = (id) => {
  const op = Msg.confirm("确定删除本条建议？");
  op.then(async () => {
    const { success, message } = await Http.post(
      `/doctorAdvice/delete?id=${id}`
    );
    if (!success) {
      Msg.error(message);
      return;
    }
    Msg.success(message);
    loadAdviceList();
  });
};

const refreshCurrent = () => {
  loadPatientContext();
};

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function updateRecent(detail) {
  const list = loadRecent();
  const next = list.filter((item) => (item.id === detail.id ? false : true));
  next.unshift({
    id: detail.id,
    name: detail.name,
    gender: detail.gender,
    tele: detail.tele,
    updatedAt: new Date().toISOString(),
  });
  if (next.length > 5) {
    next.length = 5;
  }
  recentPatients.value = next;
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

const selectRecent = (item) => {
  selectedPatientId.value = item.id;
  loadPatientContext();
};

const formatRecentTime = (val) => {
  if (!val) return "未知时间";
  try {
    const d = new Date(val);
    return d.toLocaleString();
  } catch (e) {
    return val;
  }
};
</script>

<style scoped>
.workbench {
  display: flex;
  gap: 16px;
  height: 100%;
  min-height: calc(100vh - 120px);
}
.sidebar {
  width: 280px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.content {
  flex: 1;
  min-width: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow: auto;
}
.panel {
  background: #fff;
  border-radius: 8px;
  padding: 12px 12px 4px 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
}
.panel-title {
  margin-right: 8px;
}
.panel-sub {
  color: #909399;
  font-size: 12px;
}
.panel-actions {
  display: flex;
  gap: 8px;
}
.panel-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.recent-body {
  padding-top: 4px;
}
.recent-list {
  max-height: 340px;
}
.recent-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.recent-item:hover {
  border-color: #409eff;
}
.recent-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.recent-name {
  font-weight: 600;
}
.recent-line.meta {
  color: #909399;
  font-size: 12px;
  margin-top: 4px;
}
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.summary-card {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(90deg, #f7faff, #f2f6ff);
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid #e5e9f2;
}
.summary-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.summary-right {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  justify-content: space-between;
}
.summary-name {
  font-size: 20px;
  font-weight: 700;
}
.summary-tags {
  display: flex;
  gap: 6px;
}
.summary-meta {
  display: flex;
  gap: 12px;
  color: #606266;
  font-size: 12px;
}
.panel-group .panel {
  margin-bottom: 12px;
}
.advice-panel {
  margin-bottom: 12px;
}
.drawer-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.drawer-loading {
  padding: 12px 4px;
}
.full-width {
  width: 100%;
}

@media (max-width: 1100px) {
  .workbench {
    flex-direction: column;
    min-height: auto;
  }
  .sidebar {
    width: 100%;
    min-width: 100%;
  }
  .content {
    width: 100%;
  }
}
</style>
