const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件

module.exports = {
	entry: {
		index: "./index.js",
	},
	output:{
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool:'source-map',
	devServer:{
	            contentBase:false,
	            host:'localhost',
	            port:'8888',
	            inline:true,//webpack官方推荐
	            watchOptions: {
	                aggregateTimeout: 2000,//浏览器延迟多少秒更新
	                poll: 1000//每秒检查一次变动
	            },
	            compress:true,//一切服务都启用gzip 压缩
	            historyApiFallback:true,//找不到页面默认跳index.html
	           // hot:true,启动热更新，必须搭配new webpack.HotModuleReplacementPlugin()插件
	            open:true,
	        },

	plugins: [
		new htmlWebpackPlugin({
            title :"this is index.html",
			filename : "index.html",
			template: './index.ejs',
			inject : "body",
			page: 'index'
        }),
       /* new MiniCssExtractPlugin({
	      　　filename: "css/[name].[chunkhash:8].css",
	     　　 chunkFilename: "[id].css"
	   }),*/
      /*  new OptimizeCssAssetsPlugin({
	         assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
	         cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
	         cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
	         canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
	    }),	*/
	    // new webpack.ProvidePlugin({$: 'jquery'})
	],
	externals:{
			jquery: '$'  //就不会打包jquery
		},
	module: {
	    rules: [
	      {
				test: /\.ejs$/,
				use: 'ejs-compiled-loader',			     
			},
	      // { test: /\.css$/, use: [ {
			    //                     loader:MiniCssExtractPlugin.loader,
			    //                     options:{
			    //                         publicPath: '../'
			    //                     }
			    //                 }"style-loader","css-loader"] },
	      { test: /\.(png|jpg|svg|webp|gif)$/, use:[{
                   loader:'url-loader',
                   options:{
                       limit:5000,
                       outputPath:'images/',
                   }
               }]},
		  { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
		  { test:/\.html$/, use:'html-withimg-loader' },
	      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
	      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
	      //{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'less-loader'] }
	      {
		  test: /\.js$/,
		  exclude: /node_modules/, // 排除该目录下的所有代码
		  loader: "babel-loader",
		  options: {
			  'presets': [
			   ['@babel/preset-env', {
			    useBuiltIns: 'usage'  //当使用 polyfill 往低版本浏览器填入一些不存在的特性时，不是全部都填入，而是根据业务代码使用到的特性去选择填入，比如这里使用了 Promise 和 map，那就只填入这两个，其它的都不用。
			 			   }]
			  ],
			  "plugins": [
				    [
				      "@babel/plugin-transform-runtime", {
				        "corejs": false,
				        "helpers": false,
				        "regenerator": false,
				        "useESModules": false
				      }
				    ]
				]
			 }
		 }
	    ]
  },
  optimization: {
		        splitChunks: {  //webpack 4+ 版本使用内置的 SplitChunksPlugin 插件
		            cacheGroups: {
		                commons: {
		                    name: 'commons',    //提取出来的文件命名
		                    chunks: 'initial',  //initial表示提取入口文件的公共部分
		                    minChunks: 2,       //表示提取公共部分最少的文件数
		                    minSize: 0          //表示提取公共部分最小的大小
		              }
		          }
		      }
		  }

}