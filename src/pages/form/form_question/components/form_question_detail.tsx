import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps, Tabs} from 'antd'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {getFormQuestion} from '@/common/service/form/form_question'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

import SubQuestionTableViewer from '@/components/sub_question/sub_question_table_viewer'

import FormVarValueTableViewer from '@/components/form_var_value/form_var_value_table_viewer'
import {FormType} from "@/common/data_type/form/form";


interface IFormQuestionDetailProps {
  formQuestionId: string
  formQuestion?: FormQuestionType
  form?: FormType
  isOpen: boolean
  onGetData: any
}

const FormQuestionDetail: React.FC<IFormQuestionDetailProps> = ((props) => {
  const formQuestionId = props.formQuestionId
  const [formQuestionData, setFormQuestionData] = useState<FormQuestionType | any>(props.formQuestion)
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isVarConfigListTableViewerOpen, setIsVarConfigListTableViewerOpen] = useState(false);

  const [isSubQuestionTemplateHtmlTableViewerOpen, setIsSubQuestionTemplateHtmlTableViewerOpen] = useState(false);

  const [isVarValueListTableViewerOpen, setIsVarValueListTableViewerOpen] = useState(false);


  const getFormQuestionDetail = async (formQuestionId: string) => {
    setLoading(true);
    const response = await getFormQuestion(formQuestionId);
    const data = response.data ?? null;
    setFormQuestionData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.formQuestion && formQuestionId && formQuestionId !== "" && formQuestionId !== "0") {
      getFormQuestionDetail(formQuestionId)
    }
  }, [formQuestionId, props.formQuestion, isOpen])

  //if (formQuestionData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

 

  const createBasicBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'questionNo', 'label': t('form.form_question.question_no'), 'children': <p>
          {formQuestionData.questionNo}
        </p>
      }))

    // items.push((
    //   {
    //     'key': 'questionTitleList', 'label': t('form.form_question.question_title_list'), 'children': <p>
    //       {formQuestionData.questionTitleList}
    //     </p>
    //   }))
    //
    // items.push((
    //   {
    //     'key': 'inputBy', 'label': t('form.form_question.input_by'), 'children': <p>
    //       {formQuestionData.inputBy}
    //     </p>
    //   }))
    //
    // items.push((
    //   {
    //     'key': 'inputTime', 'label': t('form.form_question.input_time'), 'children': <p>
    //       {formQuestionData.inputTime}
    //     </p>
    //   }))
    return items;
  }
  const createBasicComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    // items.push((
    //   {
    //     'key': 'detailedDescription', 'label': t('form.form_question.detailed_description'), 'children': <p>
    //       {formQuestionData.detailedDescription}
    //     </p>
    //   }))

    items.push((
      {
        'key': 'remark', 'label': t('form.form_question.remark'), 'children': <p>
          {formQuestionData.remark}
        </p>
      }))
    return items;
  }
  const createContentBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'isPhotoEvidenceRequired', 'label': t('form.form_question.is_photo_evidence_required'), 'children': <p>
          {codeList.YesNo
            .filter((item: any) => (item.value === formQuestionData.isPhotoEvidenceRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'isSignatureEvidenceRequired',
        'label': t('form.form_question.is_signature_evidence_required'),
        'children': <p>
          {codeList.YesNo
            .filter((item: any) => (item.value === formQuestionData.isSignatureEvidenceRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'signatureImageUrl', 'label': t('form.form_question.signature_image_url'), 'children': <p>
          {formQuestionData.signatureImageUrl}
        </p>
      }))

    items.push((
      {
        'key': 'stampImageUrl', 'label': t('form.form_question.stamp_image_url'), 'children': <p>
          {formQuestionData.stampImageUrl}
        </p>
      }))
    return items;
  }
  const createContentComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'varConfigList', 'label': t('form.form_question.var_config_list'), 'children': <p>
          {formQuestionData.varConfigList}
        </p>
      }))

    items.push((
      {
        'key': 'subQuestionTemplateHtml', 'label': t('form.form_question.sub_question_template_html'), 'children': <p>
          {formQuestionData.subQuestionTemplateHtml}
        </p>
      }))

    items.push((
      {
        'key': 'varValueList', 'label': t('form.form_question.var_value_list'), 'children': <p>
          {formQuestionData.varValueList}
        </p>
      }))

    items.push((
      {
        'key': 'variableHistory', 'label': t('form.form_question.variable_history'), 'children': <p>
          {formQuestionData.variableHistory}
        </p>
      }))
    return items;
  }
  const createFlowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'viewerRoleList', 'label': t('form.form_question.viewer_role_list'), 'children': <p>
          {codeList.Role
            .filter((item: any) => (formQuestionData.viewerRoleList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'editorRoleList', 'label': t('form.form_question.editor_role_list'), 'children': <p>
          {codeList.Role
            .filter((item: any) => (formQuestionData.editorRoleList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createShowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

//     items.push((
// {'key': 'operationMode','label': t('form.form_question.operation_mode'),'children':   <p>
//         {codeList.OperationMode
//             .filter((item:any) => (formQuestionData.operationMode).includes(item.value))
//             .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
//   </p>
//
// }))
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
          //   label: '内容设计', key: 'content', children: (
          //     <><Descriptions bordered column={1} items={createContentBasicItems()}>
          //     </Descriptions>
          //       <Descriptions bordered column={1} items={createContentComplexItems()} layout="vertical">
          //       </Descriptions>
          //     </>)
          // },
          // {
          //   label: '流转设置', key: 'flow', children: (
          //     <><Descriptions bordered column={1} items={createFlowBasicItems()}>
          //     </Descriptions>
          //     </>)
          // },
          // {
          //   label: '展示设置', key: 'show', children: (
          //     <><Descriptions bordered column={1} items={createShowBasicItems()}>
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

      {/*<FormVarConfigTableViewer*/}
      {/*  fieldName="varConfigList"*/}
      {/*  fieldLabel={t("form.form_question.var_config_list")}*/}
      {/*  formVarConfigList={formQuestionData.varConfigList}/>*/}

      <SubQuestionTableViewer
        fieldName="subQuestionHtml"
        fieldLabel={t("form.form_question.sub_question_template_html")}
        formVarValueList={formQuestionData.varValueList}
        subQuestionList={formQuestionData.subQuestionList}/>

      <FormVarValueTableViewer
        fieldName="varValueList"
        fieldLabel={t("form.form_question.var_value_list")}
        formVarValueList={formQuestionData.varValueList}/>

    </>
  );
})
export default FormQuestionDetail;
