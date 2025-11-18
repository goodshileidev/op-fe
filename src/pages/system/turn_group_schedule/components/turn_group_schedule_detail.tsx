import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {getTurnGroupSchedule} from '@/common/service/system/turn_group_schedule'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface ITurnGroupScheduleDetailProps {
  turnGroupScheduleId: string
  isOpen: boolean
  onGetData: any
}

const TurnGroupScheduleDetail: React.FC<ITurnGroupScheduleDetailProps> = ((props) => {
  const turnGroupScheduleId = props.turnGroupScheduleId
  const [turnGroupScheduleData, setTurnGroupScheduleData] = useState<TurnGroupScheduleType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getTurnGroupScheduleDetail = async (turnGroupScheduleId: string) => {
    setLoading(true);
    const response = await getTurnGroupSchedule(turnGroupScheduleId);
    const data = response.data ?? null;
    setTurnGroupScheduleData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (turnGroupScheduleId && turnGroupScheduleId!=="" && turnGroupScheduleId!=="0") {
      getTurnGroupScheduleDetail(turnGroupScheduleId)
    }
  }, [turnGroupScheduleId, isOpen])

  //if (turnGroupScheduleData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'dataDate','label': t('system.turn_group_schedule.data_date'),'children':   <p>
    {turnGroupScheduleData.dataDate}
  </p>
}))

    items.push((
{'key': 'turnGroup1','label': t('system.turn_group_schedule.turn_group1'),'children':   <p>
        {codeList.TurnGroup
            .filter((item:any) => (item.value===turnGroupScheduleData.turnGroup1))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'turnGroup2','label': t('system.turn_group_schedule.turn_group2'),'children':   <p>
        {codeList.TurnGroup
            .filter((item:any) => (item.value===turnGroupScheduleData.turnGroup2))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'turnGroup3','label': t('system.turn_group_schedule.turn_group3'),'children':   <p>
        {codeList.TurnGroup
            .filter((item:any) => (item.value===turnGroupScheduleData.turnGroup3))
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
export default TurnGroupScheduleDetail;
