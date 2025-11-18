import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {useTranslation} from 'react-i18next';
import FormQuestionEdit from './form_question_edit'


interface IFormQuestionEditDrawerProps {
  isEditDrawerOpen?: boolean
  formQuestionId: string
  formQuestionData?: FormQuestionType

  onClose: any
}

const FormQuestionEditDrawer: React.FC<IFormQuestionEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const formQuestionId = props.formQuestionId
  const isEdit = formQuestionId !== undefined && formQuestionId !== '' && formQuestionId !== '0';

  const {t} = useTranslation();
  let isOpen = props.isEditDrawerOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleClose = () => {
    props.onClose(false)
    return false
  }

  const handleUpdate = (updated: boolean, data: FormQuestionType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
    <div>
      <Drawer
        width={"100%"}
        title={isEdit ? t("common.title.edit", {'entity': t('form.form_question')}) : t("common.title.add", {'entity': t('form.form_question')})}
        open={isOpen}
        onClose={handleClose}
        okType={"primary"}
        extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
            <Button onClick={handleReset}>
              {t("common.button.reset")}
            </Button>
            <Button onClick={handleSubmit} type="primary">
              {t("common.button.save")}
            </Button>
          </Space>
        }
      >
        <FormQuestionEdit
          formQuestionId={formQuestionId}
          formQuestionData={props.formQuestionData}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}

        />
      </Drawer>
    </div>
  )
})
export default FormQuestionEditDrawer;
