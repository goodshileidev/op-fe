export const DocumentRules= {
     documentId:[
        {required: true, message: "必填项目"},

     ],
     documentTemplateId:[
        {required: true, message: "必填项目"},

     ],
     documentTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     operationPlanId:[
        {max: 30, message: "长度应小于30个字符"},
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
     bizType:[
        {required: true, message: "必填项目"},

     ],
     operationType:[

     ],
     dataDate:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     shipType:[
        {required: true, message: "必填项目"},
        {max: 10, message: "长度应小于10个字符"},
     ],
     templateName:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     templateNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     currentVersion:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
     ],
     coverTemplateHtml:[

     ],
     editorRoleList:[

     ],
     documentNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     publishTime:[
        {required: true, message: "必填项目"},

     ],
     publisherName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     publisherId:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     stepDefinition:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     currentStep:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     fillinStatus:[

     ],
     recipientList:[

     ],
     viewerList:[
        {max: 1000, message: "长度应小于1000个字符"},
     ],
     editorList:[
        {max: 1000, message: "长度应小于1000个字符"},
     ],
     inputStartTime:[
        {required: true, message: "必填项目"},

     ],
     inputFinishTime:[
        {required: true, message: "必填项目"},

     ],
     submissionRecipientUnit:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     submissionStatus:[

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
