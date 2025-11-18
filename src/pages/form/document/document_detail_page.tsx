import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Col, message, notification, Row, Space, Spin} from 'antd'
import {DocumentType} from '@/common/data_type/form/document';
import {useTranslation} from 'react-i18next';
import DocumentDetail from "@/pages/form/document/components/document_detail";
import {listForm} from "@/common/service/form/form";
import {FormType} from "@/common/data_type/form/form";
import FormList from "@/pages/form/form/components/form_list";
import {createPdf, downloadUrl} from "@/common/service/common";
import {PageContainer} from '@ant-design/pro-components';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const DocumentDetailPage: React.FC = (() => {
  const {documentId} = useParams<{ documentId: string }>()
  const [documentData, setDocumentData] = useState<DocumentType>();
  const [formList, setFormList] = useState<FormType[]>([])
  const [activeKey, setActiveKey] = useState("basic")
  const {t} = useTranslation();
  const [spinning, setSpinning] = useState(false);

  const navigate = useNavigate();
  const onGetData = (data: DocumentType) => {
    setDocumentData(data)
  }

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, title: string, message: string
    ) => {
      api[type]({
        message: title !== "" ? title : '处理出错',
        description:
        message,
      });
    }
  ;
  const handleCloseWindow = () => {
    window.close()
  }
  useEffect(() => {
      if (documentId && documentId !== "" && documentId !== "0") {
        listForm({documentId}).then((response) => {
          if (response.data && response.data) {
            const formList = response.data
            setFormList(formList)
          }
        })
      }
    }, [documentId]
  )
  let printedCount = 0;

  function doCreatePdf(formList: FormType[]) {
    const form = formList[printedCount]
    let params = ({
      pageName: form.formName,
      url: location.protocol + "//" + location.host + location.pathname + "/#/printForm/" + form.formId,
      index: printedCount
    });
    console.debug("开始打印Form", printedCount, form, params)
    return createPdf(params).then((res) => {
      printedCount = printedCount + 1
      if (res && res.indexOf("http") === -1) {
        console.debug("为表单【" + form.formName + "】创建PDF文件失败", res, printedCount, form)
        message.error("为表单【" + form.formName + "】创建PDF文件失败")
      } else {
        console.debug("打印Form成功", printedCount, form)
        downloadUrl(res, form.formName + ".pdf")
      }
      if (printedCount === formList.length) {
        setSpinning(false);
      } else {
        return doCreatePdf(formList)
      }
    }).catch((err) => {
      printedCount = printedCount + 1;
      console.debug("为表单【" + form.formName + "】创建PDF文件失败", err, printedCount, form)
      message.error("为表单【" + form.formName + "】创建PDF文件失败, " + err)
      if (printedCount === formList.length) {
        setSpinning(false);
      } else {
        return doCreatePdf(formList)
      }
    });
  }

  function onCreatePdfs() {
    setSpinning(true);
    console.debug("开始打印Document", documentData)
    printedCount = 0;
    // const params = {
    //   pages: [],
    //   returnFileType: "pdf",
    //   fileName: documentData?.documentNo
    // }
    doCreatePdf(formList).then((res) => {
      if (printedCount === formList.length) {
        setSpinning(false);
      }
    })
    // console.debug("onCreatePdfs", params)
    // createPdfs(params).then((response) => {
    //   setSpinning(false);
    //   if (response && response.indexOf("http") === -1) {
    //     message.error("创建PDF文件失败")
    //     return
    //   }
    //   openNotificationWithIcon("success", "创建PDF成功", response)
    //   downloadUrl(response, documentData?.documentNo + ".pdf")
    // }).catch((e) => {
    //   console.debug("创建PDF失败", e)
    //   openNotificationWithIcon("error", "创建PDF失败", e)
    // })
  }

  return (
    <PageContainer>
      <Card
        title={documentData ? "[" + documentData.templateNo + "] " + documentData.templateName : ""}
        bordered={true}>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <DocumentDetail
              style={"basic"}
              documentId={documentId}
              isOpen={true}
              onGetData={onGetData}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{
          marginTop: "50px"
        }}>
          {
            documentData ?
              <FormList documentId={documentId} documentData={documentData} style={"basic"} showButtons={[""]}>
              </FormList> : <></>
          }

        </Row>
        <Space>
          <Button htmlType="button"
                  onClick={handleCloseWindow}
                  style={{marginLeft: 8}}>
            {t("common.button.close")}
          </Button>
          {documentData && documentData.fillinStatus === "已完成" ? <>
            <Button htmlType="button"
                    onClick={onCreatePdfs}
                    id={"print_page"}
                    className={"hide-on-print"}
                    style={{marginLeft: 8}}>
              {t("common.button.create_pdf")}
            </Button>
          </> : <></>}

        </Space>
      </Card>
      <Spin spinning={spinning} fullscreen/>
    </PageContainer>
  );
})

export default DocumentDetailPage;
