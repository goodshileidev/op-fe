/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https:/ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https:/umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
        path: '/user/*',
      },
    ],
  },
  {
    path: '/sharedFormTable/:sharedFormUuidList',
    layout: false,
    name: "sharedFormTable",
    component: "./form/form/shared_form_page"
  },
  {
    path: '/sharedFormSimpleTable/:sharedFormUuidList',
    layout: false,
    name: "sharedFormSimpleTable",
    component: "./form/form/shared_form_simple_page"
  },
  {
    path: '/shareableFormTable/',
    layout: false,
    name: "shareableFormTable",
    component: "./form/form/document_form_page"
  },
  {
    path: '/viewForm/:formUuid',
    layout: false,
    name: "viewForm",
    component: "./form/form/form_view_page"
  },
  {
    path: '/printForm/:formId',
    layout: false,
    name: "printForm",
    component: "./form/form/form_print_page"
  },
  {
    path: '/viewForm2/:formUuid',
    layout: false,
    name: "viewForm2",
    component: "./form/form/form_view_page2"
  },
  {
    path: '/printForm2/:formId',
    layout: false,
    name: "printForm2",
    component: "./form/form/form_print_page2"
  },
  {
    path: '/document_detail_page/:documentId',
    name: 'document_detail_page',
    hideInMenu: "true",
    icon: 'smile',
    component: './form/document/document_detail_page',
  }, //一体化表单 详情
  {
    path: '/document_detail_page2/:documentId',
    name: 'document_detail_page',
    hideInMenu: "true",
    icon: 'smile',
    component: './form/document/document_detail_page2',
  }, //一体化表单 详情
  {
    path: '/form_detail_page/:formId',
    name: 'form_detail_page',
    hideInMenu: "true",
    icon: 'smile',
    component: './form/form/form_detail_page',
  }, //表单 详情
  {
    path: '/form_detail_page2/:formId',
    name: 'form_detail_page',
    hideInMenu: "true",
    icon: 'smile',
    component: './form/form/form_detail_page2',
  }, //表单 详情
  {
    path: '/template',
    icon: 'profile',
    name: 'template',
    access: "hasTemplate",
    routes: [
      {
        path: '/template',
        name: 'document_template_table',
        icon: 'smile',
        hideInMenu: true,
        component: './template/document_template/document_template_table'
      }, //一体化表单模版 列表
      {
        path: '/template/document_template/document_template_table',
        name: 'document_template_table',
        icon: 'smile',
        component: './template/document_template/document_template_table'
      }, //一体化表单模版 列表
      {
        path: '/template/document_template_rule/document_template_rule_table',
        name: 'document_template_rule_table',
        icon: 'smile',
        hideInMenu: true,
        component: './template/document_template_rule/document_template_rule_table'
      }, //一体化表单模版 列表
      {
        path: '/template/document_template/document_template_edit_page/:documentTemplateId',
        name: 'document_template_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/document_template/document_template_edit_page',
      }, //一体化表单模版 编辑

      {
        path: '/template/document_template/document_template_detail_page/:documentTemplateId',
        name: 'document_template_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/document_template/document_template_detail_page',
      }, //一体化表单模版 详情

      {
        path: '/template/document_template_version/document_template_version_table',
        name: 'document_template_version_table',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/document_template_version/document_template_version_table'
      }, //一体化表单模版版本 列表

      {
        path: '/template/document_template_version/document_template_version_edit/:documentTemplateVersionId',
        name: 'document_template_version_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/document_template_version/document_template_version_edit_page',
      }, //一体化表单模版版本 编辑

      {
        path: '/template/document_template_version/document_template_version_detail/:documentTemplateVersionId',
        name: 'document_template_version_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/document_template_version/document_template_version_detail_page',
      }, //一体化表单模版版本 详情
      {
        path: '/template/form_template/form_template_table',
        name: 'form_template_table',
        icon: 'smile',
        component: './template/form_template/form_template_table'
      }, //表单模版 列表
      {
        path: '/template/form_template/form_template_edit_page/:formTemplateId',
        name: 'form_template_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/form_template/form_template_edit_page',
      }, //表单模版 编辑
      {
        path: '/template/form_template/form_template_detail_page/:formTemplateId',
        name: 'form_template_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/form_template/form_template_detail_page2',
      }, //表单模版 详情
      {
        path: '/template/form_template_version/form_template_version_table',
        name: 'form_template_version_table',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/form_template_version/form_template_version_table'
      }, //表单模版版本 列表
      {
        path: '/template/form_template_version/form_template_version_edit/:formTemplateVersionId',
        name: 'form_template_version_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/form_template_version/form_template_version_edit_page',
      }, //表单模版版本 编辑

      {
        path: '/template/form_template_version/form_template_version_detail/:formTemplateVersionId',
        name: 'form_template_version_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './template/form_template_version/form_template_version_detail_page',
      }, //表单模版版本 详情
      // {
      //   path: '/template/form_question_template/form_question_template_table',
      //   name: 'form_question_template_table',
      //   icon: 'smile',
      //   component: './template/form_question_template/form_question_template_table'
      // }, //表单问题模版 列表
    ]
  },

  {
    path: '/form',
    icon: 'table',
    access: "hasForm",
    name: 'form',
    hideInMenu: true,
    routes: [
      {
        path: '/form/',
        name: 'document_table',
        icon: 'smile',
        hideInMenu: true,
        component: './form/document/document_table'
      }, //一体化表单 列表
      {
        path: '/form/document/document_table',
        name: 'document_table',
        icon: 'smile',
        component: './form/document/document_table'
      }, //一体化表单 列表

      {
        path: '/form/document/document_edit_page/:documentId',
        name: 'document_edit_page',
        icon: 'smile',
        hideInMenu: "true",
        component: './form/document/document_edit_page',
      }, //一体化表单 编辑

      {
        path: '/form/document/document_detail_page/:documentId',
        name: 'document_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/document/document_detail_page',
      }, //一体化表单 详情
      {
        path: '/form/document/document_detail_page2/:documentId',
        name: 'document_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/document/document_detail_page2',
      }, //一体化表单 详情
      {
        path: '/form/form/form_table',
        name: 'form_table',
        icon: 'smile',
        component: './form/form/form_table'
      }, //表单 列表

      {
        path: '/form/form/form_edit_page/:formId',
        name: 'form_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/form/form_edit_page',
      }, //表单 编辑

      {
        path: '/form/form/form_detail_page/:formId',
        name: 'form_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/form/form_detail_page',
      }, //表单 详情
      {
        path: '/form/form/form_detail_page2/:formId',
        name: 'form_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/form/form_detail_page2',
      }, //表单 详情
      {
        path: '/form/form_question/form_question_table',
        name: 'form_question_table',
        icon: 'smile',
        hideInMenu: "true",
        component: './form/form_question/form_question_table'
      }, //表单问题 列表

      {
        path: '/form/form_question/form_question_edit_page/:formQuestionId',
        name: 'form_question_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/form_question/form_question_edit_page',
      }, //表单问题 编辑

      {
        path: '/form/form_question/form_question_detail_page/:formQuestionId',
        name: 'form_question_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './form/form_question/form_question_detail_page',
      }, //表单问题 详情
    ]
  },

  {
    name: 'operation',
    icon: 'menuUnfoldOutlined',
    path: '/operation',
    routes: [
      {
        path: '/operation/ship_operation_document/ship_operation_document_table/huagong',
        name: 'operation_ship_operation_document_table_huagong',
        icon: 'smile',
        access: "hasHuagong",
        component: './operation/ship_operation_document/ship_operation_document_table'
      }, //船舶作业一体化表单 列表

      {
        path: '/operation/ship_operation_document/ship_operation_document_edit_page/huagong/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_edit_page_huagong',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_edit_page',
      }, //船舶作业一体化表单 编辑

      {
        path: '/operation/ship_operation_document/ship_operation_document_detail_page/huagong/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_detail_page_huagong',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_detail_page',
      }, //船舶作业一体化表单 详情


      {
        path: '/operation/ship_operation_document/ship_operation_document_table/meiyan',
        name: 'operation_ship_operation_document_table_meiyan',
        icon: 'smile',
        access: "hasMeiyan",
        component: './operation/ship_operation_document/ship_operation_document_table'
      }, //船舶作业一体化表单 列表

      {
        path: '/operation/ship_operation_document/ship_operation_document_edit_page/meiyan/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_edit_page_meiyan',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_edit_page',
      }, //船舶作业一体化表单 编辑

      {
        path: '/operation/ship_operation_document/ship_operation_document_detail_page/meiyan/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_detail_page_meiyan',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_detail_page',
      }, //船舶作业一体化表单 详情

      {
        path: '/operation/monthly_security_check/monthly_security_check_table/huagong',
        name: 'operation_monthly_security_check_table_huagong',
        icon: 'smile',
        access: "hasHuagong",
        component: './operation/monthly_security_check/monthly_security_check_table'
      }, //月度安全检查 列表
      {
        path: '/operation/monthly_security_check/monthly_security_check_table/meiyan',
        name: 'operation_monthly_security_check_table_meiyan',
        access: "hasMeiyan",
        icon: 'smile',
        component: './operation/monthly_security_check/monthly_security_check_table'
      }, //月度安全检查 列表
      // {
      //   path: '/operation/security_declare/security_declare_table/huagong',
      //   name: 'operation_security_declare_table_huagong',
      //   icon: 'smile',
      //   component: './operation/security_declare/security_declare_table'
      // }, //保安声明表单 列表
      //
      // {
      //   path: '/operation/security_declare/security_declare_table/meiyan',
      //   name: 'operation_security_declare_table_meiyan',
      //   icon: 'smile',
      //   component: './operation/security_declare/security_declare_table'
      // }, //保安声明表单 列表

      {
        path: '/operation/yuancang_operaton/yuancang_operaton_table/huagong',
        name: 'operation_yuancang_operaton_table',
        access: "hasHuagong",
        icon: 'smile',
        component: './operation/yuancang_operaton/yuancang_operaton_table'
      }, //圆仓作业表单 列表

      {
        path: '/operation/monthly_security_check/monthly_security_check_edit_page/:monthlySecurityCheckId',
        name: 'operation_monthly_security_check_edit_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/monthly_security_check/monthly_security_check_edit_page',
      }, //月度安全检查 编辑

      {
        path: '/operation/monthly_security_check/monthly_security_check_detail_page/:monthlySecurityCheckId',
        name: 'operation_monthly_security_check_detail_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/monthly_security_check/monthly_security_check_detail_page',
      }, //月度安全检查 详情

      {
        path: '/operation/yuancang_operaton/yuancang_operaton_edit_page/:yuancangOperatonId',
        name: 'operation_yuancang_operaton_edit_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/yuancang_operaton/yuancang_operaton_edit_page',
      }, //圆仓作业表单 编辑

      {
        path: '/operation/yuancang_operaton/yuancang_operaton_detail_page/:yuancangOperatonId',
        name: 'operation_yuancang_operaton_detail_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/yuancang_operaton/yuancang_operaton_detail_page',
      }, //圆仓作业表单 详情

      {
        path: '/operation/security_declare/security_declare_edit_page/:securityDeclareId',
        name: 'operation_security_declare_edit_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/security_declare/security_declare_edit_page',
      }, //保安声明表单 编辑

      {
        path: '/operation/security_declare/security_declare_detail_page/:securityDeclareId',
        name: 'operation_security_declare_detail_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/security_declare/security_declare_detail_page',
      }, //保安声明表单 详情

      {
        path: '/operation/ship_operation_document/ship_operation_document_edit_page/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_edit_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_edit_page',
      }, //船舶作业一体化表单 编辑

      {
        path: '/operation/ship_operation_document/ship_operation_document_detail_page/:shipOperationDocumentId',
        name: 'operation_ship_operation_document_detail_page',
        icon: 'smile',
        hideInMenu: true,
        component: './operation/ship_operation_document/ship_operation_document_detail_page',
      }, //船舶作业一体化表单 详情

    ],
  },

  {
    path: "/system",
    icon: "table",
    access: "hasSystem",
    name: "system",
    routes: [
      {
        path: '/system',
        name: 'user_table',
        icon: 'smile',
        hideInMenu: true,
        component: './system/user/user_table'
      }, //用户表 列表
      {
        path: '/system/user/user_table',
        name: 'user_table',
        icon: 'smile',
        component: './system/user/user_table'
      }, //用户表 列表
      {
        path: '/system/user_permission/user_permission_table',
        name: 'user_permission_table',
        icon: 'smile',
        component: './system/user_permission/user_permission_table'
      }, //用户权限 列表
    ]
  },

  {
    path: '/config',
    icon: 'setting',
    name: 'config',
    routes: [
      {
        path: '/config/industry_config/industry_config_table',
        name: 'industry_config_table',
        icon: 'smile',
        component: './config/industry_config/industry_config_table'
      }, //行业配置 列表
      {
        path: '/config/industry_config/industry_config_edit_page/:configId',
        name: 'industry_config_edit_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './config/industry_config/industry_config_edit_page',
      }, //行业配置 编辑
      {
        path: '/config/industry_config/industry_config_detail_page/:configId',
        name: 'industry_config_detail_page',
        hideInMenu: "true",
        icon: 'smile',
        component: './config/industry_config/industry_config_detail_page',
      }, //行业配置 详情
      {
        path: '/config/industry_config_version/industry_config_version_table',
        name: 'industry_config_version_table',
        icon: 'smile',
        hideInMenu: true,
        component: './config/industry_config_version/industry_config_version_table'
      }, //配置版本 列表
    ]
  },

  {
    name: 'account',
    icon: 'user',
    hideInMenu: "true",
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    path: '/',
    redirect: '/operation',
  },
  {
    component: '404',
    path: '/*',
  },
];
