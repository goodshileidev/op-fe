import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Col, Image, message, Row, Space, Spin, Upload, UploadFile, UploadProps} from 'antd';
import {useTranslation} from 'react-i18next';
import FormDetailWrapper from "@/pages/form/form/components/form_detail_wrapper";
import {FormType} from "@/common/data_type/form/form";
import {InboxOutlined} from '@ant-design/icons';
import {downloadUrl} from "@/common/service/common";
import 'quill-better-table/dist/quill-better-table.css';
import {doCreatePdf, getVarValueMap} from "@/pages/form/form/form_utils";
import {getFormByUUID} from "@/common/service/form/form";
import 'react-quill/dist/quill.snow.css';

const {Dragger} = Upload;

const FormDetailPage: React.FC = (() => {
  const {formUuid} = useParams<{ formUuid: string | any }>()
  console.debug("formUuid", formUuid)
  const [formData, setFormData] = useState<FormType>(null)
  const [formId, setFormId] = useState<string>("")
  const [verified, setVerified] = useState<boolean>(false)
  const {t} = useTranslation();
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploadedFileList, setUploadedFileList] = useState<any>([])
  const [signatureImageUrl, setSignatureImageUrl] = useState<string>("")
  const [uploadUrl, setUploadUrl] = useState<string>("")
  const [pdfUrl, setPdfUrl] = useState<string>(null)
  const pdfUrlRef = useRef(pdfUrl)


  useEffect(() => {
    pdfUrlRef.current = pdfUrl
  }, [pdfUrl]);


  let downloadPdfInterval: any = null;

  function onDownloadPdf() {
    console.debug("download pdf, ", pdfUrl)
    if (downloadPdfInterval !== null) {
      message.info("PDF正在生成中，请稍后");
      console.debug("PDF正在生成中", downloadPdfInterval)
      return;
    }
    if (!pdfUrl || pdfUrl === "") {
      message.info("PDF正在生成中，请稍后");
      downloadPdfInterval = setInterval(() => {
        const pdfUrl = pdfUrlRef.current
        if (pdfUrl && pdfUrl !== "") {
          console.debug("download pdf, 开始下载", pdfUrl, downloadPdfInterval)
          downloadUrl(pdfUrl, formData?.formName + ".pdf")
          clearInterval(downloadPdfInterval)
          downloadPdfInterval = null;
        } else {
          console.debug("download pdf, 等待1秒后重试", downloadPdfInterval)
        }
      }, 1000)
    } else {
      if (downloadPdfInterval !== null) {
        clearInterval(downloadPdfInterval)
        downloadPdfInterval = null;
      }
      console.debug("download pdf ", pdfUrl, downloadPdfInterval)
      downloadUrl(pdfUrl, formData?.formName + ".pdf")
    }
  }

  const onCreatePdfStart = (formData: FormType, showLoading: boolean) => {
    setSpinning(true);
  }

  const onCreatePdfFinish = (formData: FormType, url: string, autoDownload = false) => {
    setSpinning(false);
    setPdfUrl(url)
    if (autoDownload) {
      downloadUrl(url, formData?.formName + ".pdf")
    }
  }

  const onCreatedPdfFail = (FormData: FormType) => {
    setSpinning(false)
  }

  function setFileListByData(data) {
    if (data.varValueList) {
      let {updateTime, createdPdfTime, pdfUrl, uploadedFileList} = getVarValueMap(data);
      setUploadedFileList(uploadedFileList)
      const now = new Date().getTime()
      // PDF超出5天，重新创建
      if (createdPdfTime && updateTime < createdPdfTime && (now < createdPdfTime + 1000 * 60 * 60 * 24 * 5) && pdfUrl && pdfUrl.indexOf("http") !== -1) {
        setPdfUrl(pdfUrl)
      } else {
        setPdfUrl(null)
        doCreatePdf(data, false, false, onCreatePdfStart, onCreatePdfFinish, onCreatedPdfFail)
      }
    } else {
      setPdfUrl(null)
      doCreatePdf(data, false, false, onCreatePdfStart, onCreatePdfFinish, onCreatedPdfFail)
    }
  }

  const onUpdated = (updated, varData) => {
    console.debug("onUpdated", updated, varData)
    if (updated) {
      // 清除当前pdfurl
      setPdfUrl(null)
      doCreatePdf(formData, false, false, onCreatePdfStart, onCreatePdfFinish, onCreatedPdfFail)
    }
  }

  const onGetData = (data: FormType) => {
    setFormData(data)
    setSignatureImageUrl(data.signatureImageUrl)
    console.debug("onGetData", data)
    setFileListByData(data)
  }
  const handleCloseWindow = () => {
    window.close()
  }

  function requestGetForm(formUuid) {
    getFormByUUID(formUuid).then((response) => {
      if (response && response.code === 200) {
        setVerified(true)
        setFormId(response.data.formId)
        setFormData(response.data)
        const isDev = location.hostname.indexOf("wanhua") === -1
        const uploadUrl = location.protocol + "//" + location.hostname.replace("wanhua", "gw") + (isDev ? ":8080" : "") + (isDev || location.pathname === "/" || location.pathname === "//" || location.pathname === "" ? "" : "/form-backend") + "/api/file/uploadFormSignatureFile?formId=" + response.data.formId
        console.debug("uploadUrl", location.pathname, uploadUrl)
        setUploadUrl(uploadUrl)
        setFileListByData(response.data)
      }
    })
  }

  // 这里处理调佣后端上传图片的处理逻辑
  const handleFileChange: UploadProps['onChange'] = ({fileList: newFileList, file: newFile, event}) => {
    setFileList(newFileList); // 保证所有状态同步到 Upload 内，否则会无法触发done等回调
    if (newFile.status === 'uploading') {
      console.debug("handleFileChange->uploading", event, newFile)
    } else if (newFile.status === 'error') {
      console.debug("handleFileChange->failed", event, newFile)
    } else if (newFile.status === 'done') {
      console.debug(newFileList)
      setFileList(newFileList.slice(-1)); // 只保留一个文件
      console.debug("handleFileChange->done", event, newFile, newFileList)
      // updateForm({formId: formId, signatureImageUrl: newFile.response.data}).then((response) => {
      //   formData.signatureImageUrl = newFile.response.data;
      //   setFormData(formData)
      // })
      setSignatureImageUrl(newFile.response.data)
      message.success("上传文件成功")
      requestGetForm(formUuid)
      setFileList([])
      // userDocumentForm.setFieldValue('fileName', newFile.name);
      // userDocumentForm.setFieldValue('filePath', newFile.response.data[0].fileId);
    }
    // setFileList(newFileList);
  }

  useEffect(() => {
    console.debug("formUuid", formUuid)
    requestGetForm(formUuid)
  }, [formUuid]);


  // formData ? "[" + formData.formNo + "] " + formData.formName : ""
  setTimeout(() => {
    const varContainerList = document.getElementsByTagName("b")
    for (let i = 0; i < varContainerList.length; i++) {
      let element = varContainerList[i];
      element.onclick = (event) => {
        console.debug("var-container clicked", element, event)
      }
    }
  }, 2);
  return <>
    {formId && formData ? <>
        <Card
          title={""} bordered={true}>
          <FormDetailWrapper
            showBasic={true}
            formId={formId}
            onGetData={onGetData}
            style={"simple"}
          />
          <Space className={"hide-on-print"}>
            <Button htmlType="button"
                    onClick={handleCloseWindow}
                    style={{marginLeft: 8}}>
              {t("common.button.close")}
            </Button>
            <Button htmlType="button"
                    onClick={onDownloadPdf}
                    id={"print_page"}
                    className={"hide-on-print"}
                    style={{marginLeft: 8}}>
              {t("common.button.create_pdf")}
            </Button>
            <Spin spinning={spinning} fullscreen/>
          </Space>
        </Card>
        <Row>
          <Col>
            <Card className={"hide-on-print"} title={t("common.uploaded_file")} bordered={false} style={{
              textAlign: "center"
            }}>
              {formData ?
                <Image
                  width={800}
                  height={400}
                  // src={location.protocol + "//" + location.host + location.pathname +  "/api/file/download?fileID=" + formData.formId}
                  src={formData.signatureImageUrl}
                />
                : <></>}
            </Card>
          </Col>
          <Col>
            <Card className={"hide-on-print"} title={t("common.upload_file")} bordered={false} style={{
              textAlign: "center"
            }}>
              <Dragger
                key={"dragger_key"}
                maxCount={10} // 最多只能上传一个文件
                name={"file"}
                multiple={false}
                fileList={fileList}
                style={{
                  width: 400
                }}
                action={uploadUrl}
                onChange={handleFileChange}
                onDrop={(e) => {
                  console.log('Dropped files', e.dataTransfer.files);
                }}
                beforeUpload={() => {
                  if (fileList.length >= 10) {
                    message.error(t("common.max_1_file"));
                    return Upload.LIST_IGNORE; // 阻止新文件上传
                  }
                  return true; // 允许文件上传
                }}
              >
                <div>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                  </p>
                  <p className="ant-upload-text">{t("common.click_to_upload")}</p>
                </div>
              </Dragger>
            </Card>
          </Col>
        </Row>
      </>
      : <></>}
  </>
})

export default FormDetailPage;
