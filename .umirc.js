
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva:{
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: 'myapp',
      dll: true,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  disableCSSModules : true,
  proxy: {
    '/api': {
      target: 'http://localhost:9093',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
