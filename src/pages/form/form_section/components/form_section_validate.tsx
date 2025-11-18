export const FormSectionRules= {
     formSectionId:[
        {required: true, message: "必填项目"},

     ],
     parentSectionId:[
        {required: true, message: "必填项目"},

     ],
     formId:[

     ],
     documentId:[
        {required: true, message: "必填项目"},

     ],
     formQuestionTemplateId:[
        {required: true, message: "必填项目"},

     ],
     formTemplateId:[
        {required: true, message: "必填项目"},

     ],
     documentTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     documentTemplateId:[
        {required: true, message: "必填项目"},

     ],
     sectionNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     sectionName:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     mainSubSectionType:[
        {required: true, message: "必填项目"},

     ],
     sectionType:[
        {required: true, message: "必填项目"},
        {max: 10, message: "长度应小于10个字符"},
     ],
     contentType:[
        {required: true, message: "必填项目"},

     ],
     viewerRoleList:[

     ],
     editorRoleList:[

     ],
     summary:[
        {max: 500, message: "长度应小于500个字符"},
     ],
     detailedContent:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     currentStep:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     fillinStatus:[

     ],
     formatTemplateHtml:[

     ],
     totalColumnCount:[

     ],
     tableColumnList:[
        {max: 1000, message: "长度应小于1000个字符"},
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
