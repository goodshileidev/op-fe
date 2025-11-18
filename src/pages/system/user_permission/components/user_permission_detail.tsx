import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps} from 'antd'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {getUserPermission} from '@/common/service/system/user_permission'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';


interface IUserPermissionDetailProps {
  userPermissionId: string
  isOpen: boolean
  onGetData: any
}

const UserPermissionDetail: React.FC<IUserPermissionDetailProps> = ((props) => {
  const userPermissionId = props.userPermissionId
  const [userPermissionData, setUserPermissionData] = useState<UserPermissionType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getUserPermissionDetail = async (userPermissionId: string) => {
    setLoading(true);
    const response = await getUserPermission(userPermissionId);
    const data = response.data ?? null;
    setUserPermissionData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userPermissionId && userPermissionId !== "" && userPermissionId !== "0") {
      getUserPermissionDetail(userPermissionId)
    }
  }, [userPermissionId, isOpen])

  //if (userPermissionData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  const createBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'userName', 'label': t('system.user_permission.user_name'), 'children': <p>
          {userPermissionData.userName}
        </p>
      }))

    items.push((
      {
        'key': 'bizType', 'label': t('system.user_permission.user_biz_type'), 'children': <p>
          {codeList.UserBizType
            .filter((item: any) => (item.value === userPermissionData.bizType))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    items.push((
      {
        'key': 'turnGroup', 'label': t('system.user_permission.turn_group'), 'children': <p>
          {codeList.TurnGroup
            .filter((item: any) => (item.value === userPermissionData.turnGroup))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'position', 'label': t('system.user_permission.position'), 'children': <p>
          {codeList.BizPosition
            .filter((item: any) => (item.value === userPermissionData.position))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))


    items.push((
      {
        'key': 'title', 'label': t('system.user_permission.title'), 'children': <p>
          {codeList.BizTitle
            .filter((item: any) => (item.value === userPermissionData.title))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
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
export default UserPermissionDetail;
