export const NotificationConfigRules= {
     notificationConfigId:[
        {required: true, message: "必填项目"},

     ],
     documentId:[
        {required: true, message: "必填项目"},

     ],
     documentNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     notifiedPersonType:[
        {required: true, message: "必填项目"},

     ],
     notifiedPersonReceiptMethod:[
        {required: true, message: "必填项目"},

     ],
     notifyTiming:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     notificationTimingBusinessDescription:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     notificationDetailedContentTemplate:[
        {required: true, message: "必填项目"},
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     isReceiptRecordRequired:[
        {required: true, message: "必填项目"},

     ],
     receiptMethod:[
        {required: true, message: "必填项目"},

     ],
};
