import {AvatarDropdown, AvatarName, Footer, Question, SelectLang} from '@/components';
import {LinkOutlined} from '@ant-design/icons';
import {SettingDrawer, Settings as LayoutSettings} from '@ant-design/pro-components';
import type {RequestConfig, RunTimeLayoutConfig} from '@umijs/max';
import {history, Link} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import i18n from "@/lang/i18n"
import {localizeCodeList} from "@/common/code_list/code_list_static"
import {getCurrentUser} from "@/common/service/system/user";
import {UserType} from "@/common/data_type/system/user";
import {message} from "antd";
import escapeAuthCheckList from "@/escape_authcheck";
import 'quill-better-table/dist/quill-better-table.css';
import 'react-quill/dist/quill.snow.css';


const isDev = process.env.NODE_ENV === 'development';

localizeCodeList(i18n.t)
const loginPath = '/user/login';

/**
 * 获取初始状态
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserType;
  loading?: boolean;
  fetchUserInfo?: () => Promise<UserType | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUser();
      console.debug("fetchUserInfo", response)
      return response.data;
    } catch (error) {
      message.error("获取用户权限信息失败")
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  // const {location} = history;
  // if (![loginPath, '/user/register', '/user/register-result'].includes(location.pathname)) {
  //   const currentUser = await fetchUserInfo();
  //   console.debug("fetchUserInfo-1", currentUser)
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings as Partial<LayoutSettings>,
  //   };
  // }
  let needAuthCheck = true
  let matched = ""
  for (const idx in escapeAuthCheckList) {
    const escapeKeyword = escapeAuthCheckList[idx]
    if (location.href.indexOf(escapeKeyword) > -1) {
      needAuthCheck = false;
      matched = escapeKeyword
      break
    }
  }
  console.debug("fetchUserInfo,needAuthCheck:", needAuthCheck)
  const currentUser = needAuthCheck ? await fetchUserInfo() : {};
  localStorage.setItem("current_login_user", JSON.stringify(currentUser))
  console.debug("fetchUserInfo-2", location.href, escapeAuthCheckList, matched, needAuthCheck, currentUser)
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    actionsRender: () => [<Question key="doc"/>, <SelectLang key="SelectLang"/>],
    avatarProps: {
      src: initialState?.currentUser?.avatarUrl,
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName, // 设置背景水印
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      // 不进行登录检查
      // if (!initialState?.currentUser) {
      //   history.push(loginPath);
      // }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
