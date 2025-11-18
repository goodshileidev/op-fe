import React from 'react'
import {Card, Input} from 'antd'
import {SubQuestionType} from '@/common/data_type/template/sub_question'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"
import {FormVarConfigType} from '@/common/data_type/template/form_var_config';
import {FormQuestionTemplateType} from "@/common/data_type/template/form_question_template";

interface ISubQuestionFormEditorProps {
  fieldName: string,
  formQuestionTemplateId: any,
  subQuestionList?: SubQuestionType[],
  formVarConfigList?: FormVarConfigType[]
  questionVarConfigList?: FormVarConfigType[],
  formQuestionTemplate?: FormQuestionTemplateType
  addButtonType: string
  onUpdate: any,
  showAdd?: boolean,
}

const SubQuestionFormEditor: React.FC<ISubQuestionFormEditorProps> = ((props) => {
    const {t} = useTranslation();
    const fields = [
      {
        title: t("template.sub_question.title"),
        key: "title",
        componentType: "title",
        dataIndex: "title",
        render: (text: string, row: SubQuestionType, index: number) => (
          <Input placeholder={t("template.sub_question.title")}
                 value={row.title}
          />
        ),
        className: "column-title  text_center ",
      },
      {
        title: t("template.sub_question.html"),
        key: "html",
        componentType: "richedit",
        dataIndex: "html",
        componentTypeSelector: (value) => {
          /**
           *   "code_list.SubQuestionType.1": "序号",
           *   "code_list.SubQuestionType.2": "提示文字",
           *   "code_list.SubQuestionType.3": "带输入框的富文本",
           *   "code_list.SubQuestionType.4": "刷卡签名",
           *   "code_list.SubQuestionType.8": "手写签名",
           *   "code_list.SubQuestionType.5": "签名时间",
           *   "code_list.SubQuestionType.6": "图片上传",
           *   "code_list.SubQuestionType.7": "文件上传",
           */
          let result = "richedit"
          // if (value.subQuestionType === "1" || value.subQuestionType === "2") {
          //   result = "input"
          // } else if (value.subQuestionType === "4" || value.subQuestionType === "5" || value.subQuestionType === "8") {
          //   result = "hidden"
          // } else if (value.subQuestionType === "6") {
          //   result = "picture"
          // } else if (value.subQuestionType === "7") {
          //   result = "file"
          // }
          console.debug("componentTypeSelector", value, result)
          return result
        },
        render1: (text: string, row: SubQuestionType, index: number) => (
          <ReactQuill theme="snow"
                      style={{
                        height: 300,
                        marginBottom: 60
                      }}
                      value={row.html}
          />
        ),
        className: " text_center ",
      },

    ]

    const defaultFormVarConfigList = [
      {
        varName: "船名",
        varKey: "shipName"
      },
      {
        varName: "中文船名",
        varKey: "chShipname"
      },
      {
        varName: "英文船名",
        varKey: "englishShipname"
      },
      {
        varName: "船舶MMSI",
        varKey: "shipMmsi"
      },
      {
        varName: "数据日期",
        varKey: "dataDate"
      },
      {
        varName: "班次",
        varKey: "turnGroup"
      },
      {
        varName: "班组",
        varKey: "turnNo"
      },
      {
        varName: "航次",
        varKey: "VoyageNo"
      },
      {
        varName: "货名",
        varKey: "cargoName"
      },
      {
        varName: "内外贸",
        varKey: "domesticForeignTradeType"
      },
      {
        varName: "装/卸",
        varKey: "operationMode"
      },
      {
        varName: "煤盐/化工",
        varKey: "bizType"
      },
      {
        varName: "泊位",
        varKey: "portName"
      },
      {
        varName: "航次",
        varKey: "voyage_no"
      },
      {
        varName: "净吨",
        varKey: "netTonnage"
      },
      {
        varName: "总吨",
        varKey: "grossTonnag"
      },
      {
        varName: "载重吨",
        varKey: "deadweightTonnage"
      },
      {
        varName: "计划抵港时间",
        varKey: "planedArrivingTime"
      },
      {
        varName: "靠泊时间",
        varKey: "berthingTime"
      },
      {
        varName: "离泊时间",
        varKey: "departureTime"
      },
      {
        varName: "船舶MMSI", varKey: "ShipMmsi"
      },
      {
        varName: "货名", varKey: "CargoName"
      },
      {
        varName: "泊位", varKey: "PortName"
      },
      {
        varName: "净吨", varKey: "NetTonnage"
      },
      {
        varName: "总吨", varKey: "GrossTonnage"
      },
      {
        varName: "载重吨", varKey: "DeadWeightTonnage"
      },
      {
        varName: "内贸船联系方式", varKey: "contact"
      },
      {
        varName: "船名", varKey: "EnglishShipName"
      },
      {
        varName: "外贸船联系方式", varKey: "contact"
      },
      {
        varName: "保安主管", varKey: "securityAdmin"
      },
      {
        varName: "流量流速", varKey: "securityAdmin"
      },
      {
        varName: "潮汐预报1", varKey: "tideForecastVO1"
      },
      {
        varName: "潮汐预报2", varKey: "tideForecastVO2"
      },
      {
        varName: "潮汐预报3", varKey: "tideForecastVO3"
      },
      {
        varName: "高潮位-时间", varKey: "highPointTime"
      },
      {
        varName: "低潮位-时间",
        varKey: "lowPointTime"
      },
      {
        varName: "靠泊潮汐预报",
        varKey:
          "tideType"
      }
      ,
      {
        varName: "预计靠泊时流向流速",
        varKey: "hourlyCurrentForecastVO"
      }
      ,
      {
        varName: "预计靠泊时潮水流向",
        varKey:
          "directionForecastValue"
      }
      ,
      {
        varName: "预计靠泊时流速",
        varKey:
          "hourlyCurrentForecastVO"
      }

    ]
    console.debug("formVarConfigList", props.formVarConfigList)
    console.debug("questionVarConfigList", props.questionVarConfigList)
    return (
      <div>
        <Card title={t("common.title.list", {'entity': t('template.sub_question')})}
              bordered={true}>
          <DynamicForm
            addButtonType={props.addButtonType}
            title={t("common.title.edit")}
            initData={props.subQuestionList}
            formQuestionTemplateId={props.formQuestionTemplateId}
            fields={fields}
            showAdd={props.showAdd}
            fieldName={props.fieldName}
            onUpdate={props.onUpdate}
            defaultFormVarConfigList={defaultFormVarConfigList}
            questionVarConfigList={props.questionVarConfigList}
            formVarConfigList={props.formVarConfigList}
          />
        </Card>
      </div>
    )
  }
)

export default SubQuestionFormEditor;

