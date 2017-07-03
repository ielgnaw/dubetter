/**
 * @file ajax response
 * @author ielgnaw <wuji0223@gmail.com>
 */

export function response(getArgs, postArgs) {
    console.log('getArgs', getArgs);
    console.log('postArgs', postArgs);

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
