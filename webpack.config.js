// __dirname: 代表当前文件所在目录的绝对路径  D:\work\190719\workspace\VueComponent
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path') // 用来解析路径相关信息的模块

module.exports = { // 配置对象
  // 入口
  entry: {
    xxx: path.resolve(__dirname, 'src/index.js')
  },
  // 出口
  output: {
    filename: 'static/js/[name].bundle.js', // 可以带路径
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 引入打包文件的路径左侧以 / 开头
  },

  // 模块加载器
  module: {
    rules: [
      // 处理 ES6 ==> ES5
      {
        test: /\.js$/, // 用于匹配文件(对哪些文件进行处理)
        // exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')], // 只针对哪些处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',{
                  useBuiltIns:'usage',
                  'corejs':2
                }
              ]
            ],// 预设包: 包含多个常用插件包的一个大包
            plugins:[
              [
                'babel-plugin-component',{
                    "libraryName": 'mint-ui',// 针对mint-ui实现按需引入打包
                    "style": true //自动打包对应的css
                  }
                
              ]
            ]
          }
        }
      },
      // 处理CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[hash:7].[ext]', // 相对于output.path
              esModule: false,
            },
            
          }
        ],
        type: 'javascript/auto',
      },
      // 处理vue单文件组件模块
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 将哪个页面作为模板页面处理(在根目录查找)
      filename: 'index.html' // 生成页面(在output指定的path下)
    }),
    // new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ],
  // 开发服务器的配置
  devServer: {
    port: 8081,
    open: true, // 自动打开浏览器
    // quiet: true, // 不做太多日志输出
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
      },

      '/gh': {
        target: 'https://api.github.com', // 转发的目标地址
        pathRewrite: {
          '^/gh' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      }
    },
    historyApiFallback: true,//任意的404响应都将被替换成index.html
  },

  // 开启source-map调试
  devtool: 'eval-cheap-module-source-map',

  // 引入模块的解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
    alias: { // 路径别名(简写方式)
      'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
      '@': path.resolve(__dirname,'src'),
      '@compentents': path.resolve(__dirname,'src/compentents')
    }
  }
}