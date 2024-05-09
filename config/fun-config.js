export const funConfigData = [
  {
    field: "rate",
    type: "select",
    name: "额定电流（RATE）",
    range: [8, 16, 24, 32, 40, 48],
    value: 8,
  },
  {
    field: "authFree",
    type: "switch",
    name: "即插即充（ATUTH FREE）",
    value: false,
  },
  {
    field: "btFree",
    type: "switch",
    name: "蓝牙即插即充（BT FREE）",
    value: false,
  },
  {
    field: "peEnable",
    type: "switch",
    name: "接地检测(PE ENABLE）",
    value: false,
  },
];
