/**
 * @file dev env
 * @author ielgnaw <wuji0223@gmail.com>
 */

import merge from 'webpack-merge';
import prodEnv from './prod.env';

export default merge(prodEnv, {
    'NODE_ENV': JSON.stringify('development')
});
