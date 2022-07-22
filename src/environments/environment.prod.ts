export const environment = {
  production: true,
  baseUrl: 'http://192.168.1.3/api/public/api/',
  siteUrl: 'http://192.168.1.3/api/',
  siteAddress: {
    one: 'http://192.168.1.3/',
    two: 'http://192.168.1.3/',
  },
  logger: true,
  pusher: {
    key: '',
    cluster: '',
  },
  captcha: {
    siteKey: '',
    secretKey: '',
  },
  socialMedia: {
    google: {
      clientId: '',
      clientSecret: ''
    },
    facebook: {
      clientId: '',
      clientSecret: ''
    },
    instagram: {
      clientId: '',
      clientSecret: ''
    }
  }
};

