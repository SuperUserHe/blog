const path = require("path");

/**[根目录路径] */
const BATH_PATH = "/blog/";

module.exports = {
  title: "David-Blog",

  description: "a user blog",

  base: BATH_PATH,

  locales: {
    "/": {
      lang: "en-US"
    }
  },

  evergreen: true,

  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-132770851-2"
      }
    ]
  ],

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vssue)[\\/]/,
            name: "vendor.vue",
            chunks: "all"
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: "vendor.commons",
            chunks: "all"
          }
        }
      });
    }
  },

  theme: path.resolve(__dirname, "../../lib"),

  themeConfig: {
    // lang: require(path.resolve(__dirname, '../../lib/langs/en-US')),
    lang: require(path.resolve(__dirname, "../../lib/langs/zh-CN")),
    // lang: require(path.resolve(__dirname, '../../lib/langs/pt-BR')),

    /**[个人信息] */
    personalInfo: {
      nickname: "David",
      description: "Happy Coding<br/>Happy Life",
      email: "david_weiwenwen@163.com",
      location: "Shen'zhen City, China",
      organization: "Shen'zhen Private Enterprise",

      avatar: BATH_PATH + "assets/img/David.jpg",

      sns: {
        github: {
          account: "wenwenwei",
          link: "https://github.com/wenwenwei/blog"
        }
      }
    },

    header: {
      background: {
        // url: '/assets/img/bg.jpg',
        useGeo: true
      },
      showTitle: true
    },

    lastUpdated: true,

    nav: [
      { text: "Home", link: "/", exact: true },
      {
        text: "Posts",
        link: "/posts/",
        exact: false
      },
      { text: "Custom Pages", link: "/custom-pages/", exact: false },
      {
        text: "Github",
        link: "https://github.com/wenwenwei/blog"
      }
    ],

    comments: {
      owner: "David",
      repo: "vuepress-blog",
      clientId: "cbda894952ba70c00666",
      clientSecret: "1ade785ca693bf3092be5e5338720d5ee43672b7",
      autoCreateIssue: false
    },

    pagination: {
      perPage: 5
    }
  }
};
