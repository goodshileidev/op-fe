import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {getUserHistory} from '@/common/service/system/user_history'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface IUserHistoryDetailProps {
  userHistoryId: string
  isOpen: boolean
}

const UserHistoryDetail: React.FC<IUserHistoryDetailProps> = ((props) => {
  const userHistoryId = props.userHistoryId
  const [userHistoryData, setUserHistoryData] = useState<UserHistoryType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getUserHistoryDetail = async (userHistoryId: string) => {
    setLoading(true);
    const response = await getUserHistory(userHistoryId);
    setUserHistoryData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (userHistoryId && userHistoryId!=="" && userHistoryId!=="0") {
      getUserHistoryDetail(userHistoryId)
    }
  }, [userHistoryId, isOpen])

  //if (userHistoryData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("system.user_history.user_id")}>
        {userHistoryData.userId}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.user_name")}>
        {userHistoryData.userName}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.employee_number")}>
        {userHistoryData.employeeNumber}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.user_type")}>
        {codeList.UserType
            .filter((item:any) => (item.value===userHistoryData.userType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("system.user_history.signature_file")}>
        {userHistoryData.signatureFile}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.avatar_url")}>
        {userHistoryData.avatarUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.password")}>
        {userHistoryData.password}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.signature_image_url")}>
        {userHistoryData.signatureImageUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.stamp_image_url")}>
        {userHistoryData.stampImageUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user_history.user_status")}>
        {codeList.UserStatus
            .filter((item:any) => (item.value===userHistoryData.userStatus))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>



      </Descriptions>

    </>
  );
})
export default UserHistoryDetail;
