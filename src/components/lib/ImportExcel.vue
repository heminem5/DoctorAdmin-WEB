<template>
    <template v-if="type === 'admin'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">用户名</td>
                                                             <td style="background-color: #0FB25F">密码</td>
                                                             <td style="background-color: #0FB25F">姓名</td>
                                                             <td style="background-color: #0FB25F">电话</td>
                            </tr>
            <tr>
                                                                                                              <td>用户名...</td>
                                                                                         <td>密码...</td>
                                                                                         <td>姓名...</td>
                                                                                         <td>电话...</td>
                            </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'doctor'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">用户名</td>
                                                             <td style="background-color: #0FB25F">密码</td>
                                                             <td style="background-color: #0FB25F">姓名</td>
                                                             <td style="background-color: #0FB25F">性别</td>
                                                             <td style="background-color: #0FB25F">电话</td>
                                                             <td style="background-color: #0FB25F">编号</td>
                                                             <td style="background-color: #0FB25F">年龄</td>
                            </tr>
            <tr>
                                                                                                              <td>用户名...</td>
                                                                                         <td>密码...</td>
                                                                                         <td>姓名...</td>
                                                                                         <td>
                                                                    男、                                                                    女                                                            </td>
                                                                                                 <td>电话...</td>
                                                                                         <td>编号...</td>
                                                                                         <td>年龄...</td>
                            </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'patient'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">用户名</td>
                                                             <td style="background-color: #0FB25F">密码</td>
                                                             <td style="background-color: #0FB25F">姓名</td>
                                                             <td style="background-color: #0FB25F">性别</td>
                                                             <td style="background-color: #0FB25F">电话</td>
                                                             <td style="background-color: #0FB25F">身份证</td>
                                                             <td style="background-color: #0FB25F">病情</td>
                            </tr>
            <tr>
                                                                                                              <td>用户名...</td>
                                                                                         <td>密码...</td>
                                                                                         <td>姓名...</td>
                                                                                         <td>
                                                                    男、                                                                    女                                                            </td>
                                                                                                 <td>电话...</td>
                                                                                         <td>身份证...</td>
                                                                                         <td>
                                                                    轻度、                                                                    中度、                                                                    重度抑郁                                                            </td>
                                    </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'doctorAdvice'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">医生</td>
                                                             <td style="background-color: #0FB25F">患者</td>
                                                             <td style="background-color: #0FB25F">建议</td>
                                                             <td style="background-color: #0FB25F">建议详情</td>
                                                             <td style="background-color: #0FB25F">建议时间</td>
                            </tr>
            <tr>
                                                                                                              <td>确保该医生在医生表中存在</td>
                                                                                                 <td>确保该患者在患者表中存在</td>
                                                                                                 <td>建议...</td>
                                                                                         <td>建议详情...</td>
                                                                                         <td>格式例：1999年06月05日 12:15:00</td>
                                    </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'phq'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">测试时间</td>
                                                             <td style="background-color: #0FB25F">测试人</td>
                                                             <td style="background-color: #0FB25F">做事提不起劲没兴趣</td>
                                                             <td style="background-color: #0FB25F">感到心情低落沮丧</td>
                                                             <td style="background-color: #0FB25F">入睡难睡不安稳</td>
                                                             <td style="background-color: #0FB25F">感觉疲倦没活力</td>
                                                             <td style="background-color: #0FB25F">食欲不振或吃太多</td>
                                                             <td style="background-color: #0FB25F">觉得自己很糟</td>
                                                             <td style="background-color: #0FB25F">对事物专注有困难</td>
                                                             <td style="background-color: #0FB25F">动作或说话速度缓</td>
                                                             <td style="background-color: #0FB25F">有死或伤害自己的念头</td>
                                                             <td style="background-color: #0FB25F">总分</td>
                                                             <td style="background-color: #0FB25F">结果</td>
                            </tr>
            <tr>
                                                                                                              <td>格式例：1999年06月05日 12:15:00</td>
                                                                                                 <td>确保该测试人在患者表中存在</td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>
                                                                    0没有、                                                                    1有几天、                                                                    2一半以上时间、                                                                    3几乎每天                                                            </td>
                                                                                                 <td>总分...</td>
                                                                                         <td>结果...</td>
                            </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'madrs'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">测试时间</td>
                                                             <td style="background-color: #0FB25F">测试人</td>
                                                             <td style="background-color: #0FB25F">观察到的抑郁</td>
                                                             <td style="background-color: #0FB25F">抑郁主诉</td>
                                                             <td style="background-color: #0FB25F">内心紧张</td>
                                                             <td style="background-color: #0FB25F">睡眠减少</td>
                                                             <td style="background-color: #0FB25F">食欲减退</td>
                                                             <td style="background-color: #0FB25F">注意集中困难</td>
                                                             <td style="background-color: #0FB25F">懒散</td>
                                                             <td style="background-color: #0FB25F">感受不能</td>
                                                             <td style="background-color: #0FB25F">悲观思想</td>
                                                             <td style="background-color: #0FB25F">自杀观念</td>
                                                             <td style="background-color: #0FB25F">总分</td>
                                                             <td style="background-color: #0FB25F">结果</td>
                            </tr>
            <tr>
                                                                                                              <td>格式例：1999年06月05日 12:15:00</td>
                                                                                                 <td>确保该测试人在患者表中存在</td>
                                                                                                 <td>
                                                                    0无、                                                                    2看起来是悲伤的但能使之高兴一些、                                                                    4突出的悲伤忧郁但其情绪仍可受外界环境影响、                                                                    6整天抑郁极度严重                                                            </td>
                                                                                                 <td>
                                                                    0在日常心境中偶有抑郁、                                                                    2有抑郁或情绪低沉但可使之愉快些、                                                                    4沉湎于抑郁沮丧心境但环境仍可对心境有些影响、                                                                    6持久不断的深度抑郁沮丧                                                            </td>
                                                                                                 <td>
                                                                    0平静偶有瞬间的紧张、                                                                    2偶有紧张不安及难以言明的不舒服感、                                                                    4持久的内心紧张或间歇呈现的恐惧状态要花费相当努力方能克制、                                                                    6持续的恐惧和苦恼极度惊恐                                                            </td>
                                                                                                 <td>
                                                                    0睡眠如常、                                                                    2轻度入睡困难或睡眠较浅或时睡时醒、                                                                    4睡眠减少或睡眠中断2小时以上、                                                                    6每天睡眠总时间不超过2－3小时                                                            </td>
                                                                                                 <td>
                                                                    0食欲正常或增进、                                                                    2轻度食欲减退、                                                                    4没有食欲食而无味、                                                                    6不愿进食需他人帮助。                                                            </td>
                                                                                                 <td>
                                                                    0无、                                                                    2偶有思想集中困难、                                                                    4思想难以集中以致干扰阅读或交谈、                                                                    6完全不能集中思想无法阅读                                                            </td>
                                                                                                 <td>
                                                                    0活动发动并无困难动作不慢、                                                                    2有始动困难、                                                                    4即使简单的日常活动也难以发动需花很大努力、                                                                    6完全呈懒散状态无人帮助什么也干不了                                                            </td>
                                                                                                 <td>
                                                                    0对周围的人和物的兴趣正常、                                                                    2对日常趣事的享受减退、                                                                    4对周围不感兴趣对朋友和熟人缺乏感情、                                                                    6呈情感麻木状态不能体验愤怒、悲痛和愉快对亲友全无感情。                                                            </td>
                                                                                                 <td>
                                                                    0无、                                                                    2时有时无的失败自责和自卑感、                                                                    4持久的自责或肯定的但尚近情理的自罪对前途悲观、                                                                    6自我毁灭、自我悔恨或感罪恶深重的妄想荒谬绝伦、难以动摇的自我谴责                                                            </td>
                                                                                                 <td>
                                                                    0无、                                                                    2对生活厌倦偶有瞬间即逝的自杀念头、                                                                    4感到不如死了的好常有自杀念头认为自杀是一种可能的自我解决的方法但尚无切实的自杀计划、                                                                    6已拟适合时机的自杀计划并积极准备                                                            </td>
                                                                                                 <td>总分...</td>
                                                                                         <td>结果...</td>
                            </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
    <template v-if="type === 'cesd'">
        <p style="color: red">提示：按照以下格式上传,第一行是表头</p>
        <table class="modal-table">
            <tr>
                                                                                  <td style="background-color: #0FB25F">测试时间</td>
                                                             <td style="background-color: #0FB25F">测试人</td>
                                                             <td style="background-color: #0FB25F">因小事而烦恼</td>
                                                             <td style="background-color: #0FB25F">不想吃东西胃口差</td>
                                                             <td style="background-color: #0FB25F">即时有人帮仍苦闷</td>
                                                             <td style="background-color: #0FB25F">觉得不如多数人好</td>
                                                             <td style="background-color: #0FB25F">做事无法集中注意</td>
                                                             <td style="background-color: #0FB25F">感到情绪低落</td>
                                                             <td style="background-color: #0FB25F">做任何事都很费力</td>
                                                             <td style="background-color: #0FB25F">感觉前途没有希望</td>
                                                             <td style="background-color: #0FB25F">我的生活是失败的</td>
                                                             <td style="background-color: #0FB25F">感到害怕</td>
                                                             <td style="background-color: #0FB25F">睡眠不好</td>
                                                             <td style="background-color: #0FB25F">感到不高兴</td>
                                                             <td style="background-color: #0FB25F">比平时说话要少</td>
                                                             <td style="background-color: #0FB25F">感到孤单</td>
                                                             <td style="background-color: #0FB25F">人们对我不太好</td>
                                                             <td style="background-color: #0FB25F">生活没有意思</td>
                                                             <td style="background-color: #0FB25F">我曾哭泣</td>
                                                             <td style="background-color: #0FB25F">我感到忧愁</td>
                                                             <td style="background-color: #0FB25F">感到人们不喜欢我</td>
                                                             <td style="background-color: #0FB25F">无法继续生活</td>
                                                             <td style="background-color: #0FB25F">总分</td>
                                                             <td style="background-color: #0FB25F">结果</td>
                            </tr>
            <tr>
                                                                                                              <td>格式例：1999年06月05日 12:15:00</td>
                                                                                                 <td>确保该测试人在患者表中存在</td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>
                                                                    1小于一天、                                                                    2一至两天、                                                                    3三四天、                                                                    4五至七天                                                            </td>
                                                                                                 <td>总分...</td>
                                                                                         <td>结果...</td>
                            </tr>
            <tr>
                                                                                  <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                                                             <td>...</td>
                            </tr>
        </table>
        <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="#"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :http-request="upload"
        >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                立即导入
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    请按照以上格式上传excel文件
                </div>
            </template>
        </el-upload>
    </template>
</template>

<script setup>
    import {ref, shallowRef} from 'vue'
    import { genFileId } from 'element-plus'
    let callback //上传成功回调函数
    let type = ref('')
    let uploadRef = shallowRef();

    const render = (type_,callback_) => {
        console.log(type_)
        type.value = type_
        callback = callback_
    }

    const submitUpload = async ()=>{
        uploadRef.value.submit()
    }

    //上传
    const upload = async (options) => {
        Msg.loading("上传中...")
        let {success,message} = await Http.upload(options.file, options.data, `/${type.value}/excel`);
        Msg.loading(false);
        if(success){
            Msg.success(message)
            if(callback){ //上传传功回调
                callback()
            }
        }
        else{
            Msg.error(message)
        }

    }

    //溢出则覆盖
    const handleExceed = (files) => {
        uploadRef.value.clearFiles()
        const file = files[0]
        file.uid = genFileId()
        uploadRef.value.handleStart(file)
    }

    defineExpose({render});
</script>

<style scoped>
    .modal-table td{
        border: 1px solid;
        padding: 3px;
    }
</style>
