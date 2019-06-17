module.exports = {
  siteMetadata: {
    title: 'Olddrivers',
    description: 'sit for Olddrivers',
    author: 'Olddrivers',
    siteUrl: `https://Olddrivers`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/docs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/blog`,
      },
    },
    // {
    //   resolve: 'gatsby-transformer-remark-antd',
    //   options: {
    //     plugins: [
    //       'gatsby-remark-header-custom-ids',
    //       'gatsby-remark-img-warpper-p',
    //       {
    //         resolve: `gatsby-remark-prismjs`,
    //         options: {
    //           noInlineHighlight: true,
    //         },
    //       },
    //     ],
    //   },
    // },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          // {
          //   resolve: `gatsby-remark-responsive-iframe`,
          //   options: {
          //     wrapperStyle: `margin-bottom: 1.0725rem`,
          //   },
          // },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-72788897-5',
    //   },
    // },
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Olddrivers',
        short_name: 'Olddrivers',
        display: 'standalone',
        start_url: './?utm_source=homescreen',
        theme_color: '#002140',
        background_color: '#001529',
        icon: 'src/images/favicon.png',
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
