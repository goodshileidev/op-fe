import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps, Tabs} from 'antd'
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {getFormTemplate} from '@/common/service/template/form_template'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'


interface IFormTemplateDetailProps {
  formTemplateId: string
  isOpen: boolean
  onGetData: any
}

const FormTemplateDetail: React.FC<IFormTemplateDetailProps> = ((props) => {
  const formTemplateId = props.formTemplateId
  const [formTemplateData, setFormTemplateData] = useState<FormTemplateType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isVarConfigListTableViewerOpen, setIsVarConfigListTableViewerOpen] = useState(false);


  const getFormTemplateDetail = async (formTemplateId: string) => {
    setLoading(true);
    const response = await getFormTemplate(formTemplateId);
    const data = response.data ?? null;
    setFormTemplateData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formTemplateId && formTemplateId !== "" && formTemplateId !== "0") {
      getFormTemplateDetail(formTemplateId)
    }
  }, [formTemplateId, isOpen])

  //if (formTemplateData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  if (formTemplateId && (!formTemplateData || !formTemplateData.formTemplateId)) {
    return <></>
  }

  const createBasicBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'formTemplateName', 'label': t('template.form_template.form_template_name'), 'children': <p>
          {formTemplateData.formTemplateName}
        </p>
      }))

    items.push((
      {
        'key': 'formTemplateNo', 'label': t('template.form_template.form_template_no'), 'children': <p>
          {formTemplateData.formTemplateNo}
        </p>
      }))
    items.push((
      {
        'key': 'formTemplatePlatformNo', 'label': t('template.form_template.form_template_platform_no'), 'children': <p>
          {formTemplateData.formTemplatePlatformNo}
        </p>
      }))

    items.push((
      {
        'key': 'publishStatus', 'label': t('template.form_template.publish_status'), 'children': <p>
          {codeList.PublishStatus
            .filter((item: any) => (item.value === formTemplateData.publishStatus))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createFlowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'recipientList', 'label': t('template.form_template.recipient_list'), 'children': <p>
          {codeList.RecipientList
            .filter((item: any) => (formTemplateData.recipientList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createShowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    // items.push((
    //   {
    //     'key': 'operationMode', 'label': t('template.form_template.operation_mode'), 'children': <p>
    //       {codeList.OperationMode
    //         .filter((item: any) => (formTemplateData.operationMode).includes(item.value))
    //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
    //     </p>
    //
    //   }))

    items.push((
      {
        'key': 'displayPosition', 'label': t('template.form_template.display_position'), 'children': <p>
          {codeList.DisplayPosition
            .filter((item: any) => (formTemplateData.displayPosition).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createShowComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    // items.push((
    //   {
    //     'key': 'printTemplate', 'label': t('template.form_template.print_template'), 'children': <p>
    //       {formTemplateData.printTemplate}
    //     </p>
    //   }))

    items.push((
      {
        'key': 'editableTimeOnMiniProgram',
        'label': t('template.form_template.editable_time_on_mini_program'),
        'children': <p>
          {formTemplateData.editableTimeOnMiniProgram}
        </p>
      }))
    return items;
  }
  const createContentBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'isSignatureRequired', 'label': t('template.form_template.is_signature_required'), 'children': <p>
          {codeList.YesNo
            .filter((item: any) => (item.value === formTemplateData.isSignatureRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))

    items.push((
      {
        'key': 'isStampSignatureRequired',
        'label': t('template.form_template.is_stamp_signature_required'),
        'children': <p>
          {codeList.YesNo
            .filter((item: any) => (item.value === formTemplateData.isStampSignatureRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </p>

      }))
    return items;
  }
  const createContentComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'previewHtml', 'label': t('template.form_template.preview_html'), 'children': <p>
          {formTemplateData.previewHtml}
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
            label: '基本信息',
            key: 'basic', children: (
              <><Descriptions bordered column={1} items={createBasicBasicItems()}>
              </Descriptions>
              </>)
          },
          // {
          //   label: '流转设置', key: 'flow', children: (
          //     <><Descriptions bordered column={1} items={createFlowBasicItems()}>
          //     </Descriptions>
          //     </>)
          // },
          {
            label: '展示设置',
            key: 'show',
            children: (
              <><Descriptions bordered column={1} items={createShowBasicItems()}>
              </Descriptions>
                <Descriptions bordered column={1} items={createShowComplexItems()} layout="vertical">
                </Descriptions>
              </>)
          },
          // {
          //   label: '内容设计', key: 'content', children: (
          //     <>
          //       {/*<Descriptions bordered column={1} items={createContentBasicItems()}>*/}
          //       {/*</Descriptions>*/}
          //       <Descriptions bordered column={1} items={createContentComplexItems()} layout="vertical">
          //       </Descriptions>
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

      <FormVarConfigTableViewer
        fieldName="varConfigList"
        fieldLabel={t("template.form_template.var_config_list")}
        formVarConfigList={formTemplateData.varConfigList}/>

    </>
  );
})
export default FormTemplateDetail;
