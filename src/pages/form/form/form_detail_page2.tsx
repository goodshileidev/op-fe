import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Image, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormDetailWrapper from "@/pages/form/form/components/form_detail_wrapper";
import {FormType} from "@/common/data_type/form/form";
import 'quill-better-table/dist/quill-better-table.css';


const FormDetailPage: React.FC = (() => {
  const {formId} = useParams<{ formId: string | any }>()
  const [formData, setFormData] = useState<FormType>({})
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/form/form/form_table/", {replace: true});
  }
  const handleCloseWindow = () => {
    window.close()
  }
  const onGetData = (data: FormType) => {
    setFormData(data)
  }
  // formData ? "[" + formData.formNo + "] " + formData.formName : ""
  return (
    <Card
      title={""} bordered={true}>
      <FormDetailWrapper
        showBasic={true}
        formId={formId}
        onGetData={onGetData}
        style={"simple"}
      />
      <div style={{
        textAlign: "center"
      }}>
        {formData && formData.signatureImageUrl ?
          <Image
            width={800}
            // src={location.protocol + "//" + location.host + location.pathname +  "/api/file/download?fileID=" + formData.formId}
            src={formData.signatureImageUrl}
          /> : <></>
        }
      </div>
      <Space>
        <Button htmlType="button"
                id={"return_to_table"}
                onClick={handleCloseWindow}
                style={{marginLeft: 8}}>
          {t("common.button.close")}
        </Button>

      </Space>
    </Card>
  );
})

export default FormDetailPage;
