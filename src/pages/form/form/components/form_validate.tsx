export const FormRules= {
     formId:[
        {required: true, message: "必填项目"},

     ],
     formTemplateId:[
        {required: true, message: "必填项目"},

     ],
     formTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     documentId:[
        {required: true, message: "必填项目"},

     ],
     operationPlanId:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
     ],
     dataDate:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     formNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     formName:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     shipName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     cargoName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     domesticForeignTradeType:[
        {required: true, message: "必填项目"},

     ],
     operationType:[

     ],
     berthingTime:[
        {required: true, message: "必填项目"},

     ],
     departureTime:[
        {required: true, message: "必填项目"},

     ],
     inputPersonName:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     inputBy:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     inputStartTime:[
        {required: true, message: "必填项目"},

     ],
     inputFinishTime:[
        {required: true, message: "必填项目"},

     ],
     printTemplate:[

     ],
     displayPosition:[
        {required: true, message: "必填项目"},

     ],
     editableTimeOnMiniProgram:[
        {max: 1000, message: "长度应小于1000个字符"},
     ],
     publishStatus:[
        {required: true, message: "必填项目"},

     ],
     fillinOrder:[

     ],
     currentStep:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     fillinStatus:[

     ],
     viewerRoleList:[

     ],
     editorRoleList:[

     ],
     recipientList:[

     ],
     operationMode:[

     ],
     reminderSettings:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     isSignatureRequired:[
        {required: true, message: "必填项目"},

     ],
     isStampSignatureRequired:[
        {required: true, message: "必填项目"},

     ],
     signatureImageUrl:[
        {max: 200, message: "长度应小于200个字符"},
     ],
     stampImageUrl:[
        {max: 200, message: "长度应小于200个字符"},
     ],
     submissionRecipientUnit:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     submissionFinishTime:[
        {required: true, message: "必填项目"},

     ],
     submissionSettings:[

     ],
     submissionHistory:[

     ],
     variableNameList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     varConfigList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     varValueList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
};
