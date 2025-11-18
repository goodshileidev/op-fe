import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {useTranslation} from 'react-i18next';
import {FormSectionTemplateType} from "@/common/data_type/template/form_section_template";
import FormSectionTemplateEditModal
  from "@/pages/template/form_section_template/components/form_section_template_edit_modal";
import {Button, Card, message, Space} from "antd";
import {listFormSectionTemplate} from '@/common/service/template/form_section_template'
import FormSectionTemplateDetailWrapper from '../form_section_template/components/form_section_template_detail_wrapper';
import {FormTemplateType} from "@/common/data_type/template/form_template";
import FormTemplateDetail from "@/pages/template/form_template/components/form_template_detail";
import {
  cancelPublishFormTemplate,
  copyFormTemplate,
  publishFormTemplate
} from "@/common/service/template/form_template";
import Sortable, {SortableEvent} from 'sortablejs';
import {PageContainer} from '@ant-design/pro-components';

const FormTemplateDetailPage: React.FC = (() => {
  const {formTemplateId} = useParams<{ formTemplateId: string }>('0')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFormSectionTemplateId, setCurrentFormSectionTemplateId] = useState('');
  const [currentFormSectionTemplate, setCurrentFormSectionTemplate] = useState<FormSectionTemplateType | any>({});
  const [formSectionTemplateList, setFormSectionTemplateList] = useState<FormSectionTemplateType[]>([]);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [formSectionTemplateIdList, setFormSectionTemplateIdList] = useState<string[]>([])
  const [formTemplate, setFormTemplate] = useState<FormTemplateType>({})
  const [needShowAdd, setNeedShowAdd] = useState<number>(0)
  const [formTemplateData, setFormTemplateData] = useState<FormTemplateType>({})

  const handleBack = () => {
    navigate("/template/form_template/form_template_table/", {replace: true});
  }
  const onGetData = (data: FormTemplateType) => {
    setFormTemplateData(data)
  }

  const handlePublish = () => {
    console.debug("handlePublish", formTemplateId)
    publishFormTemplate({formTemplateId: formTemplateId}).then((response) => {
      message.success(t("common.execute_success", {'method': t('template.form_template.publish')}));
      setFormTemplateData({...formTemplateData, publishStatus: '2'})
    })
  }

  const handleCancelPublish = () => {
    cancelPublishFormTemplate({
      formTemplateId: formTemplateId,
      formTemplateNo: formTemplateData.formTemplateNo
    }).then((response) => {
      if (!response || response.code !== 200) {
        message.error(response.msg);
      } else {
        message.success(t("common.execute_success", {'method': t('template.form_template.publish')}));
        setFormTemplateData({...formTemplateData, publishStatus: '1'})
      }
    })
  }

  const handleShowAddSection = () => {
    const newFormSectionTemplate: FormSectionTemplateType = {}
    setCurrentFormSectionTemplateId('0')
    setCurrentFormSectionTemplate(newFormSectionTemplate)
    // setCurrentFormSectionTemplateId(row.formSectionTemplateId)
    setIsEditModalOpen(true)
  }
  const fetchSectionList = () => {
    const formSectionTemplateList = []
    const formSectionTemplateIdList = []
    listFormSectionTemplate({formTemplateId: formTemplateId}).then((res) => {
      setFormSectionTemplateList(res.data)
      for (const idx in res.data) {
        const formSectionTemplate = res.data[idx]
        formSectionTemplateIdList.push(`${formSectionTemplate.formSectionTemplateId}`)
        formSectionTemplateList.push(formSectionTemplate)
      }
      setFormSectionTemplateIdList(formSectionTemplateIdList);
      setFormSectionTemplateList(formSectionTemplateList)
      console.debug("useEffect", res, formSectionTemplateIdList, formSectionTemplateList)
    })
  }

  useEffect(() => {
    fetchSectionList()
  }, [formTemplateId]);

  const handleEditModalClose = (updated: boolean, data: FormSectionTemplateType) => {
    if (updated) {
      // const formSectionTemplateId = `${data.formSectionTemplateId}`
      // if (!formSectionTemplateIdList.includes(formSectionTemplateId)) {
      //   formSectionTemplateIdList.push(formSectionTemplateId)
      // }
      // setFormSectionTemplateIdList(formSectionTemplateIdList)
      fetchSectionList()
    }
    console.debug("handleEditModalClose", updated, data, formSectionTemplateIdList)
    setIsEditModalOpen(false)
  }
  const initListDrag = () => {
    const container = document.querySelector('.section-card-draggable') as HTMLElement;
    if (container) {
      Sortable.create(container, {
        draggable: '.section-card-draggable-item',
        onEnd: (event: SortableEvent) => {
          console.log(event, 'event=====')
          const {newIndex, oldIndex} = event;
          if (newIndex == null || oldIndex == null) return;
          setFormSectionTemplateList(prevList => {
            const newList = JSON.parse(JSON.stringify(prevList));
            let currentItem = newList[oldIndex];
            let newItem = newIndex > 0 ? newList[newIndex - 1] : null;
            // 如果拖动到最上面，targetFormSectionTemplateId传递null
            const actionData = {
              formSectionTemplateId: currentItem.formSectionTemplateId,
              formTemplateId: currentItem.formTemplateId,
              targetFormSectionTemplateId: newItem ? newItem.formSectionTemplateId : null,
            }
            // changeOrderFormSectionTemplate(actionData).then((response) => {
            //   console.log(response, '=====')
            // })
            const [removedItem] = newList.splice(oldIndex, 1);
            newList.splice(newIndex, 0, removedItem);
            console.log(newList, '=====')
            return newList;
          });
        },
        group: 'section',
        filter: '.question-card-draggable-item', // 排除掉有question-card-draggable-item类的子盒子,防止问题排序的问题触发区块的排序
      });
    }
  };
  useEffect(() => {
    initListDrag();
  }, [formSectionTemplateList]); // 每次formSectionTemplateList更新后重新绑定Sortable

  // const handleShowAddQuestion = (formSectionTemplateId) => {
  //   const newFormQuestionTemplate: FormQuestionTemplateType = {}
  //   setCurrentFormSectionTemplateId(formSectionTemplateId)
  //   setCurrentFormQuestionTemplateId('0')
  //   // 如何实现放都懂
  //   setCurrentFormQuestionTemplate(newFormQuestionTemplate)
  //   // setCurrentFormQuestionTemplateId(row.formQuestionTemplateId)
  //   setCurrentFormSectionTemplate(formSectionTemplateMap[formSectionTemplateId])
  //   console.debug("formSectionTemplateId", formSectionTemplateId)
  //   console.debug("currentFormSectionTemplate", currentFormSectionTemplate)
  //   setIsEditDrawerOpen(true)
  // }
  //
  // const handleShowEditQuestion = (formQuestionTemplateId) => {
  //   setCurrentFormQuestionTemplateId(formQuestionTemplateId)
  //   setIsEditDrawerOpen(true)
  // }

  // const handleEditDrawerClose = (updated: boolean, data: FormQuestionTemplateType) => {
  //   if (updated) {
  //     let formQuestionTemplateIdList = formSectionQuestionIdListMap[data.formSectionTemplateId]
  //     if (!formQuestionTemplateIdList) {
  //       formQuestionTemplateIdList = []
  //       formSectionQuestionIdListMap[data.formSectionTemplateId] = formQuestionTemplateIdList
  //     }
  //     formQuestionTemplateIdList.push(data.formQuestionTemplateId)
  //     setFormSectionQuestionIdListMap(formQuestionTemplateIdList)
  //
  //     let formQuestionTemplateList = formSectionQuestionListMap[data.formSectionTemplateId]
  //     if (!formQuestionTemplateList) {
  //       formQuestionTemplateList = []
  //       formSectionQuestionListMap[data.formSectionTemplateId] = formQuestionTemplateList
  //     }
  //     formQuestionTemplateList.push(data)
  //     setFormSectionQuestionListMap(formSectionQuestionListMap)
  //   }
  //   setIsEditDrawerOpen(false)
  //   console.debug("handleEditDrawerClose", updated, data, formSectionQuestionIdListMap, formSectionQuestionListMap)
  // }

  function handleCopy() {
    copyFormTemplate({formTemplateId: formTemplateId}).then((response) => {
      if (response.code === 200) {
        message.success("复制表单成功")
      } else {
        message.error("复制表单失败," + response.msg)
      }
    })
  }

  return (
    <PageContainer>
      <Card
        title={t("common.title.detail", {'entity': formTemplateData ? "[" + formTemplateData.formTemplateNo + "] " + formTemplateData.formTemplateName : ""})}
        bordered={true}>
        <FormTemplateDetail
          key={formTemplateId}
          formTemplateId={formTemplateId}
          isOpen={true}
          onGetData={onGetData}/>
      </Card>
      <br/>
      <Space>
        <div>
          <Button htmlType="button"
                  onClick={handleBack}
                  style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
          <Button htmlType="button"
                  onClick={handleCopy}
                  style={{marginLeft: 8}}>
            {t("common.button.copy")}
          </Button>
          {formTemplateData.publishStatus === "2" ? (<>
                <Button htmlType="button" onClick={handleCancelPublish} style={{marginLeft: 8}}>
                  {t("template.form_template.cancel_publish")}
                </Button></>
            ) :
            <Button htmlType="button" onClick={handlePublish} style={{marginLeft: 8}}>
              {t("template.form_template.publish")}
            </Button>}
          <Button htmlType="button"
                  type={"primary"}
                  onClick={handleShowAddSection}
                  style={{marginLeft: 8}}>
            {t("common.button.add_type", {"entity": "区块"})}
          </Button>
        </div>
      </Space>
      <br/>
      <div className="section-card-draggable" style={{width: '100%'}}>
        {
          formSectionTemplateList.map((formSectionTemplate) => {
              const formSectionTemplateId = `${formSectionTemplate.formSectionTemplateId}`
              const FormSectionTemplateDetailWrapperKey = "FormSectionTemplateDetailWrapperKey_" + formSectionTemplateId;
              console.debug("render formSectionTemplate", formSectionTemplate)
              return (
                <div className="section-card-draggable-item" style={{width: '100%'}}>
                  <FormSectionTemplateDetailWrapper
                    key={FormSectionTemplateDetailWrapperKey}
                    formTemplateId={formTemplateId}
                    formTemplate={formTemplateData}
                    onUpdate={fetchSectionList}
                    formSectionTemplate={formSectionTemplate}
                    formSectionTemplateId={formSectionTemplateId}>
                  </FormSectionTemplateDetailWrapper>
                  <br/>
                </div>
              )
            }
          )
        }
      </div>
      <FormSectionTemplateEditModal
        isFormSectionTemplateEditModalOpen={isEditModalOpen}
        formTemplateId={formTemplateId}
        formTemplate={formTemplateData}
        formSectionTemplateId={currentFormSectionTemplateId}
        onClose={handleEditModalClose}/>
    </PageContainer>
  )
    ;
})

export default FormTemplateDetailPage;

