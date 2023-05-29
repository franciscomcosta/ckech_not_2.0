const proxy = [
    {
      context: '/api',
      target: 'https://spm.multilaser.com.br/',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;