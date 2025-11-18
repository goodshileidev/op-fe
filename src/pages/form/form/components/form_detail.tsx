import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps, Tabs} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {getForm} from '@/common/service/form/form'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import {renderDateTime} from "@/common/common_formatter";


interface IFormDetailProps {
  formId: string
  isOpen: boolean
  onGetData: any
  columnCount: 4
  style?: "basic"
}

const FormDetail: React.FC<IFormDetailProps> = ((props) => {
  const formId = props.formId
  console.debug("formId", formId)
  const [formData, setFormData] = useState<FormType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isSubmissionSettingsTableViewerOpen, setIsSubmissionSettingsTableViewerOpen] = useState(false);

  const [isSubmissionHistoryTableViewerOpen, setIsSubmissionHistoryTableViewerOpen] = useState(false);

  const [isVarConfigListTableViewerOpen, setIsVarConfigListTableViewerOpen] = useState(false);

  const [isVarValueListTableViewerOpen, setIsVarValueListTableViewerOpen] = useState(false);


  const getFormDetail = async (formId: string) => {
    setLoading(true);
    const response = await getForm(formId);
    const data = response.data ?? null;
    setFormData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formId && formId !== "" && formId !== "0") {
      getFormDetail(formId)
    }
  }, [formId, isOpen])

  //if (formData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  const createBasicBasicItems = () => {
    const items: DescriptionsProps['items'] = []
    //
    // items.push((
    //   {
    //     'key': 'formNo', 'label': t('form.form.form_no'), 'children': <span>
    //       {formData.formNo}
    //     </span>
    //   }))
    //
    // items.push((
    //   {
    //     'key': 'formName', 'label': t('form.form.form_name'), 'children': <span>
    //       {formData.formName}
    //     </span>
    //   }))
    if (props.style === "basic") {
      items.push((
        {
          'key': 'shipName', 'label': t('form.form.ship_name'), 'children': <span>
            {formData.shipName}
          </span>
        }))


      items.push((
        {
          'key': 'cargoName', 'label': t('form.form.cargo_name'), 'children': <span>
            {formData.cargoName}
          </span>
        }))

      items.push((
        {
          'key': 'domesticForeignTradeType', 'label': t('form.form.domestic_foreign_trade_type'), 'children': <span>
            {codeList.DomesticForeignTradeType
              .filter((item: any) => (item.value === formData.domesticForeignTradeType))
              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          </span>

        }))

      items.push((
        {
          'key': 'operationType', 'label': t('form.form.operation_type'), 'children': <span>
            {codeList.OperationType
              .filter((item: any) => (item.value === formData.operationType))
              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          </span>

        }))

      items.push((
        {
          'key': 'berthingTime', 'label': t('form.form.berthing_time'), 'children': <span>
            {renderDateTime(formData.berthingTime)}
          </span>
        }))

      items.push((
        {
          'key': 'departureTime', 'label': t('form.form.departure_time'), 'children': <span>
            {renderDateTime(formData.departureTime)}
          </span>
        }))
      //
      // items.push((
      //   {
      //     'key': 'inputPersonName', 'label': t('form.form.input_person_name'), 'children': <span>
      //       {formData.inputPersonName}
      //     </span>
      //   }))
      //
      // items.push((
      //   {
      //     'key': 'inputBy', 'label': t('form.form.input_by'), 'children': <span>
      //       {formData.inputBy}
      //     </span>
      //   }))
      //
      // items.push((
      //   {
      //     'key': 'inputStartTime', 'label': t('form.form.input_start_time'), 'children': <span>
      //       {formData.inputStartTime}
      //     </span>
      //   }))
      //
      // items.push((
      //   {
      //     'key': 'inputFinishTime', 'label': t('form.form.input_finish_time'), 'children': <span>
      //       {formData.inputFinishTime}
      //     </span>
      //   }))
      //
      // items.push((
      //   {
      //     'key': 'publishStatus', 'label': t('form.form.publish_status'), 'children': <span>
      //       {codeList.PublishStatus
      //         .filter((item: any) => (item.value === formData.publishStatus))
      //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
      //     </span>
      //
      //   }))
    }
    items.push((
      {
        'key': 'dataDate',
        'label': t('form.form.data_date'),
        'children': <span>
          {formData.dataDate}
        </span>
      }))

    items.push((
      {
        'key': 'fillinStatus',
        'label': t('form.form.fillin_status'),
        'children': <span>
          {formData.fillinStatus}
        </span>

      }))
    // items.push((
    //   {
    //     'key': 'displayPosition', 'label': t('form.form.display_position'), 'children': <span>
    //       {codeList.DisplayPosition
    //         .filter((item: any) => (formData.displayPosition && formData.displayPosition.includes(item.value)))
    //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
    //     </span>
    //   }))

    return items;
  }
  const createShowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    // items.push((
    //   {
    //     'key': 'displayPosition', 'label': t('form.form.display_position'), 'children': <span>
    //       {codeList.DisplayPosition
    //         .filter((item: any) => (formData.displayPosition && formData.displayPosition.includes(item.value)))
    //         .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
    //     </span>
    //
    //   }))
//
//     items.push((
// {'key': 'operationMode','label': t('form.form.operation_mode'),'children':   <span>
//         {codeList.OperationMode
//             .filter((item:any) => (formData.operationMode).includes(item.value))
//             .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
//   </span>
//
// }))
//   return items;
  }
  const createShowComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'printTemplate', 'label': t('form.form.print_template'), 'children': <span>
          {formData.printTemplate}
        </span>
      }))

    items.push((
      {
        'key': 'editableTimeOnMiniProgram', 'label': t('form.form.editable_time_on_mini_program'), 'children': <span>
          {formData.editableTimeOnMiniProgram}
        </span>
      }))
    return items;
  }
  const createFlowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'currentStep', 'label': t('form.form.current_step'), 'children': <span>
          {formData.currentStep}
        </span>
      }))

    items.push((
      {
        'key': 'recipientList', 'label': t('form.form.recipient_list'), 'children': <span>
          {codeList.RecipientList
            .filter((item: any) => (formData.recipientList).includes(item.value))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </span>

      }))

    items.push((
      {
        'key': 'reminderSettings', 'label': t('form.form.reminder_settings'), 'children': <span>
          {formData.reminderSettings}
        </span>
      }))
    return items;
  }
  const createFlowComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'submissionSettings', 'label': t('form.form.submission_settings'), 'children': <span>
          {formData.submissionSettings}
        </span>
      }))

    items.push((
      {
        'key': 'submissionHistory', 'label': t('form.form.submission_history'), 'children': <span>
          {formData.submissionHistory}
        </span>
      }))
    return items;
  }
  const createContentBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'isSignatureRequired', 'label': t('form.form.is_signature_required'), 'children': <span>
          {codeList.YesNo
            .filter((item: any) => (item.value === formData.isSignatureRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </span>

      }))

    items.push((
      {
        'key': 'isStampSignatureRequired', 'label': t('form.form.is_stamp_signature_required'), 'children': <span>
          {codeList.YesNo
            .filter((item: any) => (item.value === formData.isStampSignatureRequired))
            .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
        </span>

      }))

    items.push((
      {
        'key': 'signatureImageUrl', 'label': t('form.form.signature_image_url'), 'children': <span>
          {formData.signatureImageUrl}
        </span>
      }))

    items.push((
      {
        'key': 'stampImageUrl', 'label': t('form.form.stamp_image_url'), 'children': <span>
          {formData.stampImageUrl}
        </span>
      }))
    return items;
  }
  const createContentComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'varConfigList', 'label': t('form.form.var_config_list'), 'children': <span>
          {formData.varConfigList}
        </span>
      }))

    items.push((
      {
        'key': 'varValueList', 'label': t('form.form.var_value_list'), 'children': <span>
          {formData.varValueList}
        </span>
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
              <><Descriptions bordered column={props.columnCount} items={createBasicBasicItems()}>
              </Descriptions>
              </>)
          },
          // {
          //   label: '展示设置', key: 'show', children: (
          //     <><Descriptions bordered column={1} items={createShowBasicItems()}>
          //     </Descriptions>
          //       <Descriptions bordered column={1} items={createShowComplexItems()} layout="vertical">
          //       </Descriptions>
          //     </>)
          // },
          // {
          //   label: '流转设置', key: 'flow', children: (
          //     <><Descriptions bordered column={1} items={createFlowBasicItems()}>
          //     </Descriptions>
          //       <Descriptions bordered column={1} items={createFlowComplexItems()} layout="vertical">
          //       </Descriptions>
          //     </>)
          // },
          // {
          //   label: '内容设计', key: 'content', children: (
          //     <><Descriptions bordered column={1} items={createContentBasicItems()}>
          //     </Descriptions>
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

      {/*<SendConfigTableViewer */}
      {/*  fieldName = "submissionSettings"*/}
      {/*  fieldLabel = {t("form.form.submission_settings")} */}
      {/*  sendConfigList={formData.submissionSettings} />*/}

      {/*<SendHistoryTableViewer */}
      {/*  fieldName = "submissionHistory"*/}
      {/*  fieldLabel = {t("form.form.submission_history")} */}
      {/*  sendHistoryList={formData.submissionHistory} />*/}

      {/*<FormVarConfigTableViewer*/}
      {/*  fieldName="varConfigList"*/}
      {/*  fieldLabel={t("form.form.var_config_list")}*/}
      {/*  formVarConfigList={formData.varConfigList}/>*/}

      {/*<FormVarValueTableViewer*/}
      {/*  fieldName="varValueList"*/}
      {/*  fieldLabel={t("form.form.var_value_list")}*/}
      {/*  formVarValueList={formData.varValueList}/>*/}

    </>
  );
})
export default FormDetail;
