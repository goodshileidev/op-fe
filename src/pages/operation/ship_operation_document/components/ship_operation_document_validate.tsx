export const ShipOperationDocumentRules= {
     shipOperationDocumentId:[
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
     turnGroup:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     turnNo:[
        {max: 2000, message: "长度应小于2000个字符"},
     ],
     shipName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     cargoName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     platformCargoName:[
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
     portName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     voyageNo:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     netTonnage:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     grossTonnage:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     deadWeightTonnage:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     loadUnload:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     englishShipName:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     shipMmsi:[
        {max: 30, message: "长度应小于30个字符"},
     ],
     dataDate:[
        {max: 10, message: "长度应小于10个字符"},
     ],
     planedArrivingTime:[
        {required: true, message: "必填项目"},

     ],
     berthingTime:[
        {required: true, message: "必填项目"},

     ],
     departureTime:[
        {required: true, message: "必填项目"},

     ],
};
