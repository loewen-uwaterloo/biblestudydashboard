const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    devtool: 'eval-source-map',
    entry: ['./index.js'],
    output: {
        path: path.resolve(__dirname, '..', 'django', 'groupstudy_dashboard', 'static'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-decorators-legacy'],
                    presets: ['es2015', 'stage-2', 'react'],
                },
            },
        ],
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },
};
