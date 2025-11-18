import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {SecurityDeclareType} from '@/common/data_type/operation/security_declare'
import {getSecurityDeclare} from '@/common/service/operation/security_declare'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface ISecurityDeclareDetailProps {
  securityDeclareId: string
  securityDeclareData?: SecurityDeclareType
  isOpen: boolean
  onGetData: any
}

const SecurityDeclareDetail: React.FC<ISecurityDeclareDetailProps> = ((props) => {
  const securityDeclareId = props.securityDeclareId
  const [securityDeclareData, setSecurityDeclareData] = useState<SecurityDeclareType | any>(props.securityDeclareData)
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getSecurityDeclareDetail = async (securityDeclareId: string) => {
    setLoading(true);
    const response = await getSecurityDeclare(securityDeclareId);
    const data = response.data ?? null;
    setSecurityDeclareData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.securityDeclareData) {
      if (securityDeclareId && securityDeclareId!=="" && securityDeclareId!=="0") {
        getSecurityDeclareDetail(securityDeclareId)
      }
    }
  }, [securityDeclareId, props.securityDeclareData, isOpen])

  //if (securityDeclareData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'dataDate','label': t('operation.security_declare.data_date'),'children':   <p>
    {securityDeclareData.dataDate}
  </p>
}))

    items.push((
{'key': 'formName','label': t('operation.security_declare.form_name'),'children':   <p>
        {codeList.SecurityDeclareForm
            .filter((item:any) => (item.value===securityDeclareData.formName))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'operateStatus','label': t('operation.security_declare.operate_status'),'children':   <p>
        {codeList.OperationStatus
            .filter((item:any) => (item.value===securityDeclareData.operateStatus))
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
export default SecurityDeclareDetail;
