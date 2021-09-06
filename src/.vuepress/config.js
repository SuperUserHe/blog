const path = require("path");

/**[根目录路径] */
const BATH_PATH = "/blog/";

module.exports = {
  title: "PINEHE-BLOG",

  // 网站描述
  description: '当我沉默的时候，我觉得很充实，当我开口说话，就感到了空虚。',

  base: BATH_PATH,

  locales: {
    "/": {
      lang: "en-US",
      posts: "不满足是向上的车轮。",
      home: "谦以待人，虚以接物。"
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
      nickname: "pineHe",
      description: "Happy Coding<br/>Happy Life",
      email: "jsonHe557@163.com",
      location: "Shen'zhen City, China",
      organization: "Shen'zhen Private Enterprise",

      avatar: BATH_PATH + "assets/img/pine.jpg",

      sns: {
        github: {
          account: "superuserhe",
          link: "https://github.com/superuserhe/blog"
        }
      }
    },
    head: [
      ['link', {
        rel: 'icon',
        href: BATH_PATH + "assets/img/pine.jpg"
      }], // 增加一个自定义的 favicon(网页标签的图标)
    ],

    header: {
      background: { // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        url: [
          'https://yz.lol.qq.com/v1/assets/images/mttargon-solari-prayer-shrine.jpg',
          'https://yz.lol.qq.com/v1/assets/images/mttargon-temple-of-the-solstice.jpg',
          'https://yz.lol.qq.com/v1/assets/images/mttargon-test-of-the-mountain.jpg',
          'https://yz.lol.qq.com/v1/assets/images/bilgewater-bilgewater-bay.jpg',
          'https://yz.lol.qq.com/v1/assets/images/bilgewater-the-slaughter-docks.jpg',
          'https://yz.lol.qq.com/v1/assets/images/bilgewater_serpentisles_03.jpg',
          'https://yz.lol.qq.com/v1/assets/images/bilgewater-high-and-dry.jpg',
          'https://yz.lol.qq.com/v1/assets/images/yordle_portal_03.jpg',
          'https://yz.lol.qq.com/v1/assets/images/yordle_portal_01.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/piltover-entrancetreasury.jpg',
          'https://yz.lol.qq.com/v1/assets/images/piltover_environment_01.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/zaun-depths.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/zaun-breatherstation.jpg',
          'https://yz.lol.qq.com/v1/assets/images/ionia-the-first-lands.jpg',
          'https://yz.lol.qq.com/v1/assets/images/ionia-life-as-one.jpg',
          'https://yz.lol.qq.com/v1/assets/images/ionia-an-ancient-and-respected-history.jpg',
          'https://yz.lol.qq.com/v1/assets/images/ionia-the-great-monasteries.jpg',
          'https://yz.lol.qq.com/v1/assets/images/void-the-touch-of-the-void.jpg',
          'https://yz.lol.qq.com/v1/assets/images/void-the-fall-of-icathia.jpg',
          'https://yz.lol.qq.com/v1/assets/images/void-an-unknowable-power.jpg',
          'https://yz.lol.qq.com/v1/assets/images/highlights/noxus-bastion.jpg',
          'https://yz.lol.qq.com/v1/assets/images/noxus-life-is-a-battle.jpg',
          'https://yz.lol.qq.com/v1/assets/images/noxus-and-magic.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/shurima-hierophant.jpg',
          'https://yz.lol.qq.com/v1/assets/images/shurima_marrowmark_01.jpg',
          'https://yz.lol.qq.com/v1/assets/images/shurima_cascade_01.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/shadow-isles-vaults.jpg',
          'https://yz.lol.qq.com/v1/assets/images/shadow_isles_environment_06.jpg',
          'https://yz.lol.qq.com/v1/assets/images/shadow_isles_entities_07.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/freljord-rakelstake.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/freljord-glaserport.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/demacia-templelightbringers.jpg',
          'https://yz.lol.qq.com/v1/assets/images/factions/image-gallery/demacia-grandplaza.jpg',
        ],
        useGeo: true
      },
      showTitle: true
    },

    lastUpdated: true,

    nav: [{
        text: "Home",
        link: "/",
        exact: true
      },
      {
        text: "Posts",
        link: "/posts/",
        exact: false
      },
      {
        text: "Custom Pages",
        link: "/custom-pages/",
        exact: false
      },
      {
        text: "Github",
        link: "https://github.com/superuserhe/blog"
      }
    ],

    comments: {
      owner: "pineHe",
      repo: "vuepress-blog",
      clientId: "cbda894952ba70c00666",
      clientSecret: "1ade785ca693bf3092be5e5338720d5ee43672b7",
      autoCreateIssue: false
    },

    pagination: {
      perPage: 10
    }
  }
};