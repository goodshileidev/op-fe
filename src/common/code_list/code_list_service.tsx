import {listFormTemplate} from "@/common/service/template/form_template"
import {listDocumentTemplate} from "@/common/service/template/document_template";


interface ItemProps {
  label: string
  value: string
  data: any
}

export const codeListService = {
  getCodeListFormTemplate: async (params: any) => {
    const response = await listFormTemplate(params)
    const codeList: ItemProps[] = []
    response.data.forEach((data: any) => {
      codeList.push({
        value: data.formTemplateId,
        label: data.formTemplateName,
        formTemplateName: data.formTemplateName,
        formTemplateNo: data.formTemplateNo,
        data: data
      })
    })
    return codeList;
  },
  getCodeListDocumentTemplate: async (params: any) => {
    const response = await listDocumentTemplate(params)
    const codeList: ItemProps[] = []
    const list = []
    if (response.list) {
      list.push(...response.list);
    } else if (response.data && response.data.list) {
      list.push(...response.data.list);
    } else if (response.data) {
      list.push(...response.data);
    }
    list.forEach((data: any) => {
      codeList.push({
        value: data.templateNo,
        label: data.templateName,
        templateNo: data.templateNo,
        templateName: data.templateName,
        data: data
      })
    })
    return codeList;
  },
}

