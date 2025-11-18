import {requestSearchFormSection,requestCreateFormSection,requestUpdateFormSection,requestDeleteFormSection,requestGetFormSection,requestListFormSection} from "@/common/api/form/form_section";
import {FormSectionType} from "@/common/data_type/form/form_section";

/**
 *  表单区块-查询数据
 */
export const searchFormSection = (data: FormSectionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormSection->param-converted", params)
  return requestSearchFormSection(params).then((response) => {
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
    if (row.tableColumnList){
      row.tableColumnList = JSON.parse(row.tableColumnList)
    }else{
      row.tableColumnList =[]
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
    console.debug("searchFormSection->detail-converted", data)
    return response
  });
}

/**
 *  表单区块-新建数据
 */
export const createFormSection = (data: FormSectionType| Record<string, string | number | null | undefined>) => {
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
  if (params.tableColumnList){
    params.tableColumnList = JSON.stringify(params.tableColumnList)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("createFormSection->param-converted", params)
  return requestCreateFormSection(params).then((response) => {
    let data = response.data
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
    if (data.tableColumnList){
      data.tableColumnList = JSON.parse(data.tableColumnList)
    }else{
      data.tableColumnList =[]
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
    console.debug("createFormSection->detail-converted", data)
    return response
  });
}

/**
 *  表单区块-更新数据
 */
export const updateFormSection = (data: FormSectionType| Record<string, string | number | null | undefined>) => {
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
  if (params.tableColumnList){
    params.tableColumnList = JSON.stringify(params.tableColumnList)
  }
  if (params.varConfigList){
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList){
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("updateFormSection->param-converted", params)
  return requestUpdateFormSection(params).then((response) => {
    let data = response.data
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
    if (data.tableColumnList){
      data.tableColumnList = JSON.parse(data.tableColumnList)
    }else{
      data.tableColumnList =[]
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
    console.debug("updateFormSection->detail-converted", data)
    return response
  });
}

/**
 *  表单区块-削除数据
 */
export const deleteFormSection = (data: FormSectionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormSection->param-converted", params)
  return requestDeleteFormSection(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteFormSection->detail-converted", data)
    return response
  });
}

/**
 *  表单区块-取得数据
 */
export const getFormSection = (formSectionId: string) => {
  return requestGetFormSection(formSectionId).then((response)=>{
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
    if (data.tableColumnList){
      data.tableColumnList = JSON.parse(data.tableColumnList)
    }else{
      data.tableColumnList =[]
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
    console.debug("getFormSection->detail-converted", data)
    return response
  });
}

/**
 *  表单区块-查询数据列表
 */
export const listFormSection = (data: FormSectionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listFormSection->param-converted", params)
  return requestListFormSection(params).then((response) => {
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
    if (row.tableColumnList){
      row.tableColumnList = JSON.parse(row.tableColumnList)
    }else{
      row.tableColumnList =[]
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
    console.debug("listFormSection->detail-converted", data)
    return response
  });
}
