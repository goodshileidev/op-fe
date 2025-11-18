import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {getDocumentTemplateRule} from '@/common/service/template/document_template_rule'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface IDocumentTemplateRuleDetailProps {
  documentTemplateRuleId: string
  isOpen: boolean
  onGetData: any
}

const DocumentTemplateRuleDetail: React.FC<IDocumentTemplateRuleDetailProps> = ((props) => {
  const documentTemplateRuleId = props.documentTemplateRuleId
  const [documentTemplateRuleData, setDocumentTemplateRuleData] = useState<DocumentTemplateRuleType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen



  const [codeListDocumentTemplate, setCodeListDocumentTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListDocumentTemplate({}).then((DocumentTemplateCodeList)=>{
      setCodeListDocumentTemplate(DocumentTemplateCodeList)
      console.debug("DocumentTemplateCodeList", DocumentTemplateCodeList)
    })
  }, [])



  const getDocumentTemplateRuleDetail = async (documentTemplateRuleId: string) => {
    setLoading(true);
    const response = await getDocumentTemplateRule(documentTemplateRuleId);
    const data = response.data ?? null;
    setDocumentTemplateRuleData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (documentTemplateRuleId && documentTemplateRuleId!=="" && documentTemplateRuleId!=="0") {
      getDocumentTemplateRuleDetail(documentTemplateRuleId)
    }
  }, [documentTemplateRuleId, isOpen])

  //if (documentTemplateRuleData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

 

const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'documentTemplateName','label': t('template.document_template_rule.document_template_name'),'children':   <p>
    {documentTemplateRuleData.documentTemplateName}
  </p>
}))
//
//     items.push((
// {'key': 'cargoName','label': t('template.document_template_rule.cargo_name'),'children':   <p>
//         {codeList.CargoName
//             .filter((item:any) => (documentTemplateRuleData.cargoName).includes(item.value))
//             .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
//   </p>
//
// }))

    items.push((
{'key': 'operationType','label': t('template.document_template_rule.operation_type'),'children':   <p>
        {codeList.OperationType
            .filter((item:any) => (documentTemplateRuleData.operationType).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'bizType','label': t('template.document_template_rule.biz_type'),'children':   <p>
        {codeList.BizType
            .filter((item:any) => (item.value===documentTemplateRuleData.bizType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'domesticForeignTradeType','label': t('template.document_template_rule.domestic_foreign_trade_type'),'children':   <p>
        {codeList.DomesticForeignTradeType
            .filter((item:any) => (item.value===documentTemplateRuleData.domesticForeignTradeType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))
  return items;
}


  const createDescriptionFields = (conditionValue: string) => {
    const items = []
    items.push((<>
<Descriptions bordered column={1} items={createBasicItems()}>
</Descriptions>
</>
));

    return items;
  }

  return (
    <>
{createDescriptionFields()}

    </>
  );
})
export default DocumentTemplateRuleDetail;
