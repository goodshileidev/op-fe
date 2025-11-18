import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {FormVarConfigType} from '@/common/data_type/template/form_var_config'
import {renderCodeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface IFormVarConfigTableViewerProps {
  formVarConfigList: FormVarConfigType[]
}

const FormVarConfigTableViewer: React.FC<IFormVarConfigTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const formVarConfigList = props.formVarConfigList
  console.debug("FormVarConfigTableViewer->formVarConfigList", props.formVarConfigList)


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete formVarConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


  columns.push({align: "center",
    title: t("template.form_var_config.var_name"),
    key: "var_name",
    dataIndex: "varName",
    className: " text_center ",
  })

  // columns.push({align: "center",
  //   title: t("template.form_var_config.var_key"),
  //   key: "var_key",
  //   dataIndex: "varKey",
  //   className: " text_center ",
  // })

  // columns.push({align: "center",
  //   title: t("template.form_var_config.var_data_type"),
  //   key: "var_data_type",
  //   dataIndex: "varDataType",
  //   render: (index, row) => (
  //     <span>
  //         {renderCodeList(row.varDataType, 'VarDataType')}
  //        </span>
  //   ),
  //   className: " text_center ",
  // })

  columns.push({align: "center",
    title: t("template.form_var_config.var_input_type"),
    key: "var_input_type",
    dataIndex: "varInputType",
    render: (index, row) => (
      <span>
          {renderCodeList(row.varInputType, 'VarInputType')}
         </span>
    ),
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("template.form_var_config.option_values"),
    key: "option_values",
    dataIndex: "optionValues",
    className: " text_center ",
  })
  columns.push({align: "center",
    title: t("template.form_var_config.default_value"),
    key: "default_value",
    dataIndex: "varDefaultValue",
    className: " text_center ",
  })
  const operateColumn = {
    title: t("common.button.operate"),
    align: "center",key: 'action',
    render: (text: string, row: FormVarConfigType, index: number) => (
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
      <Card title={t("common.title.list", {'entity': t('template.form_var_config')})} bordered={true}>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.formVarConfigList}
            rowKey="formVarConfigId"/>
        </>
      </Card>
    </div>
  )
})

export default FormVarConfigTableViewer;

