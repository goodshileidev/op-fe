export const DocumentTemplateRules= {
     documentTemplateId:[
        {required: true, message: "必填项目"},

     ],
     bizType:[
        {required: true, message: "必填项目"},

     ],
     shipType:[
        {required: true, message: "必填项目"},

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
        {required: true, message: "必填项目"},

     ],
     editorRoleList:[
        {required: true, message: "必填项目"},

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
     recipientList:[
        {required: true, message: "必填项目"},

     ],
     publishStatus:[
        {required: true, message: "必填项目"},

     ],
     stepDefinition:[
        {required: true, message: "必填项目"},

     ],
     usageScenarioDescription:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     submissionSettings:[
        {required: true, message: "必填项目"},

     ],
     variableNameList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     varConfigList:[
        {required: true, message: "必填项目"},
        {max: 2000, message: "长度应小于2000个字符"},
     ],
};
