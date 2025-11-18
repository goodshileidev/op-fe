export const NotificationHistoryRules= {
     notificationHistoryId:[
        {required: true, message: "必填项目"},

     ],
     documentId:[
        {required: true, message: "必填项目"},

     ],
     documentNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     notifiedPersonName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     notifiedPersonId:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     notifiedPersonReceiptMethod:[
        {required: true, message: "必填项目"},

     ],
     notificationDatetime:[
        {required: true, message: "必填项目"},

     ],
     notificationTimeDesc:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     notificationContent:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     receiptMethod:[
        {required: true, message: "必填项目"},

     ],
     receiptTime:[
        {required: true, message: "必填项目"},

     ],
     receiptContent:[
        {max: 1000, message: "长度应小于1000个字符"},
     ],
     isReceiptRequired:[
        {required: true, message: "必填项目"},

     ],
};
