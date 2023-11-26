const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'html/index.html',
    }),
    // Copy game assets from static directory, to the webpack output
    new CopyPlugin({
      patterns: [{ from: 'static', to: 'static' }],
    }),
  ],
  entry: './src/main.ts',
  module: {
    rules: [
      {
        // Load GLSL shaders in as text
        test: /.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      },
      {
        // Process typescript
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

