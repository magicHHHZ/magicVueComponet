const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')//用来解析路径相关的模块


module.exports = {//配置对象
  

  //入口

  entry:{
    xxx: path.resolve(__dirname ,'src/index.js') //入口文件的路径
  },


  //出口
  output:{
    filename:'static/js/[name].bundle.js', //可以带路径
    path:path.resolve(__dirname,'dist')
  },
  // mode:'developemt',

  //模块加载器
  module:{
    rules:[

      //处理es6 ==> es5
      {
        test: /\.js$/,//用于匹配文件,对哪些文件进行处理
        // exclude: /(node_modules|bower_components)/,
        include:[path.resolve(__dirname,'src')],//只针对哪些处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']//预设包:包含多个常用插件包的一个大包
          }
        }
      },
      //处理css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      }
    ]
  },

  //插件
  plugins:[
    new HtmlWebpackPlugin({
      template:'index.html',//将哪个页面作为模板页面处理(在根目录下查找)
      filename:'index.html'//生成页面,(在output指定的path下)
    })
  ],
  devServer:{
    open: true,//自动打开浏览器
    
  }
}