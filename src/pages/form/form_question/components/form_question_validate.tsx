export const FormQuestionRules= {
     formQuestionId:[
        {required: true, message: "必填项目"},

     ],
     formSectionId:[

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
     formTemplateVersionId:[
        {required: true, message: "必填项目"},

     ],
     questionNo:[
        {required: true, message: "必填项目"},
        {max: 100, message: "长度应小于100个字符"},
     ],
     questionTitleList:[
        {required: true, message: "必填项目"},
        {max: 30, message: "长度应小于30个字符"},
     ],
     subQuestionCount:[

     ],
     subQuestionType:[
        {required: true, message: "必填项目"},

     ],
     inputControlType:[
        {required: true, message: "必填项目"},

     ],
     variableNameList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     varConfigList:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     viewerRoleList:[
        {required: true, message: "必填项目"},

     ],
     editorRoleList:[
        {required: true, message: "必填项目"},

     ],
     detailedDescription:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     subQuestionTemplateHtml:[
        {required: true, message: "必填项目"},

     ],
     remark:[
        {max: 200, message: "长度应小于200个字符"},
     ],
     inputBy:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     inputTime:[
        {required: true, message: "必填项目"},

     ],
     operationMode:[
        {required: true, message: "必填项目"},

     ],
     varValueList:[
        {required: true, message: "必填项目"},
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     variableHistory:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     isPhotoEvidenceRequired:[
        {required: true, message: "必填项目"},

     ],
     isSignatureEvidenceRequired:[
        {required: true, message: "必填项目"},

     ],
     signatureImageUrl:[
        {max: 200, message: "长度应小于200个字符"},
     ],
     stampImageUrl:[
        {max: 200, message: "长度应小于200个字符"},
     ],
};
