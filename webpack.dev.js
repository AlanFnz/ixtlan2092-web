import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { join } from 'path';
export default merge(common, {
  mode: 'development', // Don't minify the source
  devtool: 'eval-source-map', // Source map for easier development
  devServer: {
    static: {
      directory: join(__dirname, './dist'), // Serve static files from here
    },
    hot: true,
  },
});

