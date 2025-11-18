import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {YuancangOperatonType} from '@/common/data_type/operation/yuancang_operaton'
import {getYuancangOperaton} from '@/common/service/operation/yuancang_operaton'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface IYuancangOperatonDetailProps {
  yuancangOperatonId: string
  yuancangOperatonData?: YuancangOperatonType
  isOpen: boolean
  onGetData: any
}

const YuancangOperatonDetail: React.FC<IYuancangOperatonDetailProps> = ((props) => {
  const yuancangOperatonId = props.yuancangOperatonId
  const [yuancangOperatonData, setYuancangOperatonData] = useState<YuancangOperatonType | any>(props.yuancangOperatonData)
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getYuancangOperatonDetail = async (yuancangOperatonId: string) => {
    setLoading(true);
    const response = await getYuancangOperaton(yuancangOperatonId);
    const data = response.data ?? null;
    setYuancangOperatonData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.yuancangOperatonData) {
      if (yuancangOperatonId && yuancangOperatonId!=="" && yuancangOperatonId!=="0") {
        getYuancangOperatonDetail(yuancangOperatonId)
      }
    }
  }, [yuancangOperatonId, props.yuancangOperatonData, isOpen])

  //if (yuancangOperatonData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'dataDate','label': t('operation.yuancang_operaton.data_date'),'children':   <p>
    {yuancangOperatonData.dataDate}
  </p>
}))

    items.push((
{'key': 'formName','label': t('operation.yuancang_operaton.form_name'),'children':   <p>
        {codeList.YuancangForm
            .filter((item:any) => (item.value===yuancangOperatonData.formName))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'operateStatus','label': t('operation.yuancang_operaton.operate_status'),'children':   <p>
        {codeList.OperationStatus
            .filter((item:any) => (item.value===yuancangOperatonData.operateStatus))
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
export default YuancangOperatonDetail;
