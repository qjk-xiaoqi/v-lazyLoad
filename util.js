// 公共的方法放在这里 例如BOM操作, 在需要用到的文件中引入此文件调用即可

/**
 * 两数之和
 *
 * @param  {} num1
 * @param  {} num2
 */
export function sum(num1, num2) {
    return num1 + num1;
}
/**
 * 节流
 *
 * @param  {} fn
 * @param  {} delay
 */
export function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0;
    let timer = null;
    // 将throttle处理结果当作函数返回
    return function () {
        // 记录本次触发回调的时间
        let now = +new Date();
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn();
            }, delay);
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now;
            fn();
        }
    };
}