import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {MonthlySecurityCheckType} from '@/common/data_type/operation/monthly_security_check'
import {getMonthlySecurityCheck} from '@/common/service/operation/monthly_security_check'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface IMonthlySecurityCheckDetailProps {
  monthlySecurityCheckId: string
  monthlySecurityCheckData?: MonthlySecurityCheckType
  isOpen: boolean
  onGetData: any
}

const MonthlySecurityCheckDetail: React.FC<IMonthlySecurityCheckDetailProps> = ((props) => {
  const monthlySecurityCheckId = props.monthlySecurityCheckId
  const [monthlySecurityCheckData, setMonthlySecurityCheckData] = useState<MonthlySecurityCheckType | any>(props.monthlySecurityCheckData)
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getMonthlySecurityCheckDetail = async (monthlySecurityCheckId: string) => {
    setLoading(true);
    const response = await getMonthlySecurityCheck(monthlySecurityCheckId);
    const data = response.data ?? null;
    setMonthlySecurityCheckData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.monthlySecurityCheckData) {
      if (monthlySecurityCheckId && monthlySecurityCheckId!=="" && monthlySecurityCheckId!=="0") {
        getMonthlySecurityCheckDetail(monthlySecurityCheckId)
      }
    }
  }, [monthlySecurityCheckId, props.monthlySecurityCheckData, isOpen])

  //if (monthlySecurityCheckData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'checkYearMonth','label': t('operation.monthly_security_check.check_year_month'),'children':   <p>
    {monthlySecurityCheckData.checkYearMonth}
  </p>
}))

    items.push((
{'key': 'formName','label': t('operation.monthly_security_check.form_name'),'children':   <p>
        {codeList.MonthlyCheckForm
            .filter((item:any) => (item.value===monthlySecurityCheckData.formName))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'bizType','label': t('operation.monthly_security_check.biz_type'),'children':   <p>
    {monthlySecurityCheckData.bizType}
  </p>
}))

    items.push((
{'key': 'operateStatus','label': t('operation.monthly_security_check.operate_status'),'children':   <p>
        {codeList.OperateStatus
            .filter((item:any) => (item.value===monthlySecurityCheckData.operateStatus))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'turnGroup','label': t('operation.monthly_security_check.turn_group'),'children':   <p>
        {codeList.OperationStatus
            .filter((item:any) => (item.value===monthlySecurityCheckData.turnGroup))
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
export default MonthlySecurityCheckDetail;
