import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormDetail from "@/pages/form/form/components/form_detail";
import FormSectionDetailWrapper from "@/pages/form/form_section/components/form_section_detail_wrapper";
import {FormSectionType} from "@/common/data_type/form/form_section";
import {FormType} from "@/common/data_type/form/form";
import {listFormSection} from "@/common/service/form/form_section";

const FormEditPage: React.FC = (() => {
  const {formId} = useParams<{ formId: string }>()
  const isEdit = (formId !== undefined && formId !== '0');
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [currentFormSectionId, setCurrentFormSectionId] = useState('');
  const [currentFormSection, setCurrentFormSection] = useState<FormSectionType | any>({});
  const [formSectionList, setFormSectionList] = useState<FormSectionType[]>([]);
  const [formSectionIdList, setFormSectionIdList] = useState<string[]>([])
  const [formData, setFormData] = useState<FormType>({})

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = () => {
    navigate("/form/form/form_table/", {replace: true});
  }

  const handleBack = () => {
    navigate("/form/form/form_table/", {replace: true});
  }
  const onGetData = (data: FormType) => {
    setFormData(data)
  }
  const handleCloseWindow = () => {
    window.close()
  }

  useEffect(() => {
    fetchSectionList()
  }, [formId]);

  const fetchSectionList = () => {
    const formSectionList = []
    const formSectionIdList = []
    listFormSection({formId: formId}).then((res) => {
      setFormSectionList(res.data)
      for (const idx in res.data) {
        const formSection = res.data[idx]
        formSectionIdList.push(`${formSection.formSectionId}`)
        formSectionList.push(formSection)
      }
      setFormSectionIdList(formSectionIdList);
      setFormSectionList(formSectionList)
      console.debug("useEffect", res, formSectionIdList, formSectionList)
    })
  }

  return (
    <>
      <Card
        title={isEdit ? t("common.title.edit", {'entity': t('form.form')}) : t("common.title.add", {'entity': t('form.form')})}
        bordered={false} style={{width: "80%"}}>
        <FormDetail
          formId={formId}
          isOpen={true}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          onGetData={onGetData}
          style={{
            paddingBottom: 50
          }}
        />
        <Space>
          <Button type="primary" htmlType="submit"
                  onClick={handleSubmit}>
            {t("common.button.save")}
          </Button>
          <Button htmlType="button"
                  onClick={handleCloseWindow}
                  style={{marginLeft: 8}}>
            {t("common.button.close")}
          </Button>
        </Space>
        <div style={{width: '100%'}}>
          {
            formSectionList.map((formSection) => {
                const formSectionId = `${formSection.formSectionId}`
                const FormSectionDetailWrapperKey = "FormSectionDetailWrapperKey_" + formSectionId;
                console.debug("render formSection", formSection)
                return (
                  <div style={{width: '100%'}}>
                    <FormSectionDetailWrapper
                      key={FormSectionDetailWrapperKey}
                      formId={formId}
                      form={formData}
                      onUpdate={fetchSectionList}
                      formSectionId={formSectionId}>
                    </FormSectionDetailWrapper>
                    <br/>
                  </div>
                )
              }
            )
          }
        </div>
      </Card>
    </>
  )
})

export default FormEditPage;
