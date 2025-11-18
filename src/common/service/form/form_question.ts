import {requestSearchFormQuestion,requestCreateFormQuestion,requestUpdateFormQuestion, requestUpdateFormQuestionVar,requestDeleteFormQuestion,requestGetFormQuestion,requestListFormQuestion, requestUploadFile} from "@/common/api/form/form_question";
import {FormQuestionType} from "@/common/data_type/form/form_question";

/**
 *  表单问题-查询数据
 */
export const searchFormQuestion = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormQuestion->param-converted", params)
  return requestSearchFormQuestion(params).then((response) => {
    let data = response.data
    if (data) {
data = data.list // search方法
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
    if (row.cargoNameList){
      row.cargoNameList = (row.cargoNameList).split(',')
    }else{
      row.cargoNameList =[]
    }
    if (row.subQuestionType){
      row.subQuestionType = (row.subQuestionType).split(',')
    }else{
      row.subQuestionType =[]
    }
    if (row.inputControlType){
      row.inputControlType = (row.inputControlType).split(',')
    }else{
      row.inputControlType =[]
    }
    if (row.varConfigList){
      row.varConfigList = JSON.parse(row.varConfigList)
    }else{
      row.varConfigList =[]
    }
    if (row.viewerRoleList){
      row.viewerRoleList = (row.viewerRoleList).split(',')
    }else{
      row.viewerRoleList =[]
    }
    if (row.editorRoleList){
      row.editorRoleList = (row.editorRoleList).split(',')
    }else{
      row.editorRoleList =[]
    }
    if (row.subQuestionTemplateHtml){
      row.subQuestionTemplateHtml = JSON.parse(row.subQuestionTemplateHtml)
    }else{
      row.subQuestionTemplateHtml =[]
    }
    if (row.operationMode){
      row.operationMode = (row.operationMode).split(',')
    }else{
      row.operationMode =[]
    }
    if (row.varValueList){
      row.varValueList = JSON.parse(row.varValueList)
    }else{
      row.varValueList =[]
    }
}

    }
    console.debug("searchFormQuestion->detail-converted", data)
    return response
  });
}

/**
 *  表单问题-新建数据
 */
export const createFormQuestion = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.subQuestionType){
    params.subQuestionType = (params.subQuestionType).join(',')
  }
  if (params.inputControlType){
    params.inputControlType = (params.inputControlType).join(',')
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.viewerRoleList){
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.subQuestionTemplateHtml){
    params.subQuestionTemplateHtml = JSON.stringify(params.subQuestionTemplateHtml)
  }
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("createFormQuestion->param-converted", params)
  return requestCreateFormQuestion(params).then((response) => {
    let data = response.data
    if (data) {
    if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
    }
    if (data.subQuestionType){
      data.subQuestionType = (data.subQuestionType).split(',')
    }else{
      data.subQuestionType =[]
    }
    if (data.inputControlType){
      data.inputControlType = (data.inputControlType).split(',')
    }else{
      data.inputControlType =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.viewerRoleList){
      data.viewerRoleList = (data.viewerRoleList).split(',')
    }else{
      data.viewerRoleList =[]
    }
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("createFormQuestion->detail-converted", data)
    return response
  });
}

/**
 *  表单问题-更新数据
 */
export const updateFormQuestion = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.subQuestionType){
    params.subQuestionType = (params.subQuestionType).join(',')
  }
  if (params.inputControlType){
    params.inputControlType = (params.inputControlType).join(',')
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.viewerRoleList){
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.subQuestionTemplateHtml){
    params.subQuestionTemplateHtml = JSON.stringify(params.subQuestionTemplateHtml)
  }
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("updateFormQuestion->param-converted", params)
  return requestUpdateFormQuestion(params).then((response) => {
    let data = response.data
    if (data) {
    if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
    }
    if (data.subQuestionType){
      data.subQuestionType = (data.subQuestionType).split(',')
    }else{
      data.subQuestionType =[]
    }
    if (data.inputControlType){
      data.inputControlType = (data.inputControlType).split(',')
    }else{
      data.inputControlType =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.viewerRoleList){
      data.viewerRoleList = (data.viewerRoleList).split(',')
    }else{
      data.viewerRoleList =[]
    }
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("updateFormQuestion->detail-converted", data)
    return response
  });
}


/**
 *  表单问题-更新数据
 */
export const updateFormQuestionVar = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("updateFormQuestionVar->param-converted", params)
  return requestUpdateFormQuestionVar(params).then((response) => {
    let data = response.data
    console.debug("updateFormQuestionVar->detail-converted", data)
    return response
  });
}

export const uploadFile = (formData: FormData) => {
  return requestUploadFile(formData).then((response) => {
    return response
  });
}


/**
 *  表单问题-削除数据
 */
export const deleteFormQuestion = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormQuestion->param-converted", params)
  return requestDeleteFormQuestion(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteFormQuestion->detail-converted", data)
    return response
  });
}

/**
 *  表单问题-取得数据
 */
export const getFormQuestion = (formQuestionId: string) => {
  return requestGetFormQuestion(formQuestionId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
    }
    if (data.subQuestionType){
      data.subQuestionType = (data.subQuestionType).split(',')
    }else{
      data.subQuestionType =[]
    }
    if (data.inputControlType){
      data.inputControlType = (data.inputControlType).split(',')
    }else{
      data.inputControlType =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.viewerRoleList){
      data.viewerRoleList = (data.viewerRoleList).split(',')
    }else{
      data.viewerRoleList =[]
    }
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("getFormQuestion->detail-converted", data)
    return response
  });
}

/**
 *  表单问题-查询数据列表
 */
export const listFormQuestion = (data: FormQuestionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listFormQuestion->param-converted", params)
  return requestListFormQuestion(params).then((response) => {
    let data = response.data
    if (data) {
// data = data.list // search方法
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
    if (row.cargoNameList){
      row.cargoNameList = (row.cargoNameList).split(',')
    }else{
      row.cargoNameList =[]
    }
    if (row.subQuestionType){
      row.subQuestionType = (row.subQuestionType).split(',')
    }else{
      row.subQuestionType =[]
    }
    if (row.inputControlType){
      row.inputControlType = (row.inputControlType).split(',')
    }else{
      row.inputControlType =[]
    }
    if (row.varConfigList){
      row.varConfigList = JSON.parse(row.varConfigList)
    }else{
      row.varConfigList =[]
    }
    if (row.viewerRoleList){
      row.viewerRoleList = (row.viewerRoleList).split(',')
    }else{
      row.viewerRoleList =[]
    }
    if (row.editorRoleList){
      row.editorRoleList = (row.editorRoleList).split(',')
    }else{
      row.editorRoleList =[]
    }
    if (row.subQuestionTemplateHtml){
      row.subQuestionTemplateHtml = JSON.parse(row.subQuestionTemplateHtml)
    }else{
      row.subQuestionTemplateHtml =[]
    }
    if (row.operationMode){
      row.operationMode = (row.operationMode).split(',')
    }else{
      row.operationMode =[]
    }
    if (row.varValueList){
      row.varValueList = JSON.parse(row.varValueList)
    }else{
      row.varValueList =[]
    }
}

    }
    console.debug("listFormQuestion->detail-converted", data)
    return response
  });
}
