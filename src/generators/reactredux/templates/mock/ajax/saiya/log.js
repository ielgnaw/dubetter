
import gUtil from 'gulp-util';

export function response(getArgs, postArgs) {
    gUtil.log('getArgs', getArgs);
    gUtil.log('postArgs', postArgs);

    return {
        status: 0,
        msg: '提交成功',
        data: {
            x: 1,
            getArgs: getArgs,
            postArgs: postArgs
        }
    };
};

