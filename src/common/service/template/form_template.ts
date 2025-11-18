import {
  requestSearchFormTemplate,
  requestCreateFormTemplate,
  requestUpdateFormTemplate,
  requestDeleteFormTemplate,
  requestGetFormTemplate,
  requestListFormTemplate,
  requestPublishFormTemplate,
  requestCancelPublishFormTemplate,
  requestCopyFormTemplate
} from "@/common/api/template/form_template";
import {FormTemplateType} from "@/common/data_type/template/form_template";

/**
 *  表单模版-查询数据
 */
export const searchFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormTemplate->param-converted", params)
  return requestSearchFormTemplate(params).then((response) => {
    let data = response.data
    if (data) {
      data = data.list
      for (let idx=0;idx<data.length;idx++) {
        let row=data[idx]
    if (row.cargoNameList){
      row.cargoNameList = (row.cargoNameList).split(',')
    }else{
      row.cargoNameList =[]
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
        if (row.recipientList){
          row.recipientList = (row.recipientList).split(',')
        }else{
          row.recipientList =[]
        }
        if (row.operationMode){
          row.operationMode = (row.operationMode).split(',')
        }else{
          row.operationMode =[]
        }
        if (row.displayPosition){
          row.displayPosition = (row.displayPosition).split(',')
        }else{
          row.displayPosition =[]
        }
        if (row.editableTimeOnMiniProgram){
          row.editableTimeOnMiniProgram = JSON.parse(row.editableTimeOnMiniProgram)
        }else{
          row.editableTimeOnMiniProgram =[]
        }
        if (row.submissionSettings){
          row.submissionSettings = JSON.parse(row.submissionSettings)
        }else{
          row.submissionSettings =[]
        }
        if (row.varConfigList){
          row.varConfigList = JSON.parse(row.varConfigList)
        }else{
          row.varConfigList =[]
        }
      }
    }
    console.debug("searchFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-新建数据
 */
export const createFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.viewerRoleList){
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.displayPosition){
    params.displayPosition = (params.displayPosition).join(',')
  }
  if (params.editableTimeOnMiniProgram){
    params.editableTimeOnMiniProgram = JSON.stringify(params.editableTimeOnMiniProgram)
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("createFormTemplate->param-converted", params)
  return requestCreateFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {
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
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.displayPosition){
      data.displayPosition = (data.displayPosition).split(',')
    }else{
      data.displayPosition =[]
    }
    if (data.editableTimeOnMiniProgram){
      data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
    }else{
      data.editableTimeOnMiniProgram =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }

    }
    console.debug("createFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-更新数据
 */
export const updateFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList){
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.viewerRoleList){
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.operationMode){
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.displayPosition){
    params.displayPosition = (params.displayPosition).join(',')
  }
  if (params.editableTimeOnMiniProgram){
    params.editableTimeOnMiniProgram = JSON.stringify(params.editableTimeOnMiniProgram)
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("updateFormTemplate->param-converted", params)
  return requestUpdateFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {
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
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.displayPosition){
      data.displayPosition = (data.displayPosition).split(',')
    }else{
      data.displayPosition =[]
    }
    if (data.editableTimeOnMiniProgram){
      data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
    }else{
      data.editableTimeOnMiniProgram =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }

    }
    console.debug("updateFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-削除数据
 */
export const deleteFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormTemplate->param-converted", params)
  return requestDeleteFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-取得数据
 */
export const getFormTemplate = (formTemplateId: string) => {
  return requestGetFormTemplate(formTemplateId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
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
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.operationMode){
      data.operationMode = (data.operationMode).split(',')
    }else{
      data.operationMode =[]
    }
    if (data.displayPosition){
      data.displayPosition = (data.displayPosition).split(',')
    }else{
      data.displayPosition =[]
    }
    if (data.editableTimeOnMiniProgram){
      data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
    }else{
      data.editableTimeOnMiniProgram =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }

    }
    console.debug("getFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-查询数据列表
 */
export const listFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listFormTemplate->param-converted", params)
  return requestListFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {
// data = data.list // search方法
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
    if (row.cargoNameList){
      row.cargoNameList = (row.cargoNameList).split(',')
    }else{
      row.cargoNameList =[]
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
    if (row.recipientList){
      row.recipientList = (row.recipientList).split(',')
    }else{
      row.recipientList =[]
    }
    if (row.operationMode){
      row.operationMode = (row.operationMode).split(',')
    }else{
      row.operationMode =[]
    }
    if (row.displayPosition){
      row.displayPosition = (row.displayPosition).split(',')
    }else{
      row.displayPosition =[]
    }
    if (row.editableTimeOnMiniProgram){
      row.editableTimeOnMiniProgram = JSON.parse(row.editableTimeOnMiniProgram)
    }else{
      row.editableTimeOnMiniProgram =[]
    }
    if (row.submissionSettings){
      row.submissionSettings = JSON.parse(row.submissionSettings)
    }else{
      row.submissionSettings =[]
    }
    if (row.varConfigList){
      row.varConfigList = JSON.parse(row.varConfigList)
    }else{
      row.varConfigList =[]
    }
}

    }
    console.debug("listFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-发布
 */
export const publishFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("publishFormTemplate->param-converted", params)
  return requestPublishFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("publishFormTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单模版-取消发布
 */
export const cancelPublishFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("cancel_publishFormTemplate->param-converted", params)
  return requestCancelPublishFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("cancel_publishFormTemplate->detail-converted", data)
    return response
  });
}


/**
 *  表单模版-复制
 */
export const copyFormTemplate = (data: FormTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("copyFormTemplate->param-converted", params)
  return requestCopyFormTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("copyFormTemplate->detail-converted", data)
    return response
  });
}
