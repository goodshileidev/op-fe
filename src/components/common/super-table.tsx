import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, CheckboxOptionType, Modal, Table, TableProps} from 'antd';
// @ts-ignore
import {CheckboxValueType} from "antd/es/checkbox/Group";

interface SuperTableProps<RecordType> extends TableProps<RecordType> {
  columns: TableProps<RecordType>['columns'];
  headTitle?: string;
  defaultVisibleColumns?: string[];
  tableKey: string;  // 用于在localStorage中存储用户的列配置
  isColumnsSelectVisible: boolean;  // 从外部传入模态框的显示状态
  setIsColumnsVisible: (visible: boolean) => void;  // 从外部控制模态框显示的方法
}

const SuperTable: React.FC<SuperTableProps<any>> = ({
                                                      columns,
                                                      headTitle,
                                                      defaultVisibleColumns,
                                                      tableKey,
                                                      isColumnsSelectVisible,
                                                      setIsColumnsVisible,
                                                      ...tableProps
                                                    }) => {
  // 初始化时从localStorage读取或使用默认列
  const loadVisibleColumns = () => {
    const savedColumns = localStorage.getItem(tableKey);
    if (savedColumns) {
      return columns!.filter(col => JSON.parse(savedColumns).includes(col.key));
    }
    return defaultVisibleColumns ? columns!.filter(col => defaultVisibleColumns.includes(col.key as string)) : columns;
  };

  const [visibleColumns, setVisibleColumns] = useState(loadVisibleColumns());

  useEffect(() => {
    // 当用户刷新页面时，重新从localStorage加载配置
    setVisibleColumns(loadVisibleColumns());
  }, [columns, tableKey, defaultVisibleColumns]);

  const handleOk = () => {
    // 保存当前的列配置到localStorage
    const currentVisibleKeys = visibleColumns!.map(col => col.key);
    localStorage.setItem(tableKey, JSON.stringify(currentVisibleKeys));
    setIsColumnsVisible(false);
  };

  const handleCancel = () => {
    setIsColumnsVisible(false);
  };

  const handleReset = () => {
    // 重置到默认配置并清除localStorage
    if (defaultVisibleColumns) {
      const resetColumns = columns!.filter(col => defaultVisibleColumns.includes(col.key as string));
      setVisibleColumns(resetColumns);
      localStorage.removeItem(tableKey);
    }
  };

  const handleChange = (checkedValues: any[]) => {
    const newVisibleColumns = columns!.filter(col => checkedValues.includes(col.key));
    setVisibleColumns(newVisibleColumns);
  };

  const checkboxOptions = columns!.map(col => ({
    label: col.title,
    value: col.key,
  }));

  return (
    <Card title={headTitle} bordered={true}>
      <Table
        scroll={{x: 'max-content'}}
        columns={visibleColumns}
        {...tableProps}
      />
      <Modal
        title="选择要显示的列"
        open={isColumnsSelectVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="reset" onClick={handleReset} type="primary" danger>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            保存
          </Button>
        ]}
      >
        <Checkbox.Group
          options={checkboxOptions as CheckboxOptionType[]}
          value={visibleColumns!.map(col => col.key) as CheckboxValueType[]} // 使用 value 以反映当前状态
          onChange={handleChange}
        />
      </Modal>
    </Card>
  );
};

export default SuperTable;
