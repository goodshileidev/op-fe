import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row, DescriptionsProps} from 'antd'
import {UserMenuType} from '@/common/data_type/system/user_menu'
import {getUserMenu} from '@/common/service/system/user_menu'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {useTranslation} from 'react-i18next';


interface IUserMenuDetailProps {
  userMenuId: string
  userMenuData?: UserMenuType
  isOpen: boolean
  onGetData: any
}

const UserMenuDetail: React.FC<IUserMenuDetailProps> = ((props) => {
  const userMenuId = props.userMenuId
  const [userMenuData, setUserMenuData] = useState<UserMenuType | any>(props.userMenuData)
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getUserMenuDetail = async (userMenuId: string) => {
    setLoading(true);
    const response = await getUserMenu(userMenuId);
    const data = response.data ?? null;
    setUserMenuData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.userMenuData) {
      if (userMenuId && userMenuId!=="" && userMenuId!=="0") {
        getUserMenuDetail(userMenuId)
      }
    }
  }, [userMenuId, props.userMenuData, isOpen])

  //if (userMenuData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

const createBasicItems= () =>{
  const items: DescriptionsProps['items'] = []

    items.push((
{'key': 'userId','label': t('system.user_menu.user_id'),'children':   <p>
    {userMenuData.userId}
  </p>
}))

    items.push((
{'key': 'menuCode','label': t('system.user_menu.menu_code'),'children':   <p>
        {codeList.MenuCode
            .filter((item:any) => (userMenuData && userMenuData.menuCode) && userMenuData.menuCode).includes(item.value))
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
export default UserMenuDetail;
