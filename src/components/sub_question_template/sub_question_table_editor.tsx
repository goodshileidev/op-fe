import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SubQuestionType} from '@/common/data_type/template/sub_question'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ISubQuestionTableEditorProps {
  subQuestionList: SubQuestionType[]
  onUpdate: any
}

const SubQuestionTableEditor: React.FC<ISubQuestionTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const subQuestionList = props.subQuestionList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete subQuestionList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
    {
      title: t("template.sub_question.title"),
      key: "title",
      componentType: "text",
      dataIndex: "title",
      render: (text: string, row: SubQuestionType, index: number) => (
        <Input placeholder={t("template.sub_question.title")}
               value={row.title}
        />
      ),
      className: "column-title  text_center ",
    },
    {
      title: t("template.sub_question.html"),
      key: "html",
      componentType: "richedit",
      dataIndex: "html",
      render: (text: string, row: SubQuestionType, index: number) => (
        <ReactQuill theme="snow"
                    style={{
                      height: 300,
                      marginBottom: 60
                    }}
                    value={row.html}
        />
      ),
      className: " text_center ",
    },

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: SubQuestionType, index: number) => (
        <Space size="middle">
          <Popconfirm
            title={t("common.row_delete_title")}
            description={t("common.row_delete_description")}
            onConfirm={(e) => confirm(e, row, index)}
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
    },
  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.sub_question')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: SubQuestionType = {}
            newRow.subQuestionId = uuid()
            subQuestionList.push(newRow)
          }}>
            {t("common.button.add")}
          </Button>
        </div>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.subQuestionList}
            rowKey="idx"/>
        </>
      </Card>
    </div>
  )
})

export default SubQuestionTableEditor;

