import React, {useEffect, useState} from "react";
import {FormType} from "@/common/data_type/form/form";
import {Table, TableProps} from "antd";
import {searchForm} from "@/common/service/form/form";
import {SubQuestionType} from "@/common/data_type/template/sub_question";
import {t} from "i18next";

interface IDocumentFormListProps {
  documentId: string
  onSelected: any,
  selectedRowKeys: any
  onGetAllRows: any
}

const DocumentFormList: React.FC<IDocumentFormListProps> = ((props) => {
  const [formList, setFormList] = useState<[]>([]);
  const [selectedFormUuidList, setSelectedFormUuidList] = useState<string[]>([]);
  const [selectedFormList, setSelectedFormList] = useState<string[]>([]);

  const fetchFormList = async (params: any = {}) => {
    params.pageNo = 1
    params.pageSize = 10000
    params.displayPositionCondition = "2"
    const response = await searchForm(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    return records
  }


  useEffect(() => {
    if (!props.documentId) {
      return
    }
    let isMounted = true;
    (async () => {
      const formList = await fetchFormList({documentId: props.documentId})
      if (isMounted) {
        setFormList(formList)
        const formUuidList = []
        for (const form of formList) {
          if (props.selectedRowKeys.includes(form.formUuid)) {
            formUuidList.push(form.formUuid)
          }
        }
        setSelectedFormUuidList(formUuidList)
        props.onGetAllRows && props.onGetAllRows(formList)
        console.debug("formList", formList, props.selectedRowKeys, formUuidList)
      }
    })();
    return () => {
      isMounted = false
    };

  }, [props.documentId])


  const formColumns: TableProps<FormType>['columns'] = []

  formColumns.push({
    align: "center",
    title: t("form.form.form_name"),
    key: "form_name",
    dataIndex: "formName",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })

  formColumns.push({
    align: "left",
    title: "分享链接",
    key: "access_link",
    dataIndex: "access_link",
    width: "400px",
    render: (text: string, row: SubQuestionType, index: number) => (
      <a href={location.protocol + "//" + location.host + location.pathname + "#/viewForm/" + row.formUuid}
         target={"_blank"}>
        {location.protocol}//{location.host + location.pathname} #/viewForm/{row.formUuid}
      </a>)
  })

  const rowSelection: TableProps<FormType>['rowSelection'] = {
    hideSelectAll: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: FormType[]) => {
      console.log(`onChange-selectedRowKeys: ${selectedRowKeys}`, "length:" + selectedRowKeys.length, 'selectedRows: ', selectedRows, "length:" + selectedRows.length);
    },
    getCheckboxProps: (formData: FormType) => ({
      name: formData.formUuid,
    }),
    onSelect: function (formData: FormType, selected, selectedRows, nativeEvent) {
      const uuidList = [...selectedFormUuidList]
      // const formList = [...selectedFormList]

      if (selected) {
        uuidList.push(formData.formUuid)
        // formList.push(formData)
      } else {
        const index = uuidList.indexOf(formData.formUuid);
        uuidList.splice(index, 1) //???
        // formList.splice(index, 1) //???
      }
      setSelectedFormUuidList(uuidList)
      setSelectedFormList(selectedRows)
      console.debug("fonSelect->ormUuidList, selectedFormUUID:", formData.formUuid, "current-FormUuidList", selectedFormUuidList, "new-FormUuidList", uuidList)
      props.onSelected && props.onSelected(props.documentId, uuidList, formData)
    },
    selectedRowKeys: props.selectedRowKeys
  }

  return <Table<FormType>
    style={{
      width: "100%"
    }}
    dataSource={formList}
    tableKey={"form_table"}
    columns={formColumns}
    pagination={false}
    rowSelection={rowSelection}
    rowKey="formUuid"/>
})
export default DocumentFormList;
