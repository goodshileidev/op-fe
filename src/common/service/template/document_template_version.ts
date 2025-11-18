import {requestSearchDocumentTemplateVersion,requestCreateDocumentTemplateVersion,requestUpdateDocumentTemplateVersion,requestDeleteDocumentTemplateVersion,requestGetDocumentTemplateVersion} from "@/common/api/template/document_template_version";
import {DocumentTemplateVersionType} from "@/common/data_type/template/document_template_version";

/**
 *  一体化表单模版版本-查询数据
 */
export const searchDocumentTemplateVersion = (data: DocumentTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchDocumentTemplateVersion->param-converted", params)
  return requestSearchDocumentTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchDocumentTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版版本-新建数据
 */
export const createDocumentTemplateVersion = (data: DocumentTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = (params.stepDefinition).join(',')
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("createDocumentTemplateVersion->param-converted", params)
  return requestCreateDocumentTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = (data.stepDefinition).split(',')
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
    console.debug("createDocumentTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版版本-更新数据
 */
export const updateDocumentTemplateVersion = (data: DocumentTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = (params.stepDefinition).join(',')
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("updateDocumentTemplateVersion->param-converted", params)
  return requestUpdateDocumentTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = (data.stepDefinition).split(',')
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
    console.debug("updateDocumentTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版版本-削除数据
 */
export const deleteDocumentTemplateVersion = (data: DocumentTemplateVersionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteDocumentTemplateVersion->param-converted", params)
  return requestDeleteDocumentTemplateVersion(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteDocumentTemplateVersion->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单模版版本-取得数据
 */
export const getDocumentTemplateVersion = (documentTemplateVersionId: string) => {
  return requestGetDocumentTemplateVersion(documentTemplateVersionId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = (data.stepDefinition).split(',')
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
    console.debug("getDocumentTemplateVersion->detail-converted", data)
    return response
  });
}
