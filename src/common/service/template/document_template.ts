import {requestSearchDocumentTemplate,requestCreateDocumentTemplate,requestUpdateDocumentTemplate,requestDeleteDocumentTemplate,requestGetDocumentTemplate,requestListDocumentTemplate,requestPublishDocumentTemplate,requestCancelPublishDocumentTemplate} from "@/common/api/template/document_template";
import {DocumentTemplateType} from "@/common/data_type/template/document_template";

/**
 *  一体化表单模版-查询数据
 */
export const searchDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchDocumentTemplate->param-converted", params)
  return requestSearchDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-新建数据
 */
export const createDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.shipType){
    params.shipType = (params.shipType).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = JSON.stringify(params.stepDefinition)
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("createDocumentTemplate->param-converted", params)
  return requestCreateDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.shipType){
      data.shipType = (data.shipType).split(',')
    }else{
      data.shipType =[]
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
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
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
    console.debug("createDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-更新数据
 */
export const updateDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.shipType){
    params.shipType = (params.shipType).join(',')
  }
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = JSON.stringify(params.stepDefinition)
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("updateDocumentTemplate->param-converted", params)
  return requestUpdateDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.shipType){
      data.shipType = (data.shipType).split(',')
    }else{
      data.shipType =[]
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
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
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
    console.debug("updateDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-削除数据
 */
export const deleteDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteDocumentTemplate->param-converted", params)
  return requestDeleteDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-取得数据
 */
export const getDocumentTemplate = (documentTemplateId: string) => {
  return requestGetDocumentTemplate(documentTemplateId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.shipType){
      data.shipType = (data.shipType).split(',')
    }else{
      data.shipType =[]
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
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
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
    console.debug("getDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-查询数据列表
 */
export const listDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listDocumentTemplate->param-converted", params)
  return requestListDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("listDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-发布
 */
export const publishDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("publishDocumentTemplate->param-converted", params)
  return requestPublishDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("publishDocumentTemplate->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版-取消发布
 */
export const cancelPublishDocumentTemplate = (data: DocumentTemplateType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("cancel_publishDocumentTemplate->param-converted", params)
  return requestCancelPublishDocumentTemplate(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("cancel_publishDocumentTemplate->detail-converted", data)
    return response
  });
}
