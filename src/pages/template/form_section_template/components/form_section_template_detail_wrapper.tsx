import React, {useEffect, useState} from 'react'
import {Button, Collapse, CollapseProps, message, Popconfirm, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateDetail from './form_section_template_detail'
import {FormTemplateType} from "@/common/data_type/template/form_template";
import FormQuestionTemplateDetail
  from "@/pages/template/form_question_template/components/form_question_template_detail";
import FormQuestionTemplateEditDrawer
  from "@/pages/template/form_question_template/components/form_question_template_edit_drawer";
import FormSectionTemplateEditModal
  from "@/pages/template/form_section_template/components/form_section_template_edit_modal";
import {FormQuestionTemplateType} from "@/common/data_type/template/form_question_template";
import {FormSectionTemplateType} from "@/common/data_type/template/form_section_template";
import {deleteFormQuestionTemplate, listFormQuestionTemplate} from "@/common/service/template/form_question_template";
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {deleteFormSectionTemplate} from "@/common/service/template/form_section_template";
import Sortable, {SortableEvent} from 'sortablejs';
import '../customCollapse.css'

interface IFormSectionTemplateDetailDrawerProps {
  isFormSectionTemplateDetailDrawerOpen?: boolean
  formSectionTemplateId: string
  formSectionTemplate: FormSectionTemplateType
  formTemplateId: string
  formTemplate: FormTemplateType
  onClose: any
  onUpdate: any
}

const FormSectionTemplateDetailWrapper: React.FC<IFormSectionTemplateDetailDrawerProps> = ((props) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const {t} = useTranslation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formTemplate = props.formTemplate
    const formTemplateId = props.formTemplateId
    const formSectionTemplateId = props.formSectionTemplateId
    const [currentFormQuestionTemplateId, setCurrentFormQuestionTemplateId] = useState('');
    const [needReload, setNeedReload] = useState<number>(0)
    const [formQuestionTemplateIdList, setFormQuestionTemplateIdList] = useState<string[]>([])
    const [formQuestionTemplateList, setFormQuestionTemplateList] = useState<FormQuestionTemplateType[]>([])
    const [formSectionTemplate, setFormSectionTemplate] = useState<FormSectionTemplateType>(props.formSectionTemplate)
    console.debug("formTemplateId", props.formTemplateId)
    console.debug("formTemplate", props.formTemplate)
    console.debug("formSectionTemplateId", props.formSectionTemplateId)

    const loadQuestionTemplateList = () => {
      const formQuestionTemplateIdList: string[] = []
      const formQuestionTemplateList: FormQuestionTemplateType[] = []
      listFormQuestionTemplate({formSectionTemplateId: formSectionTemplateId}).then((res) => {
        setFormQuestionTemplateList(res.data)
        for (const idx in res.data) {
          const formQuestionTemplate = res.data[idx]
          formQuestionTemplateIdList.push(`${formQuestionTemplate.formQuestionTemplateId}`)
          formQuestionTemplateList.push(formQuestionTemplate)
        }
        setFormQuestionTemplateIdList(formQuestionTemplateIdList);
        setFormQuestionTemplateList(formQuestionTemplateList)
        console.debug("useEffect", res, formQuestionTemplateIdList, formQuestionTemplateList)
      })
    }

    useEffect(() => {
      loadQuestionTemplateList()
    }, [formSectionTemplateId]);

    const handleShowEditQuestion = (formQuestionTemplateId: string) => {
      setCurrentFormQuestionTemplateId(formQuestionTemplateId)
      setIsEditDrawerOpen(true)
    }

    const onGet = (data: FormSectionTemplateType) => {
      setFormSectionTemplate(data)
    }

    const handleShowAddQuestion = () => {
      const newFormQuestionTemplate: FormQuestionTemplateType = {}
      const currentFormQuestionTemplateId = "0"
      setCurrentFormQuestionTemplateId(currentFormQuestionTemplateId)
      // setCurrentFormQuestionTemplate(newFormQuestionTemplate)
      // setCurrentFormQuestionTemplateId(row.formQuestionTemplateId)
      console.debug("formSectionTemplateId", formSectionTemplateId)
      setIsEditDrawerOpen(true)
    }


    const handleShowEditSection = (formSectionTemplateId: string) => {
      setIsEditModalOpen(true)
    }

    const handleEditSectionClose = (updated: boolean, data: FormSectionTemplateType) => {
      if (updated) {
        setFormSectionTemplate(data)
      }
      setNeedReload((new Date()).getMilliseconds())
      setIsEditModalOpen(false)
      console.debug("handleEditSectionClose", updated, data, formQuestionTemplateList, formQuestionTemplateList)
    }

    const handleEditDrawerClose = (updated: boolean, data: FormQuestionTemplateType) => {
      if (updated) {
        loadQuestionTemplateList()
      }
      setIsEditDrawerOpen(false)
      console.debug("handleEditDrawerClose", updated, data, formQuestionTemplateList, formQuestionTemplateList)
    }

    const handleDeleteSection = (formSectionTemplateId: string) => {

    }

    const handleDeleteQuestion = (formSectionTemplateId: string, formQuestionTemplateId: string) => {

    }


    const confirmDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, formSectionTemplateId: string) => {
      console.log("confirmDeleteSection", e, formSectionTemplateId);
      if (formSectionTemplateId) {
        deleteFormSectionTemplate({formSectionTemplateId: formSectionTemplateId}).then((response: any) => {
          const {code} = response;
          if (code === 200) {
            message.success(t("common.delete_success"));
            // 成功删除后重新获取列表
            props.onUpdate();
          }
        })
      }
    };

    const confirmDeleteQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, formSectionTemplateId: string, formQuestionTemplateId: string) => {
      console.log("confirmDeleteQuestion", e, formSectionTemplateId, formQuestionTemplateId);
      if (formQuestionTemplateId) {
        deleteFormQuestionTemplate({formQuestionTemplateId: formQuestionTemplateId}).then((response: any) => {
          const {code} = response;
          if (code === 200) {
            message.success(t("common.delete_success"));
            // 成功删除后重新获取用户列表
            loadQuestionTemplateList();
          }
        })
      }
    };

    const cancel = (e: any) => {
      console.log("PopconfirmProps['onCancel']", e);
    };

    function createQuestionTemplateItems(formQuestionTemplateList: FormQuestionTemplateType[]) {
      const items: CollapseProps['items'] = []
      formQuestionTemplateList.map((formQuestionTemplate) => {
        items.push({
          key: formQuestionTemplate.formQuestionTemplateId,
          label: (t('form.form_question') + ':' + formQuestionTemplate.questionNo),
          className: "question-card-draggable-item",
          style: {margin: '16px'},
          children: <>
            <FormQuestionTemplateDetail
              key={formQuestionTemplate.formQuestionTemplateId}
              isOpen={true}
              formTemplate={props.formTemplate}
              formQuestionTemplateId={formQuestionTemplate.formQuestionTemplateId}
            ></FormQuestionTemplateDetail>
          </>,
          extra: <>
            <div style={{width: 400, textAlign: 'right'}}>
              <Space>
                <Button htmlType="button"
                        icon={<EditFilled/>}
                        type={"link"}
                        onClick={() => {
                          handleShowEditQuestion(formQuestionTemplate.formQuestionTemplateId)
                        }}
                        style={{marginLeft: 8, width: '100%'}}>
                  {t("common.button.edit", {"entity": "问题"})}
                </Button>
                <Popconfirm
                  title={t("common.row_delete_title")}
                  description={t("common.row_delete_description")}
                  onConfirm={(e) => confirmDeleteQuestion(e, formSectionTemplate.formSectionTemplateId, formQuestionTemplate.formQuestionTemplateId)}
                  onCancel={cancel}
                  okText={t("common.yes")}
                  cancelText={t("common.no")}
                >
                  <Button size="small" icon={<DeleteFilled/>} type="link">
                    {t("common.button.delete")}
                  </Button>
                </Popconfirm> </Space>
            </div>
          </>
        })
      })
      return items;
    }

    const initListDrag = () => {
      const container = document.querySelector(`.question-card-draggable_${props.formSectionTemplateId}`) as HTMLElement;
      if (container) {
        Sortable.create(container, {
          draggable: `.question-card-draggable_${props.formSectionTemplateId} .question-card-draggable-item`,
          onEnd: (event: SortableEvent) => {
            event.stopPropagation(); // 阻止事件传播，否则区块的拖拽会被触发
            const {newIndex, oldIndex} = event;
            if (newIndex == null || oldIndex == null) return;
            setFormQuestionTemplateList(prevList => {
              const newList = JSON.parse(JSON.stringify(prevList));
              console.log(newList, 'newList=====')
              let currentItem = newList[oldIndex];
              let newItem = newIndex > 0 ? newList[newIndex - 1] : null;
              // 如果拖动到最上面，targetFormQuestionTemplateId传递null
              const actionData = {
                formQuestionTemplateId: currentItem.formQuestionTemplateId,
                formSectionTemplateId: currentItem.formSectionTemplateId,
                targetFormQuestionTemplateId: newItem ? newItem.formQuestionTemplateId : null,
              }
              console.log(actionData, '=====')
              // changeOrderFormQuestionTemplate(actionData).then((response) => {
              //   console.log(response, '=====')
              // })
              const [removedItem] = newList.splice(oldIndex, 1);
              newList.splice(newIndex, 0, removedItem);
              console.log(newList, '=====')
              return newList;
            });
          },
          group: 'question'
        });
      }
    };
    const onCollapseChange = (key: string | string[]) => {
      if (Array.isArray(key) && key.includes(formSectionTemplate.sectionNo)) {
        setTimeout(() => {
          initListDrag(); // 只有当展开时才初始化拖拽
        }) // 区块展开的时候，问题盒子还没挂载
      }
    };


    return (
      <div>
        {formSectionTemplate ? <>
          <Collapse
            onChange={onCollapseChange}
            className="custom-collapse-tocard"
            defaultActiveKey={[]} ghost
            items={[{
              key: formSectionTemplate ? formSectionTemplate.sectionNo : "1",
              label: t('form.form_section') + ':' + (formSectionTemplate ? ("[" + formSectionTemplate.sectionNo + "]-" + formSectionTemplate.sectionName) : ""),
              extra: <div style={{width: 400, textAlign: 'right'}}>
                <Space>
                  <Button htmlType="button"
                          type={"primary"}
                          onClick={() => {
                            handleShowEditSection(formSectionTemplateId)
                          }}
                          style={{marginLeft: 8, width: '100%'}}>
                    {t("common.button.edit_type", {"entity": "区块"})}
                  </Button>
                  <Button htmlType="button"
                          type={"primary"}
                          onClick={() => {
                            handleShowAddQuestion()
                          }}
                          style={{marginLeft: 8, width: '100%'}}
                  >
                    {t("common.button.add_type", {"entity": "问题"})}
                  </Button>
                  {formQuestionTemplateList && formQuestionTemplateList.length > 0 ? <></> :
                    <Popconfirm
                      title={t("common.row_delete_title")}
                      description={t("common.row_delete_description")}
                      onConfirm={(e) => confirmDeleteSection(e, formSectionTemplateId)}
                      onCancel={cancel}
                      okText={t("common.yes")}
                      cancelText={t("common.no")}
                    >
                      <Button size="small" icon={<DeleteFilled/>} type="link" type={"danger"}>
                        {t("common.button.delete")}
                      </Button>
                    </Popconfirm>
                  }
                </Space>
              </div>,
              children: <>
                <FormSectionTemplateDetail
                  formSectionTemplateId={props.formSectionTemplateId}
                  isOpen={true}
                  onGet={onGet}
                  needReload={needReload}
                  formTemplate={props.formTemplate}
                  formTemplateId={props.formTemplateId}/>
                <Collapse
                  className={`question-card-draggable_${props.formSectionTemplateId}`}
                  items={createQuestionTemplateItems(formQuestionTemplateList)}
                  defaultActiveKey={[]}
                  onChange={onCollapseChange}/>
              </>,
            }]}/>
          {/* <Card title={t('form.form_section') + ':' + (formSectionTemplate ? formSectionTemplate.sectionName : "")}
              size={'default'}
              bordered={true}
              extra={
                <div style={{width: 400, textAlign: 'right'}}>
                  <Space>
                    <Button htmlType="button"
                            type={"primary"}
                            onClick={() => {
                              handleShowEditSection(formSectionTemplateId)
                            }}
                            style={{marginLeft: 8, width: '100%'}}>
                      {t("common.button.edit_type", {"entity": "区块"})}
                    </Button>
                    <Button htmlType="button"
                            type={"primary"}
                            onClick={() => {
                              handleShowAddQuestion()
                            }}
                            style={{marginLeft: 8, width: '100%'}}
                    >
                      {t("common.button.add_type", {"entity": "问题"})}
                    </Button>
                    {formQuestionTemplateList && formQuestionTemplateList.length > 0 ? <></> :
                      <Popconfirm
                        title={t("common.row_delete_title")}
                        description={t("common.row_delete_description")}
                        onConfirm={(e) => confirmDeleteSection(e, formSectionTemplateId)}
                        onCancel={cancel}
                        okText={t("common.yes")}
                        cancelText={t("common.no")}
                      >
                        <Button size="small" icon={<DeleteFilled/>} type="link" type={"danger"}>
                          {t("common.button.delete")}
                        </Button>
                      </Popconfirm>
                    }
                  </Space>
                </div>
              }>
        </Card> */}
        </> : <></>}
        <FormSectionTemplateEditModal
          isFormSectionTemplateEditModalOpen={isEditModalOpen}
          formSectionTemplateId={props.formSectionTemplateId}
          formTemplate={formTemplate}
          formTemplateId={props.formTemplateId}
          onClose={handleEditSectionClose}/>

        <FormQuestionTemplateEditDrawer
          isFormQuestionTemplateEditDrawerOpen={isEditDrawerOpen}
          formTemplateId={formTemplateId}
          formTemplate={props.formTemplate}
          formSectionTemplate={formSectionTemplate}
          formSectionTemplateId={formSectionTemplateId}
          formQuestionTemplateId={currentFormQuestionTemplateId}
          onClose={handleEditDrawerClose}/>
      </div>
    )
  }

)

export default FormSectionTemplateDetailWrapper;

