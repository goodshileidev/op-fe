export const UserRules = {
  userId: [
    {required: true, message: "必填项目"},

  ],
  userName: [
    {max: 10, message: "长度应小于10个字符"},
  ],
  employeeNumber: [
    {max: 20, message: "长度应小于20个字符"},
  ],
  nfcCode: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  userType: [
    {required: true, message: "必填项目"},

  ],
  signatureFile: [
    {max: 10, message: "长度应小于10个字符"},
  ],
  avatarUrl: [
    {max: 200, message: "长度应小于200个字符"},
  ],
  password: [
    {max: 30, message: "长度应小于30个字符"},
  ],
  signatureImageUrl: [
    {max: 200, message: "长度应小于200个字符"},
  ],
  stampImageUrl: [
    {max: 200, message: "长度应小于200个字符"},
  ],
  userStatus: [
    {required: true, message: "必填项目"},

  ],
};
