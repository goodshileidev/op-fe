import {requestSearchFormTemplateVersion,requestCreateFormTemplateVersion,requestUpdateFormTemplateVersion,requestDeleteFormTemplateVersion,requestGetFormTemplateVersion} from "@/common/api/template/form_template_version";
import {FormTemplateVersionType} from "@/common/data_type/template/form_template_version";

/**
 *  表单模版版本-查询数据
 */
export const searchFormTemplateVersion = (data: FormTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormTemplateVersion->param-converted", params)
  return requestSearchFormTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchFormTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  表单模版版本-新建数据
 */
export const createFormTemplateVersion = (data: FormTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
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
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("createFormTemplateVersion->param-converted", params)
  return requestCreateFormTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {
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
    console.debug("createFormTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  表单模版版本-更新数据
 */
export const updateFormTemplateVersion = (data: FormTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
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
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("updateFormTemplateVersion->param-converted", params)
  return requestUpdateFormTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {
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
    console.debug("updateFormTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  表单模版版本-削除数据
 */
export const deleteFormTemplateVersion = (data: FormTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormTemplateVersion->param-converted", params)
  return requestDeleteFormTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteFormTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  表单模版版本-取得数据
 */
export const getFormTemplateVersion = (formTemplateVersionId: string) => {
  return requestGetFormTemplateVersion(formTemplateVersionId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
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
    console.debug("getFormTemplateVersion->detail-converted", data)
    return response
  });
}
