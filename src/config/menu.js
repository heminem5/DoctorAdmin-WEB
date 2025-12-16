/**
 * 菜单
 */
export default [
    {
        name: "首页",
        id: "0",
        path: "/hello"
    },
    {
        name: "功能列表",
        id: "1",
        path: "/hello/codeying",
        children: [
            {path: "/admin", name: "管理员", id: "1_0", parent: "1",roles:['',]},
            {path: "/doctor", name: "医生", id: "1_1", parent: "1",roles:['admin','patient',]},
            {path: "/patient", name: "患者", id: "1_2", parent: "1",roles:['admin','doctor',]},
            {path: "/doctorAdvice", name: "医生建议", id: "1_3", parent: "1",roles:['admin','doctor','patient',]},
            {path: "/phq", name: "PHQ量表", id: "1_4", parent: "1",roles:['admin','doctor','patient',]},
            {path: "/madrs", name: "MADRS量表", id: "1_5", parent: "1",roles:['admin','doctor','patient',]},
            {path: "/cesd", name: "CES-D量表", id: "1_6", parent: "1",roles:['admin','doctor','patient',]},
        ]
    },
    {
        name: "我的消息",
        id: "chat",
        path: "/hello/chat"
    },
]

