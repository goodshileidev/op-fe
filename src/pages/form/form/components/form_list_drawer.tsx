import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormType} from '@/common/data_type/form/form'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormList from './form_list'


interface IFormListDrawerProps {
  isListDrawerOpen?: boolean

  showButtons?:string[]
  onSelect: any
  onClose: any
}

const FormListDrawer: React.FC<IFormListDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isListDrawerOpen
  const { t } = useTranslation();

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.list",{'entity':t('form.form')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }
        >
        <FormList
          isOpen={isOpen}
          onSelect={props.onSelect}
          
          showButtons={props.showButtons}
          />
        </Drawer>
      </div>
    )})

export default FormListDrawer;