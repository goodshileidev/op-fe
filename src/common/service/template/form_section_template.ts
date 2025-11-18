import {
  requestChangeOrderFormSectionTemplate,
  requestCreateFormSectionTemplate,
  requestDeleteFormSectionTemplate,
  requestGetFormSectionTemplate,
  requestListFormSectionTemplate,
  requestSearchFormSectionTemplate,
  requestUpdateFormSectionTemplate
} from "@/common/api/template/form_section_template";
import {FormSectionTemplateType} from "@/common/data_type/template/form_section_template";

/**
 *  表单区块模版-查询数据
 */
export const searchFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchFormSectionTemplate->param-converted", params)
  return requestSearchFormSectionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
      data = data.list // search方法
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
        if (row.cargoNameList) {
          row.cargoNameList = (row.cargoNameList).split(',')
        } else {
          row.cargoNameList = []
        }
        if (row.viewerRoleList) {
          row.viewerRoleList = (row.viewerRoleList).split(',')
        } else {
          row.viewerRoleList = []
        }
        if (row.editorRoleList) {
          row.editorRoleList = (row.editorRoleList).split(',')
        } else {
          row.editorRoleList = []
        }
        if (row.tableColumnList) {
          row.tableColumnList = JSON.parse(row.tableColumnList)
        } else {
          row.tableColumnList = []
        }
        if (row.varConfigList) {
          row.varConfigList = JSON.parse(row.varConfigList)
        } else {
          row.varConfigList = []
        }
      }

    }
    console.debug("searchFormSectionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单区块模版-新建数据
 */
export const createFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList) {
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.viewerRoleList) {
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList) {
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.tableColumnList) {
    params.tableColumnList = JSON.stringify(params.tableColumnList)
  }
  if (params.varConfigList) {
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("createFormSectionTemplate->param-converted", params)
  return requestCreateFormSectionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.cargoNameList) {
        data.cargoNameList = (data.cargoNameList).split(',')
      } else {
        data.cargoNameList = []
      }
      if (data.viewerRoleList) {
        data.viewerRoleList = (data.viewerRoleList).split(',')
      } else {
        data.viewerRoleList = []
      }
      if (data.editorRoleList) {
        data.editorRoleList = (data.editorRoleList).split(',')
      } else {
        data.editorRoleList = []
      }
      if (data.tableColumnList) {
        data.tableColumnList = JSON.parse(data.tableColumnList)
      } else {
        data.tableColumnList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }

    }
    console.debug("createFormSectionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单区块模版-更新数据
 */
export const updateFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.cargoNameList) {
    params.cargoNameList = (params.cargoNameList).join(',')
  }
  if (params.viewerRoleList) {
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList) {
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.tableColumnList) {
    params.tableColumnList = JSON.stringify(params.tableColumnList)
  }
  if (params.varConfigList) {
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("updateFormSectionTemplate->param-converted", params)
  return requestUpdateFormSectionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.viewerRoleList) {
        data.viewerRoleList = (data.viewerRoleList).split(',')
      } else {
        data.viewerRoleList = []
      }
      if (data.editorRoleList) {
        data.editorRoleList = (data.editorRoleList).split(',')
      } else {
        data.editorRoleList = []
      }
      if (data.tableColumnList) {
        data.tableColumnList = JSON.parse(data.tableColumnList)
      } else {
        data.tableColumnList = []
      }
      if (data.cargoNameList) {
        data.cargoNameList = (data.cargoNameList).split(',')
      } else {
        data.cargoNameList = []
      }

      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }

    }
    console.debug("updateFormSectionTemplate->detail-converted", data)
    return response
  });
}


/**
 *  表单区块模版-变更顺序。
 *  参数：
 *  1.formSectionTemplateId: 打算移动的区块ID
 *  2.targetTormSectionTemplateId: 移动到此区块后面
 *  3.formTemplateId: 上级表单模版ID
 */
export const changeOrderFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.viewerRoleList) {
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList) {
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.tableColumnList) {
    params.tableColumnList = JSON.stringify(params.tableColumnList)
  }
  if (params.varConfigList) {
    params.varConfigList = JSON.stringify(params.varConfigList)
  }

  console.debug("changeOrderFormSectionTemplate->param-converted", params)
  return requestChangeOrderFormSectionTemplate(params).then((response) => {
    const data = response.data
    if (data) {
      if (data.viewerRoleList) {
        data.viewerRoleList = (data.viewerRoleList).split(',')
      } else {
        data.viewerRoleList = []
      }
      if (data.editorRoleList) {
        data.editorRoleList = (data.editorRoleList).split(',')
      } else {
        data.editorRoleList = []
      }
      if (data.tableColumnList) {
        data.tableColumnList = JSON.parse(data.tableColumnList)
      } else {
        data.tableColumnList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }

    }
    console.debug("updateFormSectionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单区块模版-削除数据
 */
export const deleteFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteFormSectionTemplate->param-converted", params)
  return requestDeleteFormSectionTemplate(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteFormSectionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单区块模版-取得数据
 */
export const getFormSectionTemplate = (formSectionTemplateId: string) => {
  return requestGetFormSectionTemplate(formSectionTemplateId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {
      if (data.cargoNameList) {
        data.cargoNameList = (data.cargoNameList).split(',')
      } else {
        data.cargoNameList = []
      }
      if (data.viewerRoleList) {
        data.viewerRoleList = (data.viewerRoleList).split(',')
      } else {
        data.viewerRoleList = []
      }
      if (data.editorRoleList) {
        data.editorRoleList = (data.editorRoleList).split(',')
      } else {
        data.editorRoleList = []
      }
      if (data.tableColumnList) {
        data.tableColumnList = JSON.parse(data.tableColumnList)
      } else {
        data.tableColumnList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }

    }
    console.debug("getFormSectionTemplate->detail-converted", data)
    return response
  });
}

/**
 *  表单区块模版-查询数据列表
 */
export const listFormSectionTemplate = (data: FormSectionTemplateType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listFormSectionTemplate->param-converted", params)
  return requestListFormSectionTemplate(params).then((response) => {
    let data = response.data
    if (data) {
// data = data.list // search方法
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
        if (row.cargoNameList) {
          row.cargoNameList = (row.cargoNameList).split(',')
        } else {
          row.cargoNameList = []
        }
        if (row.viewerRoleList) {
          row.viewerRoleList = (row.viewerRoleList).split(',')
        } else {
          row.viewerRoleList = []
        }
        if (row.editorRoleList) {
          row.editorRoleList = (row.editorRoleList).split(',')
        } else {
          row.editorRoleList = []
        }
        if (row.tableColumnList) {
          row.tableColumnList = JSON.parse(row.tableColumnList)
        } else {
          row.tableColumnList = []
        }
        if (row.varConfigList) {
          row.varConfigList = JSON.parse(row.varConfigList)
        } else {
          row.varConfigList = []
        }
      }

    }
    console.debug("listFormSectionTemplate->detail-converted", data)
    return response
  });
}
