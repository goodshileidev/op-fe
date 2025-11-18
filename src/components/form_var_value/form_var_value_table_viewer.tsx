import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {FormVarValueType} from '@/common/data_type/template/form_var_value'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import {renderCodeList} from "@/common/code_list/code_list_static";

interface IFormVarValueTableViewerProps {
  formVarValueList: FormVarValueType[]
}

const FormVarValueTableViewer: React.FC<IFormVarValueTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const formVarValueList = props.formVarValueList
  console.debug("FormVarValueTableViewer->formVarValueList", props.formVarValueList)


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete formVarValueList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


  columns.push({align: "center",
    title: t("template.form_var_value.var_name"),
    key: "var_name",
    dataIndex: "varName",
    className: " text_center ",
  })

  // columns.push({align: "center",
  //   title: t("template.form_var_value.var_key"),
  //   key: "var_key",
  //   dataIndex: "varKey",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("template.form_var_value.var_data_type"),
  //   key: "var_data_type",
  //   dataIndex: "varDataType",
  //   render: (text, row) => (
  //     <span>
  //         {renderCodeList(row.varDataType, 'VarDataType')}
  //        </span>
  //   ),
  //   className: " text_center ",
  // })

  columns.push({align: "center",
    title: t("template.form_var_value.var_input_type"),
    key: "var_input_type",
    dataIndex: "varInputType",
    render: (text, row) => {
      return <span>
          {renderCodeList(row.varInputType, 'VarInputType')}
         </span>
    },
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("template.form_var_value.var_value"),
    key: "var_value",
    dataIndex: "varValue",
    className: " text_center ",
  })

  const operateColumn = {
    title: t("common.button.operate"),
    align: "center",key: 'action',
    render: (text: string, row: FormVarValueType, index: number) => (
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
  }

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.form_var_value')})} bordered={true}>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.formVarValueList}
            rowKey="formVarValueId"/>
        </>
      </Card>
    </div>
  )
})

export default FormVarValueTableViewer;

