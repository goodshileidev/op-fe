import React, {useState} from 'react'
import {useParams} from 'umi'
import {Button, message, Spin} from 'antd';
import {useTranslation} from 'react-i18next';
import FormDetailWrapper from "@/pages/form/form/components/form_detail_wrapper";
import {FormType} from "@/common/data_type/form/form";
import {createPdf, downloadUrl} from "@/common/service/common";
import 'quill-better-table/dist/quill-better-table.css';
import 'react-quill/dist/quill.snow.css';

const FormPrintPage: React.FC = (() => {
  const {formId} = useParams<{ formId: string | any }>()
  console.debug("formId", formId)
  const [formData, setFormData] = useState<FormType>({})
  const [renderCompleted, setRenderCompleted] = useState<boolean>(false)
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const onGetData = (data: FormType) => {
    setFormData(data)
    setTimeout(() => {
      setRenderCompleted(true)
    }, 3 * 1000)
  }

  function onCreatePdf() {
    const params = {
      pageName: formData?.formName,
      url: location.protocol + "//" + location.host + location.pathname + "/#/printForm2/" + formData.formId
    }
    console.debug("onCreatePdf", params)
    setLoading(true)
    createPdf(params).then((response) => {
      setLoading(false)
      if (response && response.indexOf("http") === -1) {
        message.error("创建PDF文件失败")
        return
      }
      downloadUrl(response, formData?.formName + ".pdf")
    }).catch((e) => {
      setLoading(false)
      message.error("创建PDF文件失败")
    })
  }

  return <>
    <Spin spinning={loading}>
      <FormDetailWrapper
        columnCount={2}
        showBasic={true}
        formId={formId}
        onGetData={onGetData}
        style={"simple"}
      />
    </Spin>
    {
      renderCompleted ? <>
        <Button htmlType="button"
                id={"return_to_table"}
                onClick={() => window.close()}
                className={"hide-on-print"}
                style={{marginLeft: 8}}>
          {t("common.button.close")}
        </Button>
        <Button htmlType="button"

                onClick={() => window.print()}
                id={"print_page"}
                className={"hide-on-print"}
                style={{marginLeft: 8}}>
          {t("common.button.print")}
        </Button>
        <Button htmlType="button"
                onClick={onCreatePdf}
                id={"print_page"}
                className={"hide-on-print"}
                style={{marginLeft: 8}}>
          {t("common.button.create_pdf")}
        </Button>
      </> : <></>
    }
  </>
})

export default FormPrintPage;
