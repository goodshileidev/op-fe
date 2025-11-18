export const NotificationHistoryRules= {
     notificationHistoryId:[
        {required: true, message: "必填项目", trigger: "blur", type1:"int", type:"string"},
        {max: 0, message: "应小于0", trigger: "blur", type1:"int", type:"string"},
     ],
     documentId:[
        {required: true, message: "必填项目", trigger: "blur", type1:"int", type:"number"},
        {max: 0, message: "应小于0", trigger: "blur", type1:"int", type:"number"},
     ],
     documentNo:[
        {required: true, message: "必填项目", trigger: "blur", type1:"text", type:"string"},
        {max: 100, message: "长度应小于100个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     notifiedPersonName:[
        {max: 30, message: "长度应小于30个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     notifiedPersonId:[
        {max: 30, message: "长度应小于30个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     notifiedPersonReceiptMethod:[
        {required: true, message: "必填项目", trigger: "blur", type1:"text", type:"string"},
        {max: 30, message: "长度应小于30个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     notificationDatetime:[
        {required: true, message: "必填项目", trigger: "blur", type1:"datetime", type:"string"},
        {max: 0, message: "长度应小于0个字符", trigger: "blur", type1:"datetime", type:"string"},
     ],
     notificationTimeDesc:[
        {max: 10, message: "长度应小于10个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     notificationContent:[
        {max: 2000, message: "长度应小于2000个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     receiptMethod:[
        {required: true, message: "必填项目", trigger: "blur", type1:"text", type:"string"},
        {max: 10, message: "长度应小于10个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     receiptTime:[
        {required: true, message: "必填项目", trigger: "blur", type1:"datetime", type:"string"},
        {max: 0, message: "长度应小于0个字符", trigger: "blur", type1:"datetime", type:"string"},
     ],
     receiptContent:[
        {max: 1000, message: "长度应小于1000个字符", trigger: "blur", type1:"text", type:"string"},
     ],
     isReceiptRequired:[
        {max: 0, message: "长度应小于0个字符", trigger: "blur", type1:"text", type:"string"},
     ],
};
