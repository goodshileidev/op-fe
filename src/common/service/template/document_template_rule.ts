import {
  requestCreateDocumentTemplateRule,
  requestDeleteDocumentTemplateRule,
  requestGetDocumentTemplateRule,
  requestSearchDocumentTemplateRule,
  requestUpdateDocumentTemplateRule
} from "@/common/api/template/document_template_rule";
import {DocumentTemplateRuleType} from "@/common/data_type/template/document_template_rule";

/**
 *  一体化表单创建规则-查询数据
 */
export const searchDocumentTemplateRule = (data: DocumentTemplateRuleType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchDocumentTemplateRule->param-converted", params)
  return requestSearchDocumentTemplateRule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchDocumentTemplateRule->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单创建规则-新建数据
 */
export const createDocumentTemplateRule = (data: DocumentTemplateRuleType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("createDocumentTemplateRule->param-converted", params)
  return requestCreateDocumentTemplateRule(params).then((response) => {
    const data = response.data
    if (data) {
    }
    console.debug("createDocumentTemplateRule->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单创建规则-更新数据
 */
export const updateDocumentTemplateRule = (data: DocumentTemplateRuleType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("updateDocumentTemplateRule->param-converted", params)
  return requestUpdateDocumentTemplateRule(params).then((response) => {
    const data = response.data
    if (data) {
    }
    console.debug("updateDocumentTemplateRule->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单创建规则-削除数据
 */
export const deleteDocumentTemplateRule = (data: DocumentTemplateRuleType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteDocumentTemplateRule->param-converted", params)
  return requestDeleteDocumentTemplateRule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteDocumentTemplateRule->detail-converted", data)
    return response
  });
}

/**
 *  一体化表单创建规则-取得数据
 */
export const getDocumentTemplateRule = (documentTemplateRuleId: string) => {
  return requestGetDocumentTemplateRule(documentTemplateRuleId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {
    }
    console.debug("getDocumentTemplateRule->detail-converted", data)
    return response
  });
}
