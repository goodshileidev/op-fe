import React, {useEffect, useState} from 'react'
import {Space, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {Link} from 'umi'
import {listInternalOrg, deleteInternalOrg} from '@/common/service/system/internal_org'
import InternalOrgSearch from './internal_org_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IInternalOrgListProps {

  onClose: any
}

const InternalOrgList: React.FC<IInternalOrgListProps> = Observer((props) => {
  const [internalOrgList, setInternalOrgList] = useState<InternalOrgType[]>([]);
  const [currentInternalOrg, setCurrentInternalOrg] = useState<InternalOrgType | any>({});
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

  const fetchInternalOrgList = async (params: any = {}) => {
    setLoading(true);

    const response = await getInternalOrgList(params);
    const {records, total, size, current} = response.data;
    setInternalOrgList(records);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchInternalOrgList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    setCurrentConditions(conditions)
    fetchInternalOrgList(conditions);
  };

  const handleTableChange = () => {
    fetchInternalOrgList(currentConditions);
  };

  useEffect(() => {
    fetchInternalOrgList({})
  }, []);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentInternalOrg(row)
    if (row.internalOrgId) {
      deleteInternalOrg({internalOrgId: row.internalOrgId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchInternalOrgList({
            pageNo: pagination.current,
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

 const columns: TableProps<InternalOrgType>['columns'] = []

    columns.push({align: "center",
      title: t("system.internal_org.org_no"),
      key: "org_no",
      dataIndex: "orgNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.internal_org.org_name"),
      key: "org_name",
      dataIndex: "orgName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.internal_org.org_type"),
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

    columns.push({align: "center",
      title: t("system.internal_org.org_logo_url"),
      key: "org_logo_url",
      dataIndex: "orgLogoUrl",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: InternalOrgType, index: number) => (
        <Space size="middle">
          <Link to={`/system/internal_org/internal_org_detail/${row.internalOrgId}`}>
            <Button type="primary">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/system/internal_org/internal_org_edit/${row.internalOrgId}`}>
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
        <Card title={t("common.title.list",{'entity':t('system.internal_org')})} bordered={true}>
          <Spin spinning={loading}>
            <Table columns={columns}
                   dataSource={internalOrgList}
                   rowKey="internalOrgId"
                   onChange={handleTableChange}/>
          </Spin>
        </Card>
      </div>
    )
})

export default InternalOrgList;
