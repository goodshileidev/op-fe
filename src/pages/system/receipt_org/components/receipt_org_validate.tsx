export const ReceiptOrgRules= {
     receiptOrgId:[
        {required: true, message: "必填项目"},

     ],
     orgNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     orgName:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
     ],
     orgType:[
        {required: true, message: "必填项目"},

     ],
};
