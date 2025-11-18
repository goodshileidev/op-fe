import React, {useEffect, useState} from 'react'
import {Alert, Descriptions,} from 'antd'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {getFormQuestionTemplate} from '@/common/service/template/form_question_template'
import {useTranslation} from 'react-i18next';

import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'

import SubQuestionTableViewer from '@/components/sub_question_template/sub_question_table_viewer'
import {codeList} from "@/common/code_list/code_list_static";


interface IFormQuestionTemplateDetailProps {
  formQuestionTemplateId: string
  onClose: boolean
  isOpen: boolean
}

const FormQuestionTemplateDetail: React.FC<IFormQuestionTemplateDetailProps> = ((props) => {
  const formQuestionTemplateId = props.formQuestionTemplateId
  const [formQuestionTemplateData, setFormQuestionTemplateData] = useState<FormQuestionTemplateType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  let isOpen = props.isOpen

  let onClose = props.onClose


  const [isVarConfigListTableViewerVisible, setIsVarConfigListTableViewerVisible] = useState(false);

  const [isSubQuestionTemplateHtmlTableViewerVisible, setIsSubQuestionTemplateHtmlTableViewerVisible] = useState(false);


  const getFormQuestionTemplateDetail = async (formQuestionTemplateId: string) => {
    setLoading(true);
    const response = await getFormQuestionTemplate(formQuestionTemplateId);
    setFormQuestionTemplateData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (formQuestionTemplateId && formQuestionTemplateId !== "" && formQuestionTemplateId !== "0") {
      getFormQuestionTemplateDetail(formQuestionTemplateId)
    }
  }, [formQuestionTemplateId, isOpen])

  //if (formQuestionTemplateData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}



  return (
    <>
      <Descriptions bordered column={1}>
        <Descriptions.Item label={t("template.form_question_template.cargo_name_list")}>
          {codeList.CargoName
            .filter((item: any) => (formQuestionTemplateData && formQuestionTemplateData.cargoNameList && formQuestionTemplateData.cargoNameList.includes(item.value)))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}&nbsp;</span>))}
        </Descriptions.Item>
        <Descriptions.Item label={t("template.form_question_template.operation_type")}>
          {formQuestionTemplateData.operationType}
        </Descriptions.Item>
        <Descriptions.Item label={t("template.form_question_template.domestic_foreign_trade_type")}>
          {codeList.DomesticForeignTradeType
            .filter((item: any) => (item.value === formQuestionTemplateData.domesticForeignTradeType))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </Descriptions.Item>

      </Descriptions>

      <FormVarConfigTableViewer
        formVarConfigList={formQuestionTemplateData.varConfigList}/>

      <SubQuestionTableViewer
        key={formQuestionTemplateData.formQuestionTemplateId}
        subQuestionList={formQuestionTemplateData.subQuestionTemplateHtml}/>

      {/*<Tabs*/}
      {/*  defaultActiveKey="basic"*/}
      {/*  items={[*/}
      {/*    {*/}
      {/*      label: '基本信息', key: 'basic', children: (*/}
      {/*        <><Descriptions bordered column={3}>*/}
      {/*          <Descriptions.Item label={t("template.form_question_template.question_no")}>*/}
      {/*            {formQuestionTemplateData.questionNo}*/}
      {/*          </Descriptions.Item>*/}

      {/*          <Descriptions.Item label={t("template.form_question_template.question_title_list")}>*/}
      {/*            {formQuestionTemplateData.questionTitleList}*/}
      {/*          </Descriptions.Item>*/}

      {/*          <Descriptions.Item label={t("template.form_question_template.detailed_description")}>*/}
      {/*            {formQuestionTemplateData.detailedDescription}*/}
      {/*          </Descriptions.Item>*/}

      {/*        </Descriptions></>)*/}
      {/*    },*/}
      {/*    {*/}
      {/*      label: '内容设计', key: 'content', children: (*/}
      {/*        <><Descriptions bordered column={3}>*/}
      {/*          <Descriptions.Item label={t("template.form_question_template.is_photo_evidence_required")}>*/}
      {/*            {codeList.YesNo*/}
      {/*              .filter((item: any) => (item.value === formQuestionTemplateData.isPhotoEvidenceRequired))*/}
      {/*              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
      {/*          </Descriptions.Item>*/}


      {/*          <Descriptions.Item label={t("template.form_question_template.is_signature_evidence_required")}>*/}
      {/*            {codeList.YesNo*/}
      {/*              .filter((item: any) => (item.value === formQuestionTemplateData.isSignatureEvidenceRequired))*/}
      {/*              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
      {/*          </Descriptions.Item>*/}


      {/*        </Descriptions>*/}
      {/*          <FormVarConfigTableViewer*/}
      {/*            formVarConfigList={formQuestionTemplateData.varConfigList}/>*/}

      {/*          <SubQuestionTableViewer*/}
      {/*            key={formQuestionTemplateData.formQuestionTemplateId}*/}
      {/*            subQuestionList={formQuestionTemplateData.subQuestionTemplateHtml}/>*/}
      {/*        </>)*/}
      {/*    }*/}
      {/*    // {*/}
      {/*    //   label: '流转设置', key: 'flow', children: (*/}
      {/*    //     <><Descriptions bordered column={2}>*/}
      {/*    //       <Descriptions.Item label={t("template.form_question_template.viewer_role_list")}>*/}
      {/*    //         {codeList.Role*/}
      {/*    //           .filter((item: any) => (formQuestionTemplateData.viewerRoleList).includes(item.value))*/}
      {/*    //           .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
      {/*    //       </Descriptions.Item>*/}


      {/*    //       <Descriptions.Item label={t("template.form_question_template.editor_role_list")}>*/}
      {/*    //         {codeList.Role*/}
      {/*    //           .filter((item: any) => (formQuestionTemplateData.editorRoleList).includes(item.value))*/}
      {/*    //           .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
      {/*    //       </Descriptions.Item>*/}


      {/*    //     </Descriptions></>)*/}
      {/*    // },*/}
      {/*    // {*/}
      {/*    //   label: '展示设置', key: 'show', children: (*/}
      {/*    //     <><Descriptions bordered column={3}>*/}
      {/*    //       <Descriptions.Item label={t("template.form_question_template.operation_mode")}>*/}
      {/*    //         {codeList.OperationMode*/}
      {/*    //           .filter((item: any) => (formQuestionTemplateData.operationMode).includes(item.value))*/}
      {/*    //           .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}*/}
      {/*    //       </Descriptions.Item>*/}
      {/*    //*/}
      {/*    //*/}
      {/*    //     </Descriptions></>)*/}
      {/*    //  },*/}

      {/*  ]}*/}
      {/*/>*/}


    </>
  );
})
export default FormQuestionTemplateDetail;
