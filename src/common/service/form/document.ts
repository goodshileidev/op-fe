import {requestSearchDocument,requestCreateDocument,requestUpdateDocument,requestDeleteDocument,requestGetDocument} from "@/common/api/form/document";
import {DocumentType} from "@/common/data_type/form/document";

/**
 *  一体化表单-查询数据
 */
export const searchDocument = (data: DocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchDocument->param-converted", params)
  return requestSearchDocument(params).then((response) => {
    let data = response.data
    if (data) {
data = data.list // search方法
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
    if (row.editorRoleList){
      row.editorRoleList = (row.editorRoleList).split(',')
    }else{
      row.editorRoleList =[]
    }
    if (row.stepDefinition){
      row.stepDefinition = JSON.parse(row.stepDefinition)
    }else{
      row.stepDefinition =[]
    }
    if (row.recipientList){
      row.recipientList = (row.recipientList).split(',')
    }else{
      row.recipientList =[]
    }
    if (row.submissionSettings){
      row.submissionSettings = JSON.parse(row.submissionSettings)
    }else{
      row.submissionSettings =[]
    }
    if (row.submissionHistory){
      row.submissionHistory = JSON.parse(row.submissionHistory)
    }else{
      row.submissionHistory =[]
    }
    if (row.paramValueList){
      row.paramValueList = JSON.parse(row.paramValueList)
    }else{
      row.paramValueList =[]
    }
    if (row.varConfigList){
      row.varConfigList = JSON.parse(row.varConfigList)
    }else{
      row.varConfigList =[]
    }
    if (row.varValueList){
      row.varValueList = JSON.parse(row.varValueList)
    }else{
      row.varValueList =[]
    }
}

    }
    console.debug("searchDocument->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单-新建数据
 */
export const createDocument = (data: DocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = JSON.stringify(params.stepDefinition)
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.submissionHistory){
    params.submissionHistory = JSON.stringify(params.submissionHistory)
  }
  if (params.paramValueList){
    params.paramValueList = JSON.stringify(params.paramValueList)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("createDocument->param-converted", params)
  return requestCreateDocument(params).then((response) => {
    let data = response.data
    if (data) {
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
    }
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.submissionHistory){
      data.submissionHistory = JSON.parse(data.submissionHistory)
    }else{
      data.submissionHistory =[]
    }
    if (data.paramValueList){
      data.paramValueList = JSON.parse(data.paramValueList)
    }else{
      data.paramValueList =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("createDocument->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单-更新数据
 */
export const updateDocument = (data: DocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.editorRoleList){
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.stepDefinition){
    params.stepDefinition = JSON.stringify(params.stepDefinition)
  }
  if (params.recipientList){
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.submissionSettings){
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.submissionHistory){
    params.submissionHistory = JSON.stringify(params.submissionHistory)
  }
  if (params.paramValueList){
    params.paramValueList = JSON.stringify(params.paramValueList)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("updateDocument->param-converted", params)
  return requestUpdateDocument(params).then((response) => {
    let data = response.data
    if (data) {
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
    }
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.submissionHistory){
      data.submissionHistory = JSON.parse(data.submissionHistory)
    }else{
      data.submissionHistory =[]
    }
    if (data.paramValueList){
      data.paramValueList = JSON.parse(data.paramValueList)
    }else{
      data.paramValueList =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("updateDocument->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单-削除数据
 */
export const deleteDocument = (data: DocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteDocument->param-converted", params)
  return requestDeleteDocument(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteDocument->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单-取得数据
 */
export const getDocument = (documentId: string) => {
  return requestGetDocument(documentId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.editorRoleList){
      data.editorRoleList = (data.editorRoleList).split(',')
    }else{
      data.editorRoleList =[]
    }
    if (data.stepDefinition){
      data.stepDefinition = JSON.parse(data.stepDefinition)
    }else{
      data.stepDefinition =[]
    }
    if (data.recipientList){
      data.recipientList = (data.recipientList).split(',')
    }else{
      data.recipientList =[]
    }
    if (data.submissionSettings){
      data.submissionSettings = JSON.parse(data.submissionSettings)
    }else{
      data.submissionSettings =[]
    }
    if (data.submissionHistory){
      data.submissionHistory = JSON.parse(data.submissionHistory)
    }else{
      data.submissionHistory =[]
    }
    if (data.paramValueList){
      data.paramValueList = JSON.parse(data.paramValueList)
    }else{
      data.paramValueList =[]
    }
    if (data.varConfigList){
      data.varConfigList = JSON.parse(data.varConfigList)
    }else{
      data.varConfigList =[]
    }
    if (data.varValueList){
      data.varValueList = JSON.parse(data.varValueList)
    }else{
      data.varValueList =[]
    }

    }
    console.debug("getDocument->detail-converted", data)
    return response
  });
}
