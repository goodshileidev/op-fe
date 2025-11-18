export const DocumentTemplateVersionRules= {
     documentTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     documentTemplateId:[
        {required: true, message: "必填项目"},

     ],
     bizType:[
        {required: true, message: "必填项目"},

     ],
     templateName:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     versionNo:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
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
     coverTemplateHtml:[
        {required: true, message: "必填项目"},

     ],
     recipientList:[
        {required: true, message: "必填项目"},

     ],
     stepDefinition:[
        {required: true, message: "必填项目"},

     ],
     usageScenarioDescription:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     submissionRecipientUnit:[
        {max: 30, message: "长度应小于30个字符"},
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
