import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {UserType} from '@/common/data_type/system/user'
import {getUser} from '@/common/service/system/user'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface IUserDetailProps {
  userId: string
  isOpen: boolean
}

const UserDetail: React.FC<IUserDetailProps> = ((props) => {
  const userId = props.userId
  const [userData, setUserData] = useState<UserType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getUserDetail = async (userId: string) => {
    setLoading(true);
    const response = await getUser(userId);
    setUserData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (userId && userId!=="" && userId!=="0") {
      getUserDetail(userId)
    }
  }, [userId, isOpen])

  //if (userData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("system.user.user_name")}>
        {userData.userName}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.employee_number")}>
        {userData.employeeNumber}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.user_type")}>
        {codeList.UserType
            .filter((item:any) => (item.value===userData.userType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("system.user.signature_file")}>
        {userData.signatureFile}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.avatar_url")}>
        {userData.avatarUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.signature_image_url")}>
        {userData.signatureImageUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.stamp_image_url")}>
        {userData.stampImageUrl}
  </Descriptions.Item>

  <Descriptions.Item label={t("system.user.user_status")}>
        {codeList.UserStatus
            .filter((item:any) => (item.value===userData.userStatus))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>



      </Descriptions>

    </>
  );
})
export default UserDetail;
