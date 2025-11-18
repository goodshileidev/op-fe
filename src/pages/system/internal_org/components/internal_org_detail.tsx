import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {getInternalOrg} from '@/common/service/system/internal_org'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface IInternalOrgDetailProps {
  internalOrgId: string
  isOpen: boolean
}

const InternalOrgDetail: React.FC<IInternalOrgDetailProps> = ((props) => {
  const internalOrgId = props.internalOrgId
  const [internalOrgData, setInternalOrgData] = useState<InternalOrgType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getInternalOrgDetail = async (internalOrgId: string) => {
    setLoading(true);
    const response = await getInternalOrg(internalOrgId);
    setInternalOrgData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (internalOrgId && internalOrgId!=="" && internalOrgId!=="0") {
      getInternalOrgDetail(internalOrgId)
    }
  }, [internalOrgId, isOpen])

  //if (internalOrgData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("system.internal_org.org_no")}>
        {internalOrgData.orgNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.internal_org.org_name")}>
        {internalOrgData.orgName}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.internal_org.org_type")}>
        {codeList.OrgType
            .filter((item:any) => (item.value===internalOrgData.orgType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("system.internal_org.org_logo_url")}>
        {internalOrgData.orgLogoUrl}
  </Descriptions.Item>


      </Descriptions>

    </>
  );
})
export default InternalOrgDetail;
