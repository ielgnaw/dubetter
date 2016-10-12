import merge from 'webpack-merge';
import devEnv from './dev.env';

export default merge(devEnv, {
    'NODE_ENV': JSON.stringify('testing')
});
