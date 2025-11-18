import {
  requestCreateForm,
  requestCreateTestForm,
  requestDeleteForm,
  requestDeleteUploadedFile,
  requestGetForm,
  requestGetFormByUUID,
  requestGetQrCode,
  requestListForm,
  requestSearchForm,
  requestSendEmail,
  requestUpdateForm,
  requestVerifyForm
} from "@/common/api/form/form";
import {FormType} from "@/common/data_type/form/form";

/**
 *  表单-查询数据
 */
export const searchForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchForm->param-converted", params)
  return requestSearchForm(params).then((response) => {
    let data = response.data
    if (data) {
      data = data.list // search方法
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
        if (row.displayPosition) {
          row.displayPosition = (row.displayPosition).split(',')
        } else {
          row.displayPosition = []
        }
        if (row.editableTimeOnMiniProgram) {
          row.editableTimeOnMiniProgram = JSON.parse(row.editableTimeOnMiniProgram)
        } else {
          row.editableTimeOnMiniProgram = []
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
        if (row.recipientList) {
          row.recipientList = (row.recipientList).split(',')
        } else {
          row.recipientList = []
        }
        if (row.operationMode) {
          row.operationMode = (row.operationMode).split(',')
        } else {
          row.operationMode = []
        }
        if (row.submissionSettings) {
          row.submissionSettings = JSON.parse(row.submissionSettings)
        } else {
          row.submissionSettings = []
        }
        if (row.submissionHistory) {
          row.submissionHistory = JSON.parse(row.submissionHistory)
        } else {
          row.submissionHistory = []
        }
        if (row.paramValueList) {
          row.paramValueList = JSON.parse(row.paramValueList)
        } else {
          row.paramValueList = []
        }
        if (row.varConfigList) {
          row.varConfigList = JSON.parse(row.varConfigList)
        } else {
          row.varConfigList = []
        }
        if (row.varValueList) {
          row.varValueList = JSON.parse(row.varValueList)
        } else {
          row.varValueList = []
        }
      }

    }
    console.debug("searchForm->detail-converted", data)
    return response
  });
}

/**
 *  表单-新建数据
 */
export const createForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.displayPosition) {
    params.displayPosition = (params.displayPosition).join(',')
  }
  if (params.editableTimeOnMiniProgram) {
    params.editableTimeOnMiniProgram = JSON.stringify(params.editableTimeOnMiniProgram)
  }
  if (params.viewerRoleList) {
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList) {
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList) {
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.operationMode) {
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.submissionSettings) {
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.submissionHistory) {
    params.submissionHistory = JSON.stringify(params.submissionHistory)
  }
  if (params.paramValueList) {
    params.paramValueList = JSON.stringify(params.paramValueList)
  }
  if (params.varConfigList) {
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList) {
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("createForm->param-converted", params)
  return requestCreateForm(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.displayPosition) {
        data.displayPosition = (data.displayPosition).split(',')
      } else {
        data.displayPosition = []
      }
      if (data.editableTimeOnMiniProgram) {
        data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
      } else {
        data.editableTimeOnMiniProgram = []
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
      if (data.recipientList) {
        data.recipientList = (data.recipientList).split(',')
      } else {
        data.recipientList = []
      }
      if (data.operationMode) {
        data.operationMode = (data.operationMode).split(',')
      } else {
        data.operationMode = []
      }
      if (data.submissionSettings) {
        data.submissionSettings = JSON.parse(data.submissionSettings)
      } else {
        data.submissionSettings = []
      }
      if (data.submissionHistory) {
        data.submissionHistory = JSON.parse(data.submissionHistory)
      } else {
        data.submissionHistory = []
      }
      if (data.paramValueList) {
        data.paramValueList = JSON.parse(data.paramValueList)
      } else {
        data.paramValueList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }
      if (data.varValueList) {
        data.varValueList = JSON.parse(data.varValueList)
      } else {
        data.varValueList = []
      }

    }
    console.debug("createForm->detail-converted", data)
    return response
  });
}

/**
 *  表单-更新数据
 */
export const updateForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.displayPosition) {
    params.displayPosition = (params.displayPosition).join(',')
  }
  if (params.editableTimeOnMiniProgram) {
    params.editableTimeOnMiniProgram = JSON.stringify(params.editableTimeOnMiniProgram)
  }
  if (params.viewerRoleList) {
    params.viewerRoleList = (params.viewerRoleList).join(',')
  }
  if (params.editorRoleList) {
    params.editorRoleList = (params.editorRoleList).join(',')
  }
  if (params.recipientList) {
    params.recipientList = (params.recipientList).join(',')
  }
  if (params.operationMode) {
    params.operationMode = (params.operationMode).join(',')
  }
  if (params.submissionSettings) {
    params.submissionSettings = JSON.stringify(params.submissionSettings)
  }
  if (params.submissionHistory) {
    params.submissionHistory = JSON.stringify(params.submissionHistory)
  }
  if (params.paramValueList) {
    params.paramValueList = JSON.stringify(params.paramValueList)
  }
  if (params.varConfigList) {
    params.varConfigList = JSON.stringify(params.varConfigList)
  }
  if (params.varValueList) {
    params.varValueList = JSON.stringify(params.varValueList)
  }

  console.debug("updateForm->param-converted", params)
  return requestUpdateForm(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.displayPosition) {
        data.displayPosition = (data.displayPosition).split(',')
      } else {
        data.displayPosition = []
      }
      if (data.editableTimeOnMiniProgram) {
        data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
      } else {
        data.editableTimeOnMiniProgram = []
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
      if (data.recipientList) {
        data.recipientList = (data.recipientList).split(',')
      } else {
        data.recipientList = []
      }
      if (data.operationMode) {
        data.operationMode = (data.operationMode).split(',')
      } else {
        data.operationMode = []
      }
      if (data.submissionSettings) {
        data.submissionSettings = JSON.parse(data.submissionSettings)
      } else {
        data.submissionSettings = []
      }
      if (data.submissionHistory) {
        data.submissionHistory = JSON.parse(data.submissionHistory)
      } else {
        data.submissionHistory = []
      }
      if (data.paramValueList) {
        data.paramValueList = JSON.parse(data.paramValueList)
      } else {
        data.paramValueList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }
      if (data.varValueList) {
        data.varValueList = JSON.parse(data.varValueList)
      } else {
        data.varValueList = []
      }

    }
    console.debug("updateForm->detail-converted", data)
    return response
  });
}

/**
 *  表单-削除数据
 */
export const deleteForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteForm->param-converted", params)
  return requestDeleteForm(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteForm->detail-converted", data)
    return response
  });
}


/**
 *  表单-削除数据
 */
export const deleteUploadedFile = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteUploadedFile->param-converted", params)
  return requestDeleteUploadedFile(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteUploadedFile->detail-converted", data)
    return response
  });
}

/**
 *  表单-验证访问码
 */
export const verifyForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("verifyForm->param-converted", params)
  return requestVerifyForm(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("verifyForm->detail-converted", data)
    return response
  });
}


/**
 *  表单-发送邮箱
 */
export const sendEmail = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("sendEmail->param-converted", params)
  return requestSendEmail(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("sendEmail->detail-converted", data)
    return response
  });
}

/**
 *  表单-创建测试表单
 */
export const createTestForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("createTestForm->param-converted", params)
  return requestCreateTestForm(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createTestForm->detail-converted", data)
    return response
  });
}


/**
 *  表单-取得数据
 */
export const getForm = (formId: string) => {
  return requestGetForm(formId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {
      if (data.displayPosition) {
        data.displayPosition = (data.displayPosition).split(',')
      } else {
        data.displayPosition = []
      }
      if (data.editableTimeOnMiniProgram) {
        data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
      } else {
        data.editableTimeOnMiniProgram = []
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
      if (data.recipientList) {
        data.recipientList = (data.recipientList).split(',')
      } else {
        data.recipientList = []
      }
      if (data.operationMode) {
        data.operationMode = (data.operationMode).split(',')
      } else {
        data.operationMode = []
      }
      if (data.submissionSettings) {
        data.submissionSettings = JSON.parse(data.submissionSettings)
      } else {
        data.submissionSettings = []
      }
      if (data.submissionHistory) {
        data.submissionHistory = JSON.parse(data.submissionHistory)
      } else {
        data.submissionHistory = []
      }
      if (data.paramValueList) {
        data.paramValueList = JSON.parse(data.paramValueList)
      } else {
        data.paramValueList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }
      if (data.varValueList) {
        data.varValueList = JSON.parse(data.varValueList)
      } else {
        data.varValueList = []
      }

    }
    console.debug("getForm->detail-converted", data)
    return response
  });
}


/**
 *  表单-取得数据
 */
export const getFormByUUID = (formId: string) => {
  return requestGetFormByUUID(formId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {
      if (data.displayPosition) {
        data.displayPosition = (data.displayPosition).split(',')
      } else {
        data.displayPosition = []
      }
      if (data.editableTimeOnMiniProgram) {
        data.editableTimeOnMiniProgram = JSON.parse(data.editableTimeOnMiniProgram)
      } else {
        data.editableTimeOnMiniProgram = []
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
      if (data.recipientList) {
        data.recipientList = (data.recipientList).split(',')
      } else {
        data.recipientList = []
      }
      if (data.operationMode) {
        data.operationMode = (data.operationMode).split(',')
      } else {
        data.operationMode = []
      }
      if (data.submissionSettings) {
        data.submissionSettings = JSON.parse(data.submissionSettings)
      } else {
        data.submissionSettings = []
      }
      if (data.submissionHistory) {
        data.submissionHistory = JSON.parse(data.submissionHistory)
      } else {
        data.submissionHistory = []
      }
      if (data.paramValueList) {
        data.paramValueList = JSON.parse(data.paramValueList)
      } else {
        data.paramValueList = []
      }
      if (data.varConfigList) {
        data.varConfigList = JSON.parse(data.varConfigList)
      } else {
        data.varConfigList = []
      }
      if (data.varValueList) {
        data.varValueList = JSON.parse(data.varValueList)
      } else {
        data.varValueList = []
      }

    }
    console.debug("getForm->detail-converted", data)
    return response
  });
}

export const getQrCode = (formId: string) => {
  return requestGetQrCode(formId).then((response) => {
    debugger
    const url = response.data;
    return url;
  });
}

/**
 *  表单-查询数据列表
 */
export const listForm = (data: FormType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listForm->param-converted", params)
  return requestListForm(params).then((response) => {
    let data = response.data
    if (data) {
// data = data.list // search方法
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
        if (row.displayPosition) {
          row.displayPosition = (row.displayPosition).split(',')
        } else {
          row.displayPosition = []
        }
        if (row.editableTimeOnMiniProgram) {
          row.editableTimeOnMiniProgram = JSON.parse(row.editableTimeOnMiniProgram)
        } else {
          row.editableTimeOnMiniProgram = []
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
        if (row.recipientList) {
          row.recipientList = (row.recipientList).split(',')
        } else {
          row.recipientList = []
        }
        if (row.operationMode) {
          row.operationMode = (row.operationMode).split(',')
        } else {
          row.operationMode = []
        }
        if (row.submissionSettings) {
          row.submissionSettings = JSON.parse(row.submissionSettings)
        } else {
          row.submissionSettings = []
        }
        if (row.submissionHistory) {
          row.submissionHistory = JSON.parse(row.submissionHistory)
        } else {
          row.submissionHistory = []
        }
        if (row.paramValueList) {
          row.paramValueList = JSON.parse(row.paramValueList)
        } else {
          row.paramValueList = []
        }
        if (row.varConfigList) {
          row.varConfigList = JSON.parse(row.varConfigList)
        } else {
          row.varConfigList = []
        }
        if (row.varValueList) {
          row.varValueList = JSON.parse(row.varValueList)
        } else {
          row.varValueList = []
        }
      }

    }
    console.debug("listForm->detail-converted", data)
    return response
  });
}
