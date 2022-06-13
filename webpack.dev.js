const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        dripdrop: path.join(__dirname, 'src', 'index.ts')
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: wwwFolder,
        },
        port: 8000,
        hot: true,
        open: false,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader'],
                include: [path.join(__dirname, 'src')],
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                use: [
                    { loader: miniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                resourceQuery: { not: [/raw/] },
                include: [path.join(__dirname, 'src/style')],
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                resourceQuery:  /raw/,
                type: 'asset/source',
                include: [path.join(__dirname, 'src/style')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                resourceQuery: { not: [/inline/] },
                type: 'asset/resource',
                generator: {
                  filename: 'images/[hash][ext][query]'
                },
                include: [path.join(__dirname, 'src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                resourceQuery:  /inline/,
                type: 'asset/inline'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.pug'],
        modules: [path.resolve(__dirname, './'), 'node_modules'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            _components: path.resolve(__dirname, 'src/components'),
            _models: path.resolve(__dirname, 'src/models'),
            _services: path.resolve(__dirname, 'src/services'),
            _pages: path.resolve(__dirname, 'src/pages')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.htm',
            inject: true,
            filename: 'index.htm'
        }),
        new miniCssExtractPlugin({
            filename: 'style-[contenthash:14].min.css'
        }),
    ]
};
