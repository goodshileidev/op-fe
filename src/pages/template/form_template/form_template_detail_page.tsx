import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, message, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormTemplateDetail from './components/form_template_detail'
import {cancelPublishFormTemplate, publishFormTemplate} from "@/common/service/template/form_template";
import {FormTemplateType} from "@/common/data_type/template/form_template";

const FormTemplateDetailPage: React.FC = (() => {
  const {formTemplateId} = useParams<{ formTemplateId: string }>()
  const FormTemplateDetailKey = "FormTemplateDetailKey_" + {formTemplateId};
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [formTemplateData, setFormTemplateData] = useState<FormTemplateType>({})
  const handleBack = () => {
    navigate("/template/form_template/form_template_table/", {replace: true});
  }

  const onGetData = (data: FormTemplateType) => {
    setFormTemplateData(data)
  }
  const handlePublish = () => {
    console.debug("handlePublish", formTemplateId)
    publishFormTemplate({formTemplateId: formTemplateId}).then((response) => {
      message.success(t("common.execute_success", {'method': t('template.form_template.publish')}));
    })
  }

  const handleCancelPublish = () => {
    console.debug("handleCancelPublish", formTemplateData)
    cancelPublishFormTemplate({
      formTemplateId: formTemplateId,
      formTemplateNo: formTemplateData.formTemplateNo
    }).then((response) => {
      if (!response || response.code !== 200) {
        message.error(response.msg);
      } else {
        message.success(t("common.execute_success", {'method': t('template.form_template.publish')}));
        setFormTemplateData({...formTemplateData, publishStatus: '1'})
      }
    })
  }

  return (
    <>
      <Card
        title={t("common.title.detail", {'entity': formTemplateData ? "[" + formTemplateData.formTemplateNo + "] " + formTemplateData.formTemplateName : ""})}
        bordered={true}>
        <FormTemplateDetail key={FormTemplateDetailKey} formTemplateId={formTemplateId} isOpen={true}/>
      </Card>
      <Space>
        <Button htmlType="button"
                onClick={handleBack}
                style={{marginLeft: 8}}>
          {t("common.button.back")}
        </Button>
        {formTemplateData.publishStatus === "1" ? (<>
              <Button htmlType="button" onClick={handlePublish} style={{marginLeft: 8}}>
                {t("template.form_template.publish")}
              </Button></>
          ) :
          <Button htmlType="button" onClick={handleCancelPublish} style={{marginLeft: 8}}>
            {t("template.form_template.cancel_publish")}
          </Button>}
      </Space>
    </>
  );
})

export default FormTemplateDetailPage;
