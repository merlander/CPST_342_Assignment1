const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },

    plugins: [
        // To strip all locales except “en”
        new MomentLocalesPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
;
