import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {ShipOperationDocumentType} from '@/common/data_type/form/ship_operation_document'
import {getShipOperationDocument} from '@/common/service/form/ship_operation_document'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface IShipOperationDocumentDetailProps {
  shipOperationDocumentId: string
  shipOperationDocumentData?: ShipOperationDocumentType
  isOpen: boolean
  onGetData: any
}

const ShipOperationDocumentDetail: React.FC<IShipOperationDocumentDetailProps> = ((props) => {
  const shipOperationDocumentId = props.shipOperationDocumentId
  const [shipOperationDocumentData, setShipOperationDocumentData] = useState<ShipOperationDocumentType | any>(props.shipOperationDocumentData)
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getShipOperationDocumentDetail = async (shipOperationDocumentId: string) => {
    setLoading(true);
    const response = await getShipOperationDocument(shipOperationDocumentId);
    const data = response.data ?? null;
    setShipOperationDocumentData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.shipOperationDocumentData) {
      if (shipOperationDocumentId && shipOperationDocumentId!=="" && shipOperationDocumentId!=="0") {
        getShipOperationDocumentDetail(shipOperationDocumentId)
      }
    }
  }, [shipOperationDocumentId, props.shipOperationDocumentData, isOpen])

  //if (shipOperationDocumentData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


const createBasicBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'turnGroup','label': t('form.ship_operation_document.turn_group'),'children':   <p>
    {shipOperationDocumentData.turnGroup}
  </p>
}))

    items.push((
{'key': 'turnNo','label': t('form.ship_operation_document.turn_no'),'children':   <p>
    {shipOperationDocumentData.turnNo}
  </p>
}))

    items.push((
{'key': 'shipName','label': t('form.ship_operation_document.ship_name'),'children':   <p>
    {shipOperationDocumentData.shipName}
  </p>
}))

    items.push((
{'key': 'cargoName','label': t('form.ship_operation_document.cargo_name'),'children':   <p>
    {shipOperationDocumentData.cargoName}
  </p>
}))

    items.push((
{'key': 'platformCargoName','label': t('form.ship_operation_document.platform_cargo_name'),'children':   <p>
    {shipOperationDocumentData.platformCargoName}
  </p>
}))

    items.push((
{'key': 'domesticForeignTradeType','label': t('form.ship_operation_document.domestic_foreign_trade_type'),'children':   <p>
        {codeList.DomesticForeignTradeType
            .filter((item:any) => (item.value===shipOperationDocumentData.domesticForeignTradeType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'bizType','label': t('form.ship_operation_document.biz_type'),'children':   <p>
        {codeList.BizType
            .filter((item:any) => (item.value===shipOperationDocumentData.bizType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'operationType','label': t('form.ship_operation_document.operation_type'),'children':   <p>
        {codeList.OperationType
            .filter((item:any) => (item.value===shipOperationDocumentData.operationType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </p>

}))

    items.push((
{'key': 'portName','label': t('form.ship_operation_document.port_name'),'children':   <p>
    {shipOperationDocumentData.portName}
  </p>
}))

    items.push((
{'key': 'voyageNo','label': t('form.ship_operation_document.voyage_no'),'children':   <p>
    {shipOperationDocumentData.voyageNo}
  </p>
}))

    items.push((
{'key': 'netTonnage','label': t('form.ship_operation_document.net_tonnage'),'children':   <p>
    {shipOperationDocumentData.netTonnage}
  </p>
}))

    items.push((
{'key': 'grossTonnage','label': t('form.ship_operation_document.gross_tonnage'),'children':   <p>
    {shipOperationDocumentData.grossTonnage}
  </p>
}))

    items.push((
{'key': 'deadWeightTonnage','label': t('form.ship_operation_document.dead_weight_tonnage'),'children':   <p>
    {shipOperationDocumentData.deadWeightTonnage}
  </p>
}))

    items.push((
{'key': 'loadUnload','label': t('form.ship_operation_document.load_unload'),'children':   <p>
    {shipOperationDocumentData.loadUnload}
  </p>
}))

    items.push((
{'key': 'englishShipName','label': t('form.ship_operation_document.english_ship_name'),'children':   <p>
    {shipOperationDocumentData.englishShipName}
  </p>
}))

    items.push((
{'key': 'shipMmsi','label': t('form.ship_operation_document.ship_mmsi'),'children':   <p>
    {shipOperationDocumentData.shipMmsi}
  </p>
}))

    items.push((
{'key': 'dataDate','label': t('form.ship_operation_document.data_date'),'children':   <p>
    {shipOperationDocumentData.dataDate}
  </p>
}))

    items.push((
{'key': 'planedArrivingTime','label': t('form.ship_operation_document.planed_arriving_time'),'children':   <p>
    {shipOperationDocumentData.planedArrivingTime}
  </p>
}))

    items.push((
{'key': 'berthingTime','label': t('form.ship_operation_document.berthing_time'),'children':   <p>
    {shipOperationDocumentData.berthingTime}
  </p>
}))

    items.push((
{'key': 'departureTime','label': t('form.ship_operation_document.departure_time'),'children':   <p>
    {shipOperationDocumentData.departureTime}
  </p>
}))
  return items;
}


  const createDescriptionFields = (conditionValue: string) => {
    const items = []
    items.push((
<Tabs
    defaultActiveKey="basic"
    items={[
    {label: '基本信息',key: 'basic', children:(
<><Descriptions bordered column={2} items={createBasicBasicItems()}>
</Descriptions>
</>)},

         ]}
  />
  ));

    return items;
  }

  return (
    <>
{createDescriptionFields()}

    </>
  );
})
export default ShipOperationDocumentDetail;
