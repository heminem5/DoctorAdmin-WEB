/**
 * 菜单
 */
export default [
  {
    name: "首页",
    id: "0",
    path: "/hello",
  },
  {
    name: "功能列表",
    id: "1",
    path: "/hello/codeying",
    children: [
      { path: "/admin", name: "管理员", id: "1_0", parent: "1", roles: [""] },
      {
        path: "/doctor",
        name: "医生",
        id: "1_1",
        parent: "1",
        roles: ["admin", "patient"],
      },
      {
        path: "/patient",
        name: "患者",
        id: "1_2",
        parent: "1",
        roles: ["admin"],
      },
      {
        path: "/doctorAdvice",
        name: "医生建议",
        id: "1_3",
        parent: "1",
        roles: ["admin", "patient"],
      },
      {
        path: "/phq",
        name: "PHQ量表",
        id: "1_4",
        parent: "1",
        roles: ["admin", "patient"],
      },
      {
        path: "/madrs",
        name: "MADRS量表",
        id: "1_5",
        parent: "1",
        roles: ["admin", "patient"],
      },
      {
        path: "/cesd",
        name: "CES-D量表",
        id: "1_6",
        parent: "1",
        roles: ["admin", "patient"],
      },
    ],
  },
  {
    name: "诊疗工作台",
    id: "workbench",
    path: "/hello",
    children: [
      {
        path: "/workbench",
        name: "诊疗工作台",
        id: "workbench_0",
        parent: "workbench",
        roles: ["doctor"],
      },
    ],
  },
  {
    name: "我的消息",
    id: "chat",
    path: "/hello/chat",
  },
];
