const path = require('path');
const HtmlWebpackPluguin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPluguin({
			template: './public/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/[name].css'
		})

		// new Dotenv({
		// 	path: './.env',
		// 	safe: true,
		// 	systemvars: true,
		// 	defaults: false
		// }),

		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		REACT_APP_CLIENT_ID: JSON.stringify(
		// 			process.env.REACT_APP_CLIENT_ID
		// 		),
		// 		API_KEY: JSON.stringify(process.env.API_KEY)
		// 	}
		// })
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3005,
		open: true
	}
};
