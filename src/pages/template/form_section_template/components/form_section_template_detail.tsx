import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, Tabs,} from 'antd'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {getFormSectionTemplate} from '@/common/service/template/form_section_template'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

import TableColumnConfigTableViewer from '@/components/table_column_config/table_column_config_table_viewer'

import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'
import {FormTemplateType} from "@/common/data_type/template/form_template";


interface IFormSectionTemplateDetailProps {
  formSectionTemplateId: string
  formTemplateId: string
  formTemplate: FormTemplateType
  onGet: any
  needReload: number
  isOpen: boolean
}

const FormSectionTemplateDetail: React.FC<IFormSectionTemplateDetailProps> = ((props) => {
  const formTemplate = props.formTemplate
  const formTemplateId = props.formTemplateId
  const formSectionTemplateId = props.formSectionTemplateId
  const [formSectionTemplateData, setFormSectionTemplateData] = useState<FormSectionTemplateType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen

  const [isTableColumnListTableViewerVisible, setIsTableColumnListTableViewerVisible] = useState(false);

  const [isVarConfigListTableViewerVisible, setIsVarConfigListTableViewerVisible] = useState(false);


  const getFormSectionTemplateDetail = async (formSectionTemplateId: string) => {
    console.debug("getFormSectionTemplateDetail", formSectionTemplateId)
    setLoading(true);
    const response = await getFormSectionTemplate(formSectionTemplateId);
    setFormSectionTemplateData(response.data ?? null);
    if (props.onGet) {
      props.onGet(response.data ?? null)
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formSectionTemplateId && typeof formSectionTemplateId !== "undefined" && formSectionTemplateId !== "" && formSectionTemplateId !== "undefined" && formSectionTemplateId !== "0") {
      getFormSectionTemplateDetail(formSectionTemplateId)
    }
  }, [formSectionTemplateId, isOpen, props.needReload])
  //
  // const onGet = (data: FormSectionTemplateType) => {
  //   setFormSectionTemplateData(data)
  // }
  //if (formSectionTemplateData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}




  return (
    <>

      <Tabs
        defaultActiveKey="basic"
        items={[
          {
            label: '基本信息', key: 'basic', children: (
              <><Descriptions bordered column={3}>
                <Descriptions.Item label={t("template.form_section_template.section_no")}>
                  {formSectionTemplateData.sectionNo}
                </Descriptions.Item>

                <Descriptions.Item label={t("template.form_section_template.section_name")}>
                  {formSectionTemplateData.sectionName}
                </Descriptions.Item>

                {/*<Descriptions.Item label={t("template.form_section_template.main_sub_section_type")}>*/}
                {/*  {codeList.MainSubSectionType*/}
                {/*    .filter((item: any) => (item.value === formSectionTemplateData.mainSubSectionType))*/}
                {/*    .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
                {/*</Descriptions.Item>*/}

                <Descriptions.Item label={t("template.form_section_template.cargo_name_list")}>
                  {codeList.CargoName
                    .filter((item: any) => (formSectionTemplateData && formSectionTemplateData.cargoNameList && formSectionTemplateData.cargoNameList.includes(item.value)))
                    .map((item: any) => (<span color="green" key={item.value}>{item.label}&nbsp;</span>))}
                </Descriptions.Item>
                {/*<Descriptions.Item label={t("template.form_question_template.operation_type")}>*/}
                {/*  {formSectionTemplateData.operationType}*/}
                {/*</Descriptions.Item>*/}
                {/*<Descriptions.Item label={t("template.form_section_template.section_type")}>*/}
                {/*  {codeList.SectionType*/}
                {/*    .filter((item: any) => (item.value === formSectionTemplateData.sectionType))*/}
                {/*    .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
                {/*</Descriptions.Item>*/}

                <Descriptions.Item label={t("template.form_section_template.operation_type")}>
                  {codeList.OperationType
                    .filter((item: any) => (item.value === formSectionTemplateData.operationType))
                    .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
                </Descriptions.Item>
                <Descriptions.Item label={t("template.form_section_template.domestic_foreign_trade_type")}>
                  {codeList.DomesticForeignTradeType
                    .filter((item: any) => (item.value === formSectionTemplateData.domesticForeignTradeType))
                    .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
                </Descriptions.Item>

                <Descriptions.Item label={t("template.form_section_template.sub_section_type")}>
                  {codeList.SubSectionType
                    .filter((item: any) => (item.value === formSectionTemplateData.subSectionType))
                    .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
                </Descriptions.Item>


                {/*<Descriptions.Item label={t("template.form_section_template.summary")}>*/}
                {/*  {formSectionTemplateData.summary}*/}
                {/*</Descriptions.Item>*/}

                {/*<Descriptions.Item label={t("template.form_section_template.detailed_content")}>*/}
                {/*  {formSectionTemplateData.detailedContent}*/}
                {/*</Descriptions.Item>*/}

              </Descriptions></>)
          },
          // {
          //   label: '流转设置', key: 'flow', children: (
          //     <><Descriptions bordered column={2}>
          //       <Descriptions.Item label={t("template.form_section_template.viewer_role_list")}>
          //         {codeList.Role
          //           .filter((item: any) => (formSectionTemplateData.viewerRoleList).includes(item.value))
          //           .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          //       </Descriptions.Item>


          //       <Descriptions.Item label={t("template.form_section_template.editor_role_list")}>
          //         {codeList.Role
          //           .filter((item: any) => (formSectionTemplateData.editorRoleList).includes(item.value))
          //           .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          //       </Descriptions.Item>


          //     </Descriptions></>)
          // },
          {
            label: '内容设计', key: 'content', children: (
              <><Descriptions bordered column={2}>
                {/*<Descriptions.Item label={t("template.form_section_template.format_template_html")}>*/}
                {/*  {formSectionTemplateData.formatTemplateHtml}*/}
                {/*</Descriptions.Item>*/}

              </Descriptions>
                <TableColumnConfigTableViewer
                  tableColumnConfigList={formSectionTemplateData.tableColumnList}/>

                <FormVarConfigTableViewer
                  formVarConfigList={formSectionTemplateData.varConfigList}/>
              </>)
          },

        ]}
      />
    </>
  );
})
export default FormSectionTemplateDetail;
