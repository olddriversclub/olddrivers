/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'gatsby';
import * as utils from '../utils';
import { Row, Col, Icon, Select, Input, Menu, Button, Modal, Popover } from 'antd';

const { Option } = Select;

const key = 'antd-pro@2.0.0-notification-sent';

let docSearch: (config: any) => void;
if (typeof window !== 'undefined') {
  docSearch = require('docsearch.js'); // eslint-disable-line
}

//这个函数做文档搜索的，需要部署到公网域名并申请账号才能用
function initDocSearch(locale: 'zh-CN' | 'en-US') {
  if (!docSearch) {
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docSearch({
    apiKey: 'dfba5eddecb719460b9fd232af57748d',
    indexName: 'pro_ant_design',
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    transformData(
      hits: Array<{
        url: string;
      }>
    ) {
      hits.forEach(hit => {
        hit.url = hit.url.replace('ant.design.pro', window.location.host); // eslint-disable-line
        hit.url = hit.url.replace('https:', window.location.protocol); // eslint-disable-line
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

interface HeaderProps {
  isMobile: boolean;
  intl: any;
  location: {
    pathname: string;
  };
}
interface HeaderState {
  inputValue?: string;
  menuVisible: boolean;
  menuMode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
  searchOption?: any[];
  searching?: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    inputValue: undefined,
    menuVisible: false,
    menuMode: 'horizontal',
  };

  searchInput: Input | null | undefined;

  componentDidMount() {
    //初始化搜索，这个搜索是个插件
    // const { searchInput } = this;
    // const { intl } = this.props;
    // document.addEventListener('keyup', event => {
    //   if (event.keyCode === 83 && event.target === document.body) {
    //     searchInput && searchInput.focus();
    //   }
    // });
    // initDocSearch(intl.locale);
    // if (localStorage.getItem(key) !== 'true' && Date.now() < new Date('2018/9/5').getTime()) {
    //   this.infoNewVersion();
    // }
    // const {
    //   intl: { locale },
    // } = this.props;
    // initDocSearch(locale);
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }
  }
  timer: number;
  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleSelect = (value: string) => {
    window.location.href = value;
  };

  infoNewVersion = () => {
    const {
      intl: { formatMessage },
    } = this.props;
    Modal.info({
      title: formatMessage({ id: 'app.publish.title' }),
      content: (
        <div>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="Ant Design"
          />
          <p>
            {formatMessage({ id: 'app.publish.greeting' })}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={formatMessage({ id: 'app.publish.url' })}
            >
              Ant Desgin Pro {formatMessage({ id: 'app.publish.intro' })}
            </a>
            {formatMessage({ id: 'app.publish.tips' })}
            {formatMessage({ id: 'app.publish.old-version-guide' })}
            <a target="_blank" rel="noopener noreferrer" href="https://v1.pro.ant.design">
              v1.pro.ant.design
            </a>
            {formatMessage({ id: 'app.publish.old-version-tips' })}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem(key, 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  };

  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }
    window.location.href =
      currentProtocol + currentHref.replace(window.location.pathname, pathname);
  };
  render() {
    const { menuMode, menuVisible } = this.state;
    const { location, intl } = this.props;
    const path = location.pathname;

    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (/^blog/.test(path)) {
      activeMenuItem = 'blog';
    } else if (/docs/.test(path)) {
      activeMenuItem = 'docs';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }

    const menu = [
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link to="/docs/old-driver">会所</Link>
        </Menu.Item>
        <Menu.Item key="blog">
          <Link to="/blog/join-us">入会</Link>
        </Menu.Item>
      </Menu>,
    ];

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id="logo" to="/">
              <img src="../../images/logo.jpg" alt="logo" />
              <span>Old Drivers</span>
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div id="search-box">
              {/* 暂时没法用，需要有公网域名部署上线才能用 */}
              <Icon type="search" />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
                placeholder={intl.formatMessage({ id: 'app.header.search' })}
              />
            </div>
            <div className="header-meta">
              <div className="right-header">
                {/* <div id="lang">
                  <Button onClick={this.handleLangChange} size="small">
                    <FormattedMessage id="app.header.lang" />
                  </Button>
                </div> */}
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(Header);
