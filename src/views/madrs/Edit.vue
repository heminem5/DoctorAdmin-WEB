<template>
    <el-form label-position="left" label-width="100px" ref="formRef" :model="form" style="max-width: 600px" :rules="rules">
                                                                            <el-form-item label="测试时间" prop="createtime">
                        <el-date-picker disabled value-format="YYYY-MM-DD HH:mm:ss" v-model="form.createtime" type="datetime" placeholder="选择时间" :shortcuts="shortcuts"/>
                    </el-form-item>
                                                                                     <el-form-item label="测试人" prop="cesr">
                        <x-select-table
                            :disabled="user.role==='patient'"                                :header="[{label:'患者',field:'name',width:'100%'}]"
                                        v-model="form.cesr"
                                        :queryParams="[{name:'name',label:'患者'}]"
                                        api="/patient/list"
                                        labelField="name"
                                        valueField="id"
                        ></x-select-table>
                    </el-form-item>
                                                                                    <el-form-item label="观察到的抑郁" prop="s1">
                        <el-select  filterable v-model="form.s1" clearable placeholder="Select">
                            <el-option v-for="item in s1OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="抑郁主诉" prop="s2">
                        <el-select  filterable v-model="form.s2" clearable placeholder="Select">
                            <el-option v-for="item in s2OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="内心紧张" prop="s3">
                        <el-select  filterable v-model="form.s3" clearable placeholder="Select">
                            <el-option v-for="item in s3OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="睡眠减少" prop="s4">
                        <el-select  filterable v-model="form.s4" clearable placeholder="Select">
                            <el-option v-for="item in s4OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="食欲减退" prop="s5">
                        <el-select  filterable v-model="form.s5" clearable placeholder="Select">
                            <el-option v-for="item in s5OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="注意集中困难" prop="s6">
                        <el-select  filterable v-model="form.s6" clearable placeholder="Select">
                            <el-option v-for="item in s6OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="懒散" prop="s7">
                        <el-select  filterable v-model="form.s7" clearable placeholder="Select">
                            <el-option v-for="item in s7OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="感受不能" prop="s8">
                        <el-select  filterable v-model="form.s8" clearable placeholder="Select">
                            <el-option v-for="item in s8OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="悲观思想" prop="s9">
                        <el-select  filterable v-model="form.s9" clearable placeholder="Select">
                            <el-option v-for="item in s9OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="自杀观念" prop="s10">
                        <el-select  filterable v-model="form.s10" clearable placeholder="Select">
                            <el-option v-for="item in s10OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="总分" prop="score">
                        <el-input  maxlength="255" v-model.number="form.score" type="number"/>
                    </el-form-item>
                                                                                    <el-form-item label="结果" prop="jieg">
                        <el-input  maxlength="255" v-model="form.jieg" />
                    </el-form-item>
                                        </el-form>
</template>
<script setup>
    import {  reactive, ref } from 'vue'
    const formRef = ref();
    let user = Cache.getUser()//当前登录用户
    let form = ref({});
    let callBack;//保存成功回调函数
    const rules = reactive({
        createtime:{required: true, message: "测试时间必填", trigger: "blur"},
        s1:{required: true, message: "观察到的抑郁必填", trigger: "blur"},
        s2:{required: true, message: "抑郁主诉必填", trigger: "blur"},
        s3:{required: true, message: "内心紧张必填", trigger: "blur"},
        s4:{required: true, message: "睡眠减少必填", trigger: "blur"},
        s5:{required: true, message: "食欲减退必填", trigger: "blur"},
        s6:{required: true, message: "注意集中困难必填", trigger: "blur"},
        s7:{required: true, message: "懒散必填", trigger: "blur"},
        s8:{required: true, message: "感受不能必填", trigger: "blur"},
        s9:{required: true, message: "悲观思想必填", trigger: "blur"},
        s10:{required: true, message: "自杀观念必填", trigger: "blur"},
    })

     let s1OptionList = ref([  { name:'0无'}, { name:'2看起来是悲伤的但能使之高兴一些'}, { name:'4突出的悲伤忧郁但其情绪仍可受外界环境影响'}, { name:'6整天抑郁极度严重'}, ]) //观察到的抑郁 下拉框数据
     let s2OptionList = ref([  { name:'0在日常心境中偶有抑郁'}, { name:'2有抑郁或情绪低沉但可使之愉快些'}, { name:'4沉湎于抑郁沮丧心境但环境仍可对心境有些影响'}, { name:'6持久不断的深度抑郁沮丧'}, ]) //抑郁主诉 下拉框数据
     let s3OptionList = ref([  { name:'0平静偶有瞬间的紧张'}, { name:'2偶有紧张不安及难以言明的不舒服感'}, { name:'4持久的内心紧张或间歇呈现的恐惧状态要花费相当努力方能克制'}, { name:'6持续的恐惧和苦恼极度惊恐'}, ]) //内心紧张 下拉框数据
     let s4OptionList = ref([  { name:'0睡眠如常'}, { name:'2轻度入睡困难或睡眠较浅或时睡时醒'}, { name:'4睡眠减少或睡眠中断2小时以上'}, { name:'6每天睡眠总时间不超过2－3小时'}, ]) //睡眠减少 下拉框数据
     let s5OptionList = ref([  { name:'0食欲正常或增进'}, { name:'2轻度食欲减退'}, { name:'4没有食欲食而无味'}, { name:'6不愿进食需他人帮助。'}, ]) //食欲减退 下拉框数据
     let s6OptionList = ref([  { name:'0无'}, { name:'2偶有思想集中困难'}, { name:'4思想难以集中以致干扰阅读或交谈'}, { name:'6完全不能集中思想无法阅读'}, ]) //注意集中困难 下拉框数据
     let s7OptionList = ref([  { name:'0活动发动并无困难动作不慢'}, { name:'2有始动困难'}, { name:'4即使简单的日常活动也难以发动需花很大努力'}, { name:'6完全呈懒散状态无人帮助什么也干不了'}, ]) //懒散 下拉框数据
     let s8OptionList = ref([  { name:'0对周围的人和物的兴趣正常'}, { name:'2对日常趣事的享受减退'}, { name:'4对周围不感兴趣对朋友和熟人缺乏感情'}, { name:'6呈情感麻木状态不能体验愤怒、悲痛和愉快对亲友全无感情。'}, ]) //感受不能 下拉框数据
     let s9OptionList = ref([  { name:'0无'}, { name:'2时有时无的失败自责和自卑感'}, { name:'4持久的自责或肯定的但尚近情理的自罪对前途悲观'}, { name:'6自我毁灭、自我悔恨或感罪恶深重的妄想荒谬绝伦、难以动摇的自我谴责'}, ]) //悲观思想 下拉框数据
     let s10OptionList = ref([  { name:'0无'}, { name:'2对生活厌倦偶有瞬间即逝的自杀念头'}, { name:'4感到不如死了的好常有自杀念头认为自杀是一种可能的自我解决的方法但尚无切实的自杀计划'}, { name:'6已拟适合时机的自杀计划并积极准备'}, ]) //自杀观念 下拉框数据

    const render = async (id,loadThisPage) => {
        Msg.loading("加载中..")
        let {data} = await Http.get(`/madrs/detail`, {id: id});
        form.value = data
        callBack = loadThisPage
        Msg.loading(false)
    }
    const submit = async () => {

        await formRef.value.validate(async (isValid, invalidFields) => {
            if(! isValid) {
                Msg.error(Helper.getFirstMessage(invalidFields));
                return;
            }
            let {success,message} = await Http.post(`/madrs/save`, form.value);
            if(! success) {
                Msg.error(message);
                return;
            }
            Msg.success(message);
            Dialog.close();
            callBack(form.value)
        });
    }

    defineExpose({render,submit});

</script>

