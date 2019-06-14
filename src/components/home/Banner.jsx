import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
import BannerSVGAnim from './BannerSVGAnim';

function Banner(props) {
  const { isMobile } = props;
  return (
    <div className="banner-wrapper">
      {isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div className="title-line" style={{ transform: 'translateX(-64px)' }} />
        </div>
        <h1 key="h1">Old Drivers</h1>
        <p key="content">老司机愉快的平台</p>
        <div key="button" className="button-wrapper">
          <Link to="/docs/old-driver">
            <Button type="primary">会所</Button>
          </Link>
          <Link to="/docs/old-driver">
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              入会
            </Button>
          </Link>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="olddriversclub"
            repo="olddrivers"
          />
        </div>
      </QueueAnim>
      {!isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  );
}

export default Banner;
