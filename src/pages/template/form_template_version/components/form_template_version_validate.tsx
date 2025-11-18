export const FormTemplateVersionRules= {
     formTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     formTemplateId:[
        {required: true, message: "必填项目"},

     ],
     versionNo:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
     ],
     publishTime:[

     ],
     formName:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     formNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     viewerRoleList:[
        {required: true, message: "必填项目"},

     ],
     editorRoleList:[
        {required: true, message: "必填项目"},

     ],
     printTemplate:[
        {required: true, message: "必填项目"},

     ],
     recipientList:[
        {required: true, message: "必填项目"},

     ],
     operationMode:[
        {required: true, message: "必填项目"},

     ],
     previewHtml:[
        {required: true, message: "必填项目"},

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
