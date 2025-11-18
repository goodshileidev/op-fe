import {
  requestSearchFormQuestionTemplate,
  requestCreateFormQuestionTemplate,
  requestUpdateFormQuestionTemplate,
  requestDeleteFormQuestionTemplate,
  requestGetFormQuestionTemplate,
  requestListFormQuestionTemplate,
  requestGetVarConfigList, requestChangeOrderFormQuestionTemplate,
} from "@/common/api/template/form_question_template";
import {FormQuestionTemplateType} from "@/common/data_type/template/form_question_template";

/**
 *  表单问题模版-查询数据
 */
export const searchFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormQuestionTemplate->param-converted", params)
  return requestSearchFormQuestionTemplate(params).then((response) => {
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
    if (row.operationMode){
      row.operationMode = (row.operationMode).split(',')
    }else{
      row.operationMode =[]
    }
    if (row.subQuestionTemplateHtml){
      row.subQuestionTemplateHtml = JSON.parse(row.subQuestionTemplateHtml)
    }else{
      row.subQuestionTemplateHtml =[]
    }
}

    }
    console.debug("searchFormQuestionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单问题模版-新建数据
 */
export const createFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
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
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.subQuestionTemplateHtml){
    params.subQuestionTemplateHtml = JSON.stringify(params.subQuestionTemplateHtml)
  }

  console.debug("createFormQuestionTemplate->param-converted", params)
  return requestCreateFormQuestionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
    if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
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
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }

    }
    console.debug("createFormQuestionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单问题模版-更新数据
 */
export const updateFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
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
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.subQuestionTemplateHtml){
    params.subQuestionTemplateHtml = JSON.stringify(params.subQuestionTemplateHtml)
  }

  console.debug("updateFormQuestionTemplate->param-converted", params)
  return requestUpdateFormQuestionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
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
   if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
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
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }

    }
    console.debug("updateFormQuestionTemplate->detail-converted", data)
    return response
  });
}


/**
 *  表单问题模版-变更顺序
 *  1.formQuestionTemplateId: 打算移动的区块ID
 *  2.targetFormQuestionTemplateId: 移动到此区块后面
 *  3.formSectionTemplateId: 上级区块ID
 */
export const changeOrderFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
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
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.subQuestionTemplateHtml){
    params.subQuestionTemplateHtml = JSON.stringify(params.subQuestionTemplateHtml)
  }

  console.debug("changeOrderFormQuestionTemplate->param-converted", params)
  return requestChangeOrderFormQuestionTemplate(params).then((response) => {
    const data = response.data
    if (data) {
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
      if (data.operationMode){
        data.operationMode = (data.operationMode).split(',')
      }else{
        data.operationMode =[]
      }
      if (data.subQuestionTemplateHtml){
        data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
      }else{
        data.subQuestionTemplateHtml =[]
      }

    }
    console.debug("updateFormQuestionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单问题模版-削除数据
 */
export const deleteFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormQuestionTemplate->param-converted", params)
  return requestDeleteFormQuestionTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteFormQuestionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单问题模版-取得数据
 */
export const getFormQuestionTemplate = (formQuestionTemplateId: string) => {
  return requestGetFormQuestionTemplate(formQuestionTemplateId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.cargoNameList){
      data.cargoNameList = (data.cargoNameList).split(',')
    }else{
      data.cargoNameList =[]
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
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.subQuestionTemplateHtml){
      data.subQuestionTemplateHtml = JSON.parse(data.subQuestionTemplateHtml)
    }else{
      data.subQuestionTemplateHtml =[]
    }

    }
    console.debug("getFormQuestionTemplate->detail-converted", data)
    return response
  });
}


/**
 *  表单问题模版-取得数据
 */
export const getVarConfigList = (formQuestionTemplateId: string) => {
  return requestGetVarConfigList(formQuestionTemplateId).then((response)=>{
    return response
  });
}

/**
 *  表单问题模版-查询数据列表
 */
export const listFormQuestionTemplate = (data: FormQuestionTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listFormQuestionTemplate->param-converted", params)
  return requestListFormQuestionTemplate(params).then((response) => {
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
    if (row.operationMode){
      row.operationMode = (row.operationMode).split(',')
    }else{
      row.operationMode =[]
    }
    if (row.subQuestionTemplateHtml){
      row.subQuestionTemplateHtml = JSON.parse(row.subQuestionTemplateHtml)
    }else{
      row.subQuestionTemplateHtml =[]
    }
}

    }
    console.debug("listFormQuestionTemplate->detail-converted", data)
    return response
  });
}
