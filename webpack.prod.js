const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const imgNames = 'img/[name].[ext]';
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        dripdrop: path.join(__dirname, 'src', 'index.ts')
    },
    output: {
        publicPath: '',
        filename: '[name][hash].js',
        chunkFilename: '[name][hash].js',
        path: path.resolve(__dirname, 'dist')
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
                include: [path.join(__dirname, 'src/style')]
            },
            {
                test: /\.(css)$/,
                resourceQuery: /raw/,
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
        extensions: ['.ts', '.js', '.css','.pug'],
        modules: [path.resolve(__dirname, './'), 'node_modules'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            _components: path.resolve(__dirname, 'src/components'),
            _models: path.resolve(__dirname, 'src/models'),
            _services: path.resolve(__dirname, 'src/services'),
            _pages: path.resolve(__dirname, 'src/pages')
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,   
                }
            }),
            new CssMinimizerPlugin()
        ]
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
        new BundleAnalyzerPlugin()
    ]
};
