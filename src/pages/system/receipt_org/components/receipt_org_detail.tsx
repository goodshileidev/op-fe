import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {getReceiptOrg} from '@/common/service/system/receipt_org'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface IReceiptOrgDetailProps {
  receiptOrgId: string
  isOpen: boolean
}

const ReceiptOrgDetail: React.FC<IReceiptOrgDetailProps> = ((props) => {
  const receiptOrgId = props.receiptOrgId
  const [receiptOrgData, setReceiptOrgData] = useState<ReceiptOrgType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getReceiptOrgDetail = async (receiptOrgId: string) => {
    setLoading(true);
    const response = await getReceiptOrg(receiptOrgId);
    setReceiptOrgData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (receiptOrgId && receiptOrgId!=="" && receiptOrgId!=="0") {
      getReceiptOrgDetail(receiptOrgId)
    }
  }, [receiptOrgId, isOpen])

  //if (receiptOrgData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("system.receipt_org.org_no")}>
        {receiptOrgData.orgNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.receipt_org.org_name")}>
        {receiptOrgData.orgName}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.receipt_org.org_type")}>
        {codeList.OrgType
            .filter((item:any) => (item.value===receiptOrgData.orgType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>



      </Descriptions>

    </>
  );
})
export default ReceiptOrgDetail;
