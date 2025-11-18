import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next';
import {Card, Image, UploadFile} from 'antd'
import FormDetail from "@/pages/form/form/components/form_detail";
import {FormType} from "@/common/data_type/form/form";
import {FormQuestionType} from "@/common/data_type/form/form_question";
import {listFormQuestion} from "@/common/service/form/form_question";
import EditVarValueModel from "@/pages/form/form/components/edit_var_value_modal";
import {FormVarValueType} from "@/common/data_type/template/form_var_value";

import moment from 'moment';


interface IFormDetailWrapperProps {
  formId: string
  showBasic?: true
  onGetData?: any
  columnCount?: number | 4
  onUpdated?: any
  style?: "basic" | "simple"
}

const FormDetailWrapper: React.FC<IFormDetailWrapperProps> = ((props) => {
    const [isEditVarValueVisible, setIsEditVarValueVisible] = useState(false);
    const [formData, setFormData] = useState<FormType | any>({})
    const [formQuestionList, setFormQuestionList] = useState<FormQuestionType[]>([])
    const [formQuestionMap, setFormQuestionMap] = useState<{ string, FormQuestionType }>({})
    const [currentFileList, setCurrentFileList] = useState<UploadFile[]>();
    const {t} = useTranslation();
    const formId = props.formId;
    console.debug("formId", formId)
    const [currentFormQuestionId, setCurrentFormQuestionId] = useState("")
    const [currentFormQuestion, setCurrentFormQuestion] = useState<FormQuestionType>({})
    const [currentFormVarValue, setCurrentFormVarValue] = useState<FormVarValueType>({})
    const onGetData = (data: FormType) => {
      console.debug("onGetData", data)
      setFormData(data)
    }

    function createMarkup(html: string) {
      return {__html: html};
    }

    useEffect(() => {
      listQuestion()
    }, [props.formId])

    function listQuestion() {
      listFormQuestion({formId}).then((response) => {
        if (response.data && response.data) {
          console.debug("listFormQuestion", response.data);
          const formQuestionMap = {}
          const formQuestionList = response.data
          for (let idx = 0; idx < formQuestionList.length; idx++) {
            const formQuestion = formQuestionList[idx]
            for (let i = 0; i < formQuestion.varValueList.length; i++) {
              let varValueVO = formQuestion.varValueList[i];
              if (!varValueVO.optionValues || varValueVO.optionValues == '') {
                varValueVO.options = [];
              } else {
                let options = varValueVO.optionValues.split("\n");
                let optionSelection = [];
                for (let j = 0; j < options.length; j++) {
                  optionSelection.push({
                    label: options[j],
                    value: options[j]
                  })
                }
                varValueVO.options = optionSelection;
              }
              if (!varValueVO.varValue || varValueVO.varValue == '') {
                varValueVO.varValue = varValueVO.varDefaultValue;
              }
            }
            formQuestionMap[formQuestion.formQuestionId] = formQuestion
          }
          setFormQuestionMap(formQuestionMap)
          setFormQuestionList(formQuestionList)
        }
      })
    }

    const renderQuestionList = () => {
      if (formQuestionList && formQuestionList.length > 0) {
        const questionElementList: any[] = []
        formQuestionList.forEach((formQuestion: FormQuestionType) => {
          if (formQuestion.subQuestionList) {
            const formQuestionElement = <>
              <div
                style={{
                  margin: 0,
                  padding: 0
                }}
                data-form-question-id={formQuestion.formQuestionId}
                data={{
                  formQuestionId: formQuestion.formQuestionId
                }}>
                {formQuestion.subQuestionList.map((subQuestion) => {
                  // SubQuestionType: [
                  //   {value: '1', label: '序号', i18nKey: 'code_list.SubQuestionType.1'},
                  //   {value: '2', label: '提示文字', i18nKey: 'code_list.SubQuestionType.2'},
                  //   {value: '3', label: '带输入框的富文本', i18nKey: 'code_list.SubQuestionType.3'},
                  //   {value: '4', label: '刷卡签名', i18nKey: 'code_list.SubQuestionType.4'},
                  //   {value: '8', label: '手写签名', i18nKey: 'code_list.SubQuestionType.8'},
                  //   {value: '5', label: '签名时间', i18nKey: 'code_list.SubQuestionType.5'},
                  //   {value: '6', label: '图片上传', i18nKey: 'code_list.SubQuestionType.6'},
                  //   {value: '7', label: '文件上传', i18nKey: 'code_list.SubQuestionType.7'},
                  // ],
                  if (["1", "2"].includes(subQuestion.subQuestionType)) {
                    return <span
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                      dangerouslySetInnerHTML={createMarkup(subQuestion.html)}></span>
                  } else if (["4"].includes(subQuestion.subQuestionType)) {
                    return <Image src={""}></Image>
                  } else if (["8"].includes(subQuestion.subQuestionType)) {
                    return <div
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                      dangerouslySetInnerHTML={createMarkup(subQuestion.html)}></div>
                  } else if (["6"].includes(subQuestion.subQuestionType)) {
                    return <div
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                      dangerouslySetInnerHTML={createMarkup(subQuestion.html)}></div>
                  } else if (["7"].includes(subQuestion.subQuestionType)) {
                    return <div
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                      dangerouslySetInnerHTML={createMarkup(subQuestion.html)}></div>
                  } else {
                    // 带输入框的富文本
                    return <div
                      className={'ql-editor'}
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                      dangerouslySetInnerHTML={createMarkup(subQuestion.html)}></div>
                  }
                })}
              </div>
            </>
            questionElementList.push(formQuestionElement)
          }
        })
        console.debug("formQuestionElement", questionElementList)
        if (props.onGetData) {
          props.onGetData(formData)
        }
        return questionElementList
      }
    }

    if (location.hash.indexOf("print") === -1) {
      setTimeout(() => {
        const varContainerList = document.getElementsByClassName("var-no-value-placeholder")
        for (let i = 0; i < varContainerList.length; i++) {
          let element = varContainerList[i];
          element.setAttribute('readonly', 'readonly');
          const openEditModel = (event) => {
            let formQuestionId = element.dataset["formQuestionId"]
            let tempElement = element.parentElement;
            while (!formQuestionId && tempElement) {
              formQuestionId = tempElement.dataset["formQuestionId"]
              tempElement = tempElement.parentElement;
              console.debug("tempElement", tempElement)
            }
            console.debug("var-container clicked-1, formQuestionId:" + formQuestionId, element, event)
            if (formQuestionId) {
              const currentFormQuestion = formQuestionMap[formQuestionId]
              const varName = element.dataset["varName"]
              const varKey = element.dataset["varKey"]
              setCurrentFormQuestionId(formQuestionId)
              setCurrentFormQuestion(currentFormQuestion)
              console.debug("var-container clicked-2, varName:" + varName, varKey, currentFormQuestion)
              for (let idx = 0; idx < currentFormQuestion.varValueList.length; idx++) {
                const varValue = currentFormQuestion.varValueList[idx]
                if (varValue.varName === varName) {
                  console.debug("var-container clicked-3, varName:" + varName, varKey, varValue)

                  if (varValue.varInputType === 'picture') {
                    if (varValue.varValue !== null && varValue.varValue !== "") {
                      setCurrentFileList(varValue.varValue);
                    } else {
                      setCurrentFileList([]);
                    }
                  } else if (varValue.varInputType === 'date' || varValue.varInputType === 'time') {
                    varValue.varValue = moment(varValue.varValue);
                  } else if (varValue.varInputType.indexOf("signature") > -1) {
                    return
                  }
                  setCurrentFormVarValue(varValue)
                  break;
                }
              }
              setIsEditVarValueVisible(true)
            }
          }
          element.addEventListener("click", openEditModel)
          // element.addEventListener("focus", openEditModel)
        }
      }, 2);
    }

    function onCloseEditVarModal(updated: boolean, varData: FormVarValueType) {
      setIsEditVarValueVisible(false);
      listQuestion();
      props.onUpdated && props.onUpdated(updated, varData)
    }

    return (
      <div style={{
        margin: 0,
        padding: 0
      }}>
        {
          !props.showBasic ? <></> :
            <Card
              className={"hide-on-print"}
              title={t("common.title.detail", {'entity': formData ? "[" + formData.formNo + "] " + formData.formName : ""})}
              bordered={true}>
              <FormDetail
                style={props.style}
                formId={props.formId}
                columnCount={props.columnCount}
                isOpen={true}
                onGetData={onGetData}
              />
            </Card>
        }
        {renderQuestionList()}
        <EditVarValueModel
          className={"hide-on-print"}
          isVisible={isEditVarValueVisible}
          formData={formData}
          formQuestionId={currentFormQuestionId}
          formVarValue={currentFormVarValue}
          formQuestionData={currentFormQuestion}
          fileList={currentFileList}
          onClose={onCloseEditVarModal}>
        </EditVarValueModel>
      </div>
    )
  }
)

export default FormDetailWrapper;
