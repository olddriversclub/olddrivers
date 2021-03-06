/* eslint-disable no-console */
// 创建所有页面以及重定向路由

const { resolve } = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Used to detect and prevent duplicate redirects

  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');
  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
  });

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw Error(allMarkdown.errors);
  }

  const edges = allMarkdown.data.allMarkdownRemark.edges;
  edges.forEach(edge => {
    const { slug } = edge.node.fields;
    // 只对特定文件夹下的md生效
    if (slug.includes('/docs') || slug.includes('/blog')) {
      const template = docsTemplate;
      const createArticlePage = path => {
        return createPage({
          path,
          component: template,
          context: {
            slug,
            // if is docs page
            type: slug.includes('/docs') ? '/docs/' : '/blog/',
          },
        });
      };

      // Register primary URL.
      createArticlePage(slug.replace('/index', ''));
    }
  });
  // 首页的中文版
  const indexTemplate = resolve(__dirname, '../src/pages/index.tsx');
  // 首页路由
  createPage({
    path: '/index',
    component: indexTemplate,
  });
  // 文档重定向
  createRedirect({
    fromPath: '/docs/',
    redirectInBrowser: true,
    toPath: '/docs/old-driver',
  });
  // 文档重定向
  createRedirect({
    fromPath: '/blog/',
    redirectInBrowser: true,
    toPath: '/blog/join-us',
  });
};
