import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps, Tabs} from 'antd'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {getFormSection} from '@/common/service/form/form_section'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';


interface IFormSectionDetailProps {
  formSectionId: string
  isOpen: boolean
  onGetData: any
}

const FormSectionDetail: React.FC<IFormSectionDetailProps> = ((props) => {
  const formSectionId = props.formSectionId
  const [formSectionData, setFormSectionData] = useState<FormSectionType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isTableColumnListTableViewerOpen, setIsTableColumnListTableViewerOpen] = useState(false);

  const [isVarConfigListTableViewerOpen, setIsVarConfigListTableViewerOpen] = useState(false);

  const [isVarValueListTableViewerOpen, setIsVarValueListTableViewerOpen] = useState(false);


  const getFormSectionDetail = async (formSectionId: string) => {
    setLoading(true);
    const response = await getFormSection(formSectionId);
    const data = response.data ?? null;
    setFormSectionData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formSectionId && formSectionId !== "" && formSectionId !== "0") {
      getFormSectionDetail(formSectionId)
    }
  }, [formSectionId, isOpen])

  //if (formSectionData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  const createBasicBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'sectionNo', 'label': t('form.form_section.section_no'), 'children': <p>
          {formSectionData.sectionNo}
        </p>
      }))

    items.push((
      {
        'key': 'sectionName', 'label': t('form.form_section.section_name'), 'children': <p>
          {formSectionData.sectionName}
        </p>
      }))
    //
    // items.push((
    //   {
    //     'key': 'mainSubSectionType', 'label': t('form.form_section.main_sub_section_type'), 'children': <p>
    //       {codeList.MainSubSectionType
    //         .filter((item: any) => (item.value === formSectionData.mainSubSectionType))
    //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
    //     </p>
    //
    //   }))

    items.push((
      {
        'key': 'sectionType', 'label': t('form.form_section.section_type'), 'children': <p>
          {formSectionData.subSectionType}
        </p>
      }))

    // items.push((
    //   {
    //     'key': 'fillinStatus', 'label': t('form.form_section.fillin_status'), 'children': <p>
    //       {codeList.FillinStatus
    //         .filter((item: any) => (item.value === formSectionData.fillinStatus))
    //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
    //     </p>
    //
    //   }))
    return items;
  }
  const createBasicComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'summary', 'label': t('form.form_section.summary'), 'children': <p>
          {formSectionData.summary}
        </p>
      }))

    items.push((
      {
        'key': 'detailedContent', 'label': t('form.form_section.detailed_content'), 'children': <p>
          {formSectionData.detailedContent}
        </p>
      }))
    return items;
  }
  const createFlowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'viewerRoleList', 'label': t('form.form_section.viewer_role_list'), 'children': <p>
          {codeList.Role
            .filter((item: any) => (formSectionData.viewerRoleList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'editorRoleList', 'label': t('form.form_section.editor_role_list'), 'children': <p>
          {codeList.Role
            .filter((item: any) => (formSectionData.editorRoleList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createContentComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'tableColumnList', 'label': t('form.form_section.table_column_list'), 'children': <p>
          {formSectionData.tableColumnList}
        </p>
      }))

    items.push((
      {
        'key': 'varConfigList', 'label': t('form.form_section.var_config_list'), 'children': <p>
          {formSectionData.varConfigList}
        </p>
      }))

    items.push((
      {
        'key': 'varValueList', 'label': t('form.form_section.var_value_list'), 'children': <p>
          {formSectionData.varValueList}
        </p>
      }))
    return items;
  }


  const createDescriptionFields = (conditionValue: string) => {
    const items = []
    items.push((
      <Tabs
        defaultActiveKey="basic"
        items={[
          {
            label: '基本信息', key: 'basic', children: (
              <><Descriptions bordered column={1} items={createBasicBasicItems()}>
              </Descriptions>
                <Descriptions bordered column={1} items={createBasicComplexItems()} layout="vertical">
                </Descriptions>
              </>)
          },
          // {
          //   label: '流转设置', key: 'flow', children: (
          //     <><Descriptions bordered column={1} items={createFlowBasicItems()}>
          //     </Descriptions>
          //     </>)
          // },
          // {
          //   label: '内容设计', key: 'content', children: (
          //     <><Descriptions bordered column={1} items={createContentComplexItems()} layout="vertical">
          //     </Descriptions>
          //     </>)
          // },

        ]}
      />
    ));

    return items;
  }

  return (
    <>
      {createDescriptionFields()}

      {/*<TableColumnConfigTableViewer*/}
      {/*  fieldName="tableColumnList"*/}
      {/*  fieldLabel={t("form.form_section.table_column_list")}*/}
      {/*  tableColumnConfigList={formSectionData.tableColumnList}/>*/}

      {/*<FormVarConfigTableViewer*/}
      {/*  fieldName="varConfigList"*/}
      {/*  fieldLabel={t("form.form_section.var_config_list")}*/}
      {/*  formVarConfigList={formSectionData.varConfigList}/>*/}

      {/*<FormVarValueTableViewer*/}
      {/*  fieldName="varValueList"*/}
      {/*  fieldLabel={t("form.form_section.var_value_list")}*/}
      {/*  formVarValueList={formSectionData.varValueList}/>*/}

    </>
  );
})
export default FormSectionDetail;
