const webfontsGenerator = require('webfonts-generator');
const fs = require('fs');

fs.readdir('assets/icon/', function (err, svgFiles) {
  let svgPath = [];

  for (var i = 0; i < svgFiles.length; i++) {
    svgPath[i] = 'assets/icon/' + svgFiles[i];
  }

  webfontsGenerator({
    files: svgPath, // 폰트화 할 벡터 이미지 경로
    dest: 'assets/font/', // 아이콘 폰트 리소스 자동생성 될 경로
    fontName: 'icon', // 이 이름으로 폰트 리소스 생성.
    // html: true, // true이면 html 미리보기(my-icons.html)를 생성
    templateOptions: {
      baseSelector: '.my-icon', // 기본 추가 클래스명
      classPrefix: 'my-icon-' // 벡터 이미지 이름과 조합하여 추가될 클래스명 (예: icon-download)
    },
    cssTemplate: webfontsGenerator.templates.scss,
    cssDest: 'assets/scss/util/_iconfont.scss',
    cssFontsUrl: '/assets/font/', // 생성된 scss 안의 font-face 경로
    // 아래 설정값이 없으면 폰트 형태가 깨짐, starter-guide
    fontHeight: 1000,
    normalize: true
  }, function (error, result) {
    if (error) {
      console.log('> Webfont Generation Fail!', error);
    } else {
      console.log('> Webfont Generation Done!');
    }
  });
});

module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'universal',
  head: {
    title: '한사랑교회',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, minimal-ui' },
      { hid: 'description', name: 'description', content: '한사랑교회 공식 홈페이지' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver', body: true },
      { src: '//dapi.kakao.com/v2/maps/sdk.js?appkey=985135908302a5d67b330c65ae80bdcd', body: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,400,700&display=swap' }
    ]
  },

  /*
  ** CSS
  */
  css: [
    'normalize.css/normalize.css',
    'swiper/dist/css/swiper.css'
  ],

  /*
   ** Modules
   */
  modules: [
    // provide path to the file with resources
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-right',
    duration: 6000
  },

  axios: {
    baseURL: 'http://192.168.0.3:4000',
    credentials: true,
    proxy: true
  },

  // proxy: {
  //   '/api/auth/login/local': { target: 'http://192.168.0.14:4000' },
  //   '/api/auth/user': { target: 'http://192.168.0.14:4000' },
  //   '/api/auth/logout': { target: 'http://192.168.0.14:4000' },
  //   '/api/posts/': { target: 'http://192.168.0.14:4000' }
  // },

  proxy: {
    '/api/': {
      target: 'http://192.168.0.3:4000',
      // pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },

  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login/local', method: 'post', propertyName: 'access_token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: false }
        },
        // tokenRequired: true,
        // tokenType: 'Bearer'
      },
      facebook: {
        client_id: '224450648663850',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
    }
  },

  styleResources: {
    scss: [
      '@/assets/scss/util/_variable.scss',
      '@/assets/scss/util/_font.scss',
      '@/assets/scss/base/_reset.scss',
      '@/assets/scss/util/_iconfont-helper.scss',
      '@/assets/scss/util/_mixin.scss',
      'sass-mq/_mq.scss',
      '@/assets/scss/_common.scss'
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~/plugins/nuxt-swiper.js', ssr: false },
    { src: '~/plugins/nuxt-rx.js' },
    // { src: '~/plugins/gsap.js', ssr: false },
    { src: '~/plugins/browser.js', ssr: false },
    { src: '~/plugins/es2015-polyfill-addon.js', ssr: false },
    { src: '~/plugins/vue-js-modal' },
    { src: '~/plugins/vee-validate' }
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      light: true,
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [],
    transpile: ['vee-validate/dist/rules'],
    postcss: {
      plugins: {
        'postcss-preset-env': {
          // stage: 0, // 모든 기능 사용
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
          ],
          autoprefixer: { grid: true }
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
