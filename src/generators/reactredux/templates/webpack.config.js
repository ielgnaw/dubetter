import path from 'path';
import autoprefixer from 'autoprefixer';
import rider from 'rider';

export default {
    devtool: 'eval',
    entry: {
        main: './src/main.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    plugins: [
    ],
    postcss: [
        autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4.0']
        })
    ],
    stylus: {
        use: [rider()]
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: [path.join(__dirname, './src')],
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.js$/,
                include: [path.join(__dirname, './src')],
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!postcss!stylus'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
};
