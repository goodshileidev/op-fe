import React, { useState, useEffect } from 'react'
import { If, Then, Else } from 'react-if';
import { Button, Radio, Checkbox, Field, Rate, Tag, Cell, Uploader, Flex } from 'react-vant';
import { getFormTemplate } from '@/common/service/template/form_template'
import { listFormQuestionTemplate } from '@/common/service/template/form_question_template'
import { ClockO, Idcard } from '@react-vant/icons'
import { FormTemplateType } from "@/common/data_type/template/form_template";
import { FormQuestionTemplateType } from '@/common/data_type/template/form_question_template';
import { FormQuestionTemplateVarConfigType } from '@/common/data_type/template/form_question_template_var_config';
import { FormQuestionTemplateTextItemType } from '@/common/data_type/template/form_question_template_text_item';


const preview: React.FC = ((props) => {
    const [arrowShow, setArrowShow] = useState(false)
    const [formTemplateId, setFormTemplateId] = useState<any>()
    const [formTemplateData, setFormTemplateData] = useState<FormTemplateType>({})
    const [formTemplateQuestionList, setFormQuestionTemplateList] = useState<FormQuestionTemplateType[]>([])
    const [currentStep, setCurrentStep] = useState(1)

    useEffect(() => {
        if (props.formTemplateId == '' || props.formTemplateId == undefined) {
            return;
        }
        setCurrentStep(1);

        setArrowShow(false);

        setFormTemplateId(props.formTemplateId)

        fetchFormTemplateData(props.formTemplateId);

        fetchFormQuestionTemplateList(props.formTemplateId);

    }, [props]);

    const fetchFormTemplateData = async (templateId: String) => {
        const response = await getFormTemplate(templateId);
        const data = response.data ?? null;
        setFormTemplateData(data);
    }

    const fetchFormQuestionTemplateList = async (templateId) => {
        let params = {
            formTemplateId: templateId
        };
        const response = await listFormQuestionTemplate(params);
        const records = response.data;
        setFormQuestionTemplateList(records);
    }


    const changeArrowShow = () => {
        setArrowShow(!arrowShow);
    }

    const createMarkup = (htmlContent: any) => {
        return { __html: htmlContent };
    }

    const goStep = (step: any) => {
        setCurrentStep(step);
    }

    return (
        <div
            style={{
                width: '330px',
                height: '566px',
                margin: '0 auto',
                border: '2px solid',
                padding: '10px',
                "border-radius": '20px',
                'overflow-y': 'auto'
            }}
        >
            <Cell title={formTemplateData.formTemplateName} titleStyle={{ "font-weight": "bold" }} arrowDirection={arrowShow ? 'down' : 'right'} isLink onClick={changeArrowShow}>
                {currentStep}/{formTemplateQuestionList.length}
            </Cell>
            <If condition={arrowShow}>
                <Then>
                    <div style={{ margin: '10px' }}>
                        {formTemplateQuestionList.map((question, questionIndex) => (
                            <><If condition={currentStep == questionIndex + 1}>
                                <Then>
                                    <Tag type='primary' size='large' style={{ 'margin-left': '5px' }} onClick={() => goStep(questionIndex + 1)}>{questionIndex + 1}</Tag>
                                </Then>
                            </If><If condition={currentStep != questionIndex + 1}>
                                    <Then>
                                        <Tag type='primary' plain style={{ 'margin-left': '5px' }} onClick={() => goStep(questionIndex + 1)}>{questionIndex + 1}</Tag>
                                    </Then>
                                </If></>
                        ))}
                    </div>
                </Then>
            </If>
            {formTemplateQuestionList.map((question, questionIndex) => (
                <div key={"question_" + question.formQuestionTemplateId}>
                    <If condition={questionIndex + 1 == currentStep}>
                        <Then>
                            <If condition={question.sectionName != 'NA' && question.sectionName != '默认'}>
                                <Then>
                                    <Cell title={question.sectionName} titleStyle={{ "font-weight": "bold" }}></Cell>
                                </Then>
                            </If>
                            {question.questionItems.map((questionItem: { itemHtml: [], title: String }, questionItemIndex) => (
                                <div key={"questionItem_" + questionItemIndex}>
                                    <Flex justify='center' align='center'>
                                        <If condition={questionItem.title != ""}>
                                            <Then>
                                                <Flex.Item span={6} style={{padding: '10px'}}>
                                                    <b>{questionItem.title}</b>
                                                </Flex.Item>
                                            </Then>
                                        </If>
                                        <Flex.Item span={questionItem.title != "" ? 16 : 24} style={{padding: '10px'}}>
                                            <If condition={questionItem.itemHtml && questionItem.itemHtml.length > 0}>
                                                <Then>
                                                    {questionItem.itemHtml.map((htmlItem: {
                                                        matchVar: any, htmlText: { __html: string | TrustedHTML; }
                                                    }, htmlIndex: any) => {
                                                        return (
                                                            <div key={"htmlItem_" + htmlIndex}>
                                                                <div dangerouslySetInnerHTML={createMarkup(htmlItem.htmlText)} ></div>
                                                                {question.varConfigs.map((configItem: FormQuestionTemplateVarConfigType, configIndex: any) => {
                                                                    return (
                                                                        <div key={"varConfig" + configIndex} style={{ margin: '5px' }}>
                                                                            <If condition={configItem.varName == htmlItem.matchVar}>
                                                                                <Then>
                                                                                    <If condition={configItem.varInputType == 'signature_card' || configItem.varInputType == 'signature_card_multi_people'}>
                                                                                        <Then>
                                                                                            <Tag type="primary" size="large">
                                                                                                <Idcard></Idcard>
                                                                                                确认刷卡
                                                                                            </Tag>
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'signature_hand'}>
                                                                                        <Then>
                                                                                            <Tag type="primary" size="large">
                                                                                                <Idcard></Idcard>
                                                                                                手写签名
                                                                                            </Tag>
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'text' || configItem.varInputType == 'label'}>
                                                                                        <Then>
                                                                                            <Field disabled
                                                                                                placeholder={configItem.varName}
                                                                                            />
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'textarea'}>
                                                                                        <Then>
                                                                                            <Field disabled type='textarea'
                                                                                                placeholder={configItem.varName}
                                                                                            />
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'date' || configItem.varInputType == 'time'}>
                                                                                        <Then>
                                                                                            <Field disabled
                                                                                                placeholder={configItem.varName}
                                                                                                leftIcon={<ClockO />}
                                                                                            />
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'rate'}>
                                                                                        <Then>
                                                                                            <Rate disabled allowHalf value={3.5} />
                                                                                        </Then>
                                                                                    </If>
                                                                                    <If condition={configItem.varInputType == 'picture' || configItem.varInputType == 'file'}>
                                                                                        <Then>
                                                                                            <Uploader disabled
                                                                                                accept='*'
                                                                                            />
                                                                                        </Then>
                                                                                    </If>

                                                                                    <If condition={configItem.varInputType == 'checkbox'}>
                                                                                        <Then>
                                                                                            <If condition={configItem.optionValues.length > 0}>
                                                                                                <Checkbox.Group>
                                                                                                    {configItem.optionValues.map((optionItem: any, optionIndex) => {
                                                                                                        return (
                                                                                                            <Checkbox key={"optionValue_" + optionItem} style={{"margin-top": "10px"}} shape="square" name={optionItem}>
                                                                                                                {optionItem}
                                                                                                            </Checkbox>
                                                                                                        )
                                                                                                    })}
                                                                                                </Checkbox.Group>
                                                                                            </If>
                                                                                            <If condition={configItem.optionValues.length == 0}>
                                                                                                <Then>
                                                                                                    <Checkbox shape="square" style={{"margin-top": "10px"}}>
                                                                                                    </Checkbox>
                                                                                                </Then>
                                                                                            </If>
                                                                                        </Then>
                                                                                    </If>

                                                                                    <If condition={configItem.varInputType == 'radio'}>
                                                                                        <Then>
                                                                                            <Radio.Group>
                                                                                                {configItem.optionValues.map((optionItem: any, optionIndex) => {
                                                                                                    return (
                                                                                                        <Radio key={"optionValue_" + optionItem} style={{"margin-top": "10px"}} name={optionItem}>
                                                                                                            {optionItem}
                                                                                                        </Radio>
                                                                                                    )
                                                                                                })}
                                                                                            </Radio.Group>
                                                                                        </Then>
                                                                                    </If>

                                                                                </Then>
                                                                            </If>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )

                                                    })}
                                                </Then>
                                            </If>
                                        </Flex.Item>
                                    </Flex>
                                </div>
                            ))}



                        </Then>
                    </If>
                </div>
            ))}
            <div style={{ 'margin': '20px' }}>
                <Button type='default' style={{ 'margin-left': '10px' }} disabled={currentStep == 1} onClick={() => goStep(currentStep - 1)}>上一页</Button>
                <Button type='primary' style={{ 'margin-left': '10px' }}>保存</Button>
                <If condition={currentStep == formTemplateQuestionList.length}>
                    <Then>
                        <Button type='primary' style={{ 'margin-left': '10px' }} >提交</Button>
                    </Then>
                </If>
                <If condition={currentStep < formTemplateQuestionList.length}>
                    <Then>
                        <Button type='primary' style={{ 'margin-left': '10px' }} onClick={() => goStep(currentStep + 1)}>下一页</Button>
                    </Then>
                </If>

            </div>
        </div>
    );
})

export default preview;
