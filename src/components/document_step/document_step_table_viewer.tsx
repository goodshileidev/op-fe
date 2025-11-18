import React, {useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid'
import {Space, Modal, Popconfirm, Table, Tag, TableProps, Button, Select, RadioGroup, CheckboxGroup, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {Link} from 'umi'
import {DocumentStepType} from '@/common/data_type/system/document_step'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IDocumentStepTableViewerProps {
  fieldName: string
  fieldLabel: string
  documentStepList: DocumentStepType[]
}

const DocumentStepTableViewer: React.FC<IDocumentStepTableViewerProps> = ((props) => {
  const { t } = useTranslation();
  const documentStepList = props.documentStepList
  console.debug("DocumentStepTableViewer->documentStepList", props.documentStepList)
  const [codeListFormTemplate, setCodeListFormTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListFormTemplate({}).then((FormTemplateCodeList)=>{
      setCodeListFormTemplate(FormTemplateCodeList)
      console.debug("FormTemplateCodeList", FormTemplateCodeList)
    })
  }, [])



  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
      console.log("PopconfirmProps['onConfirm']", row, index);
      delete documentStepList[index]
      message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


    columns.push({align: "center",
      title: t("system.document_step.form_no"),
      key: "form_no",
      dataIndex:"formName",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.document_step.fillin_order"),
      key: "fillin_order",
      dataIndex:"fillinOrder",
      className:" text_center ",
    })

  const operateColumn= {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: DocumentStepType, index: number) => (
        <Space size="middle">
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e)=>confirm(e, row, index)}
                onCancel={cancel}
                okText={t("common.yes")}
                cancelText={t("common.no")}
              >
              <Button icon={<DeleteFilled/>} type="link">
                {t("common.button.delete")}
              </Button>
           </Popconfirm>
        </Space>
      ),
    }

  return (
      <div>
        <Card title={t("common.title.list",{'entity': props.fieldLabel})} bordered={true}>
          <>
            <Table
              style={{
                width: "100%"
              }}
              columns={columns}
              dataSource={props.documentStepList}
              rowKey="documentStepId"/>
          </>
        </Card>
      </div>
   )
})

export default DocumentStepTableViewer;

