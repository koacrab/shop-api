module.exports = {
  //favicon设置
  'favicon': {
    status: true,
  },

  //body
  'body': {
    status: false,
  },

  //控制器
  'utils': {
    status: true,
  },

  //static
  'static': {
    status: false,
    options:{
      dir: 'theme/home/',
      dynamic: true,
    }
  },

  //代理
  'proxy': {
    status: false,
  },

  //控制器
  'controllers': {
    status: true,
  },

  //body_parser
  'body_parser': {
    status: false,
  },

  //view
  'view': {
    status: true,
  },

  //router
  'router': {
    status: true,
  },

  //日志
  'logger': {
    status: false,
  },

  //cors
  'cors': {
    status: false,
  },

  //session
  'session': {
    status: false,
  },

  //skip middleware
  'skip': {
    status: false,
  },

  //http middleware
  'http': {
    status: false,
  }
};
