import {FormVarConfigType} from '@/common/data_type/template/form_var_config';
import {Collapse, Select} from 'antd';
import React, {useCallback, useEffect, useRef, useState} from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import QuillBetterTable from 'quill-better-table';
import 'quill-better-table/dist/quill-better-table.css';

// 注册表格模块
Quill.register({
  'modules/better-table': QuillBetterTable,
}, true);
// 注册插件
const {Option} = Select;
const varInfos = new Array<FormVarConfigType>();

interface SuperRichTextEditorProps {
  value?: string;
  editId: string;
  defaultFormVarConfigList: FormVarConfigType;
  formVarConfigList?: FormVarConfigType[];
  questionVarConfigList?: FormVarConfigType[];
  onChange?: (value: string) => void;
}

const BlockEmbed = Quill.import('blots/block/embed');

class VarConfigBlot extends BlockEmbed {
  static create(html) {
    let node = super.create();
    node.innerHTML = html;
    return node;
  }

  static value(domNode) {
    return domNode.innerHTML;
  }
}

VarConfigBlot.blotName = 'customHTML';
VarConfigBlot.tagName = 'div';
Quill.register(VarConfigBlot);

const SuperRichTextEdit: React.FC<SuperRichTextEditorProps> = (props) => {
    const [buttonAdded, setButtonAdded] = useState(false); // 新状态，用于检查按钮是否已添加
    const quillRef = useRef(null);
    const quillTemp = useRef(null);
    const [insertMode, setInsertMode] = useState('edit');
    const [checkedVar, setCheckedVar] = useState<FormVarConfigType>();
    const formVarConfigList = props.formVarConfigList;
    const questionVarConfigList = props.questionVarConfigList;
    const defaultFormVarConfigList = props.defaultFormVarConfigList;
    const SMALL_EDITOR_HEIGHT = 400;
    const BIGGER_EDITOR_HEIGHT = 1200;
    const [editorContentHeight, setEditorContentHeight] = useState<number>(SMALL_EDITOR_HEIGHT)
    useEffect(() => {
      console.debug('SuperRichTextEdit->props.formVarConfigList', props.formVarConfigList);
    }, [questionVarConfigList]);
    useEffect(() => {
      console.debug('SuperRichTextEdit->editorContentHeight', editorContentHeight);
    }, [editorContentHeight]);

    console.debug('SuperRichTextEdit->init', formVarConfigList, questionVarConfigList);
    const addVarConfig = (varConfig: FormVarConfigType, insertMode: string) => {
      if (quillTemp.current) {
        if (varConfig !== undefined && varConfig.varName) {
          const quill = quillTemp.current;
          let htmlContent = '<b contentEditable="false">' + JSON.stringify(checkedVar) + '</b>';
          if (insertMode === 'var') {
            htmlContent = `<strong class="template-var-container-no-input" style1="color: white; background-color: red;">{{${varConfig.varName}}}</strong>`;
          } else {
            // 处理不同的输入类型
            if (varConfig.varInputType === 'radio') {
              htmlContent = `<input id="input_${varConfig.varKey}" name="${varConfig.varKey}" type="radio" data-name="${varConfig.varKey}">
                         <label for="input_${varConfig.varKey}">${varConfig.varName}</label>`;
            } else if (varConfig.varInputType === 'checkbox') {
              htmlContent = `<input id="input_${varConfig.varKey}" name="${varConfig.varKey}" type="checkbox" data-name="${varConfig.varKey}">
                         <label for="input_${varConfig.varKey}">${varConfig.varName}</label>`;
            } else {
              htmlContent = `<label for="input_${varConfig.varKey}">${varConfig.varName}</label>
                         <input id="input_${varConfig.varKey}" name="${varConfig.varKey}" type="text" data-name="${varConfig.varKey}">`;
            }
          }

          // 获取当前光标位置
          const selection = quill.getSelection(true);
          const index = selection ? selection.index : 0;

          // 插入带标签的 HTML 内容
          quill.clipboard.dangerouslyPasteHTML(index, htmlContent);

          // 设置光标位置，忽略标签，确保仅设置文本位置
          const newSelectionIndex = index + htmlContent.replace(/<[^>]+>/g, '').length;  // 去掉所有标签
          quill.setSelection(newSelectionIndex, 0);  // 将光标移动到插入内容的末尾
        }
      }
    };

    function renderDefaultFormVarButtons() {
      console.debug(
        'SuperRichTextEdit->renderDefaultFormVarButtons',
        defaultFormVarConfigList,
      );
      const buttons = []
      // buttons.push((
      //   <button className={"quill-tool-button defaultSuperRichVarButton"} onClick={() => {
      //     setEditorContentHeight(BIGGER_EDITOR_HEIGHT)
      //
      //   }}>扩大编辑区</button>
      // ))
      //
      // buttons.push((
      //   <button className={"quill-tool-button defaultSuperRichVarButton"} onClick={() => {
      //     setEditorContentHeight(SMALL_EDITOR_HEIGHT)
      //
      //   }}>缩小编辑区</button>
      // ))
      // eslint-disable-next-line guard-for-in
      for (const idx in defaultFormVarConfigList) {
        const varConfig = defaultFormVarConfigList[idx];
        // console.debug('add form varconfig', varConfig);
        buttons.push((
          <button type={"button"} className={"quill-var-button defaultSuperRichVarButton"} onClick={() => {
            addVarConfig(varConfig, 'var');
          }}>{varConfig.varName}</button>
        ))
      }
      return buttons;
    }

    function renderFormVarButtons() {
      console.debug(
        'SuperRichTextEdit->renderFormVarButtons',
        props.formVarConfigList,
      );
      const buttons = []
      // eslint-disable-next-line guard-for-in
      for (const idx in formVarConfigList) {
        const varConfig = formVarConfigList[idx];
        // console.debug('add form varconfig', varConfig);
        buttons.push((
          <button type={"button"} className={"quill-var-button defaultSuperRichVarButton"} onClick={() => {
            addVarConfig(varConfig, 'var');
          }}>{varConfig.varName}</button>
        ))
      }
      return buttons
    }

    const renderQuestionVarButtons = () => {
      console.debug(
        'SuperRichTextEdit->renderQuestionVarButtons',
        props.questionVarConfigList
      );
      const buttons = []
      for (const idx in questionVarConfigList) {
        const varConfig = questionVarConfigList[idx];
        // console.debug('add question varconfig', varConfig);
        buttons.push((
          <button type={"button"} className={"quill-var-button defaultSuperRichVarButton"} onClick={() => {
            addVarConfig(varConfig, 'var');
          }}>{varConfig.varName}</button>
        ))
      }
      return buttons
    };
    const renderButtons = () => {
      const button1 = renderFormVarButtons();
      const button2 = renderCustomVarButtons();
      const buttons = [...button1, ...button2]
      return buttons
    }
    useEffect(() => {
      if (quillTemp.current) {
        // 检查编辑器是否已加载且按钮未添加
        // registerCustomButton();
        // setButtonAdded(true); // 标记按钮已添加
      }
    }, [quillTemp.current, questionVarConfigList]); // 依赖 quillRef.current 以确保 Quill 实例化后再运行

    const handleChange = useCallback(
      (content: string) => {
        if (props.onChange) {
          props.onChange(content);
        }
      },
      [props.onChange],
    );
    useEffect(() => {
        if (quillRef.current && !buttonAdded) {
          quillTemp.current = new Quill(`#${props.editId}`, {
            theme: 'snow',
            modules: {
              toolbar: [
                // 包括'字体'，'大小'下拉选项
                [{size: ['huge', 'large', 'small', false]}],
                // 添加'块引用'、'代码块'
                [{header: ['1', '2', '3', '4']}], // 标题，键值对的形式；1、2表示标题大小
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                // 添加列表命令
                [{list: 'ordered'}, {list: 'bullet'}],
                [{indent: '-1'}, {indent: '+1'}], // 缩进
                // 添加颜色选择
                [{color: []}, {background: []}], // 下拉式的颜色选择器
                // 添加文本对齐命令
                [{align: []}],
                // 添加'清除格式'
                ['clean'],
                // ['table'],
              ],
              'better-table': {
                operationMenu: {
                  items: {
                    unmergeCells: {
                      text: 'Another unmerge cells name'
                    }
                  }
                }
              },
              keyboard: {
                bindings: QuillBetterTable.keyboardBindings
              }
            },
          })
          if (props.value) {
            if (typeof props.value === 'string') {
              quillTemp.current.root.innerHTML = props.value
            }
          }
          quillTemp.current.on('text-change', (e) => {
            handleChange(quillTemp.current.root.innerHTML); // Pass the HTML content
          });
          const quill = quillTemp.current;
          if (quill) {
            const toolbar = quill.getModule('toolbar');
            const formVarContainer = document.createElement('div');
            formVarContainer.id = 'form_var_container';
            toolbar.container.appendChild(formVarContainer);

            const button1 = document.createElement('button');
            button1.type = 'button'; // 设置按钮类型，避免触发表单提交
            // 按钮用表情符号
            button1.innerHTML = "扩大编辑区";
            button1.style = 'padding:5px;max-height:30px;;word-break: keep-all;width:120px;';
            button1.className = 'defaultSuperRichVarButton';
            button1.onclick = () => {
              setEditorContentHeight(BIGGER_EDITOR_HEIGHT)
            };
            formVarContainer.appendChild(button1);

            const button2 = document.createElement('button');
            button2.type = 'button'; // 设置按钮类型，避免触发表单提交
            // 按钮用表情符号
            button2.innerHTML = "缩小编辑区";
            button2.style = 'padding:5px;max-height:30px;;word-break: keep-all;width:120px;';
            button2.className = 'defaultSuperRichVarButton';
            button2.onclick = () => {
              setEditorContentHeight(SMALL_EDITOR_HEIGHT)
            };
            formVarContainer.appendChild(button2);
          }
          setButtonAdded(true); // 标记按钮已添加
        }
      }, [props.editId]
    )
    return (
      <div className={"super-rich-editor-container"}>
        <Collapse id={`var-button-containers_${props.editId}`}
                  className={"var-button-containers"}
                  items={[
                    {
                      key: "插入变量",
                      label: "插入变量",
                      style: {margin: '2px'},
                      children: <>
                        <div className={"var-toolbar default-form-var-toolbar"}>
                          {renderDefaultFormVarButtons()}
                        </div>
                        <div className={"var-toolbar form-var-toolbar"}>
                          {renderFormVarButtons()}
                        </div>
                        <div className={"var-toolbar question-var-toolbar"}>
                          {renderQuestionVarButtons()}
                        </div>
                      </>
                    }
                  ]}/>
        <div
          id={props.editId}
          ref={quillRef}
          style={{
            // width: 1200,
            minWidth: '800px',
            height: editorContentHeight,
            minHeight: '200px',
            marginBottom: '40px',
            paddingBottom: '40px',
          }}
        />
      </div>
    );
  }
;
export default SuperRichTextEdit;

