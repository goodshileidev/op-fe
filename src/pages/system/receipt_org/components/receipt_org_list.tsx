import React, {useEffect, useState} from 'react'
import {Space, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {Link} from 'umi'
import {listReceiptOrg, deleteReceiptOrg} from '@/common/service/system/receipt_org'
import ReceiptOrgSearch from './receipt_org_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IReceiptOrgListProps {

  onClose: any
}

const ReceiptOrgList: React.FC<IReceiptOrgListProps> = Observer((props) => {
  const [receiptOrgList, setReceiptOrgList] = useState<ReceiptOrgType[]>([]);
  const [currentReceiptOrg, setCurrentReceiptOrg] = useState<ReceiptOrgType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();



  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions:[10, 50, 100]
  });

  const fetchReceiptOrgList = async (params: any = {}) => {
    setLoading(true);

    const response = await getReceiptOrgList(params);
    const {records, total, size, current} = response.data;
    setReceiptOrgList(records);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchReceiptOrgList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    setCurrentConditions(conditions)
    fetchReceiptOrgList(conditions);
  };

  const handleTableChange = () => {
    fetchReceiptOrgList(currentConditions);
  };

  useEffect(() => {
    fetchReceiptOrgList({})
  }, []);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentReceiptOrg(row)
    if (row.receiptOrgId) {
      deleteReceiptOrg({receiptOrgId: row.receiptOrgId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchReceiptOrgList({
            pageNo: pagination.current,
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

 const columns: TableProps<ReceiptOrgType>['columns'] = []

    columns.push({align: "center",
      title: t("system.receipt_org.org_no"),
      key: "org_no",
      dataIndex: "orgNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.receipt_org.org_name"),
      key: "org_name",
      dataIndex: "orgName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.receipt_org.org_type"),
      key: "org_type",
      dataIndex: "orgType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.OrgType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.OrgType.filter((item) => (item.value===row.orgType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: ReceiptOrgType, index: number) => (
        <Space size="middle">
          <Link to={`/system/receipt_org/receipt_org_detail/${row.receiptOrgId}`}>
            <Button type="primary">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/system/receipt_org/receipt_org_edit/${row.receiptOrgId}`}>
            <Button type="primary" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
          </Link>
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e)=>confirm(e, row)}
                onCancel={cancel}
                okText={t("common.yes")}
                cancelText={t("common.no")}
              >
              <Button icon={<DeleteFilled/>}  type="link">
                {t("common.button.delete")}
              </Button>
           </Popconfirm>
        </Space>
      )
    })

  return (
      <div>
        <Card title={t("common.title.list",{'entity':t('system.receipt_org')})} bordered={true}>
          <Spin spinning={loading}>
            <Table columns={columns}
                   dataSource={receiptOrgList}
                   rowKey="receiptOrgId"
                   onChange={handleTableChange}/>
          </Spin>
        </Card>
      </div>
    )
})

export default ReceiptOrgList;
