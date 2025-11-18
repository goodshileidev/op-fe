import React, {useEffect, useState} from 'react'
import {Button, Collapse, CollapseProps, message, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormSectionDetail from './form_section_detail'
import {FormType} from "@/common/data_type/form/form";
import FormQuestionDetail from "@/pages/form/form_question/components/form_question_detail";
import FormQuestionEditDrawer from "@/pages/form/form_question/components/form_question_edit_drawer";
import {FormQuestionType} from "@/common/data_type/form/form_question";
import {FormSectionType} from "@/common/data_type/form/form_section";
import {deleteFormQuestion, listFormQuestion} from "@/common/service/form/form_question";
import {EditFilled} from '@ant-design/icons'
import {deleteFormSection} from "@/common/service/form/form_section";
import '../customCollapse.css'

interface IFormSectionDetailDrawerProps {
  isFormSectionDetailDrawerOpen?: boolean
  formSectionId: string
  formId: string
  form: FormType
  onClose: any
  onUpdate: any
}

const FormSectionDetailWrapper: React.FC<IFormSectionDetailDrawerProps> = ((props) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const {t} = useTranslation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = props.form
    const formId = props.formId
    const formSectionId = props.formSectionId
    const [currentFormQuestionId, setCurrentFormQuestionId] = useState('');
    const [needReload, setNeedReload] = useState<number>(0)
    const [formQuestionIdList, setFormQuestionIdList] = useState<string[]>([])
    const [formQuestionList, setFormQuestionList] = useState<FormQuestionType[]>([])
    const [formSection, setFormSection] = useState<FormSectionType>()
    console.debug("formId", props.formId)
    console.debug("form", props.form)
    console.debug("formSectionId", props.formSectionId)

    const loadQuestionList = () => {
      const formQuestionIdList: string[] = []
      const formQuestionList: FormQuestionType[] = []
      listFormQuestion({formId: formId, formSectionId: formSectionId}).then((res) => {
        setFormQuestionList(res.data)
        for (const idx in res.data) {
          const formSection = res.data[idx]
          formQuestionIdList.push(`${formSection.formSectionId}`)
          formQuestionList.push(formSection)
        }
        setFormQuestionIdList(formQuestionIdList);
        setFormQuestionList(formQuestionList)
        console.debug("useEffect", res, formQuestionIdList, formQuestionList)
      })
    }

    useEffect(() => {
      loadQuestionList()
    }, [formSectionId]);

    const handleShowEditQuestion = (formQuestionId: string) => {
      console.log('handleShowEditQuestion,formQuestionId', formQuestionId)
      setCurrentFormQuestionId(formQuestionId)
      setIsEditDrawerOpen(true)
    }

    const onGet = (data: FormSectionType) => {
      setFormSection(data)
    }

    const handleShowAddQuestion = () => {
      const newFormQuestion: FormQuestionType = {}
      const currentFormQuestionId = "0"
      setCurrentFormQuestionId(currentFormQuestionId)
      // setCurrentFormQuestion(newFormQuestion)
      // setCurrentFormQuestionId(row.formQuestionId)
      console.debug("formSectionId", formSectionId)
      setIsEditDrawerOpen(true)
    }


    const handleShowEditSection = (formSectionId: string) => {
      setIsEditModalOpen(true)
    }

    const handleEditSectionClose = (updated: boolean, data: FormSectionType) => {
      if (updated) {
        setFormSection(data)
      }
      setNeedReload((new Date()).getMilliseconds())
      setIsEditModalOpen(false)
      console.debug("handleEditSectionClose", updated, data, formQuestionList, formQuestionList)
    }

    const handleEditDrawerClose = (updated: boolean, data: FormQuestionType) => {
      if (updated) {
        loadQuestionList()
      }
      setIsEditDrawerOpen(false)
      console.debug("handleEditDrawerClose", updated, data, formQuestionList, formQuestionList)
    }
    const handleDeleteSection = (formSectionId: string) => {

    }

    const handleDeleteQuestion = (formSectionId: string, formQuestionId: string) => {

    }


    const confirmDeleteSection = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, formSectionId: string) => {
      console.log("confirmDeleteSection", e, formSectionId);
      if (formSectionId) {
        deleteFormSection({formSectionId: formSectionId}).then((response: any) => {
          const {code} = response;
          if (code === 200) {
            message.success(t("common.delete_success"));
            // 成功删除后重新获取列表
            props.onUpdate();
          }
        })
      }
    };

    const confirmDeleteQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, formSectionId: string, formQuestionId: string) => {
      console.log("confirmDeleteQuestion", e, formSectionId, formQuestionId);
      if (formQuestionId) {
        deleteFormQuestion({formQuestionId: formQuestionId}).then((response: any) => {
          const {code} = response;
          if (code === 200) {
            message.success(t("common.delete_success"));
            // 成功删除后重新获取用户列表
            loadQuestionList();
          }
        })
      }
    };

    const cancel = (e: any) => {
      console.log("PopconfirmProps['onCancel']", e);
    };

    function createQuestionItems(formQuestionList: FormQuestionType[]) {
      const items: CollapseProps['items'] = []
      formQuestionList.map((formQuestion) => {
        console.debug("render formQuestion", formQuestion)
        items.push({
          key: formQuestion.questionNo,
          label: (t('form.form_question') + ':' + formQuestion.questionNo),
          children: <>
            <FormQuestionDetail
              key={formQuestion.formQuestionId}
              isOpen={true}
              form={props.form}
              formQuestion={formQuestion}
              formQuestionId={formQuestion.formQuestionId}
            ></FormQuestionDetail>
          </>,
          extra: <>
            <div style={{width: 400, textAlign: 'right'}}>
              <Space>
                <Button htmlType="button"
                        icon={<EditFilled/>}
                        type={"link"}
                        onClick={(e) => {
                          e.stopPropagation();  // 阻止事件冒泡
                          handleShowEditQuestion(formQuestion.formQuestionId)
                        }}
                        style={{marginLeft: 8, width: '100%'}}>
                  {t("common.button.edit", {"entity": "问题"})}
                </Button>
                {/*<Popconfirm*/}
                {/*  title={t("common.row_delete_title")}*/}
                {/*  description={t("common.row_delete_description")}*/}
                {/*  onConfirm={(e) => confirmDeleteQuestion(e, formSection.formSectionId, formQuestion.formQuestionId)}*/}
                {/*  onCancel={cancel}*/}
                {/*  okText={t("common.yes")}*/}
                {/*  cancelText={t("common.no")}*/}
                {/*>*/}
                {/*  <Button size="small" icon={<DeleteFilled/>} type="link">*/}
                {/*    {t("common.button.delete")}*/}
                {/*  </Button>*/}
                {/*</Popconfirm> */}
              </Space>
            </div>
          </>
        })
      })
      return items;
    }

    function onCollapseChange(key: string | string[]) {
      console.debug("onCollapseChange", key)
    }

    return (
      <div>
        <Collapse className="custom-collapse-tocard" defaultActiveKey={['1']} ghost items={[{
          key: '1',
          label: t('form.form_section') + ':' + (formSection ? formSection.sectionName : ""),
          extra: <div style={{width: 400, textAlign: 'right'}}>
            <Space>
              {/*<Button htmlType="button"*/}
              {/*        type={"primary"}*/}
              {/*        onClick={() => {*/}
              {/*          handleShowEditSection(formSectionId)*/}
              {/*        }}*/}
              {/*        style={{marginLeft: 8, width: '100%'}}>*/}
              {/*  {t("common.button.edit_type", {"entity": "区块"})}*/}
              {/*</Button>*/}
              {/*<Button htmlType="button"*/}
              {/*        type={"primary"}*/}
              {/*        onClick={() => {*/}
              {/*          handleShowAddQuestion()*/}
              {/*        }}*/}
              {/*        style={{marginLeft: 8, width: '100%'}}*/}
              {/*>*/}
              {/*  {t("common.button.add_type", {"entity": "问题"})}*/}
              {/*</Button>*/}
              {/*{formQuestionList && formQuestionList.length > 0 ? <></> :*/}
              {/*  <Popconfirm*/}
              {/*    title={t("common.row_delete_title")}*/}
              {/*    description={t("common.row_delete_description")}*/}
              {/*    onConfirm={(e) => confirmDeleteSection(e, formSectionId)}*/}
              {/*    onCancel={cancel}*/}
              {/*    okText={t("common.yes")}*/}
              {/*    cancelText={t("common.no")}*/}
              {/*  >*/}
              {/*    <Button size="small" icon={<DeleteFilled/>} type="link" type={"danger"}>*/}
              {/*      {t("common.button.delete")}*/}
              {/*    </Button>*/}
              {/*  </Popconfirm>*/}
              {/*}*/}
            </Space>
          </div>,
          children: <>
            <FormSectionDetail
              formSectionId={props.formSectionId}
              isOpen={true}
              onGet={onGet}
              needReload={needReload}
              form={props.form}
              formId={props.formId}/>
            <Collapse items={createQuestionItems(formQuestionList)} defaultActiveKey={['1']}
                      onChange={onCollapseChange}/>
          </>,
        }]}/>
        <FormQuestionEditDrawer
          isEditDrawerOpen={isEditDrawerOpen}
          formId={formId}
          form={props.form}
          formSection={formSection}
          formSectionId={formSectionId}
          formQuestionId={currentFormQuestionId}
          onClose={handleEditDrawerClose}/>
      </div>
    )
  }

)

export default FormSectionDetailWrapper;
