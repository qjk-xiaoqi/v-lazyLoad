//Vue 图片懒加载

import { throttle } from './util';

export default (Vue, options = {}) => {
    // 在数组原型上添加remove方法 找到item所在的位置，并删除
    if (!Array.prototype.remove) {
        Array.prototype.remove = function (item) {
            // 如果长度为0 跳出
            if (!this.length) return;
            let index = this.indexOf(item);
            // 否则删除
            if (index > -1) {
                this.splice(index, 1);
                return this;
            }
        };
    }
    // 设置初始值
    let init = {
        // 默认图片
        default: 'http://ps.missyuan.com/uploads/allimg/120703/1F4543522-0.jpg'
    };
    // 要显示的图片列表
    let listenList = [];
    // 已经加载过的图片地址
    let alredyArray = [];
    // 判断是否加载过
    const isAlredyLoad = (imageSrc) => {
        if (alredyArray.indexOf(imageSrc) > -1) {
            return true;
        } else {
            return false;
        }
    };
    //检测图片是否可以加载，如果可以则进行加载
    const isCanLoad = (item) => {
        let ele = item.ele;
        let src = item.src;
        //图片距离页面顶部的距离
        let top = ele.getBoundingClientRect().top;
        //top + 10 已经进入了可视区域10像素
        if (top + 10 < window.innerHeight) {
            let image = new Image();
            image.src = src;
            image.onload = function () {
                ele.src = src;
                alredyArray.push(src);
                listenList.remove(item);
            };
            return true;
        } else {
            return false;
        }
    };
    //Vue 指令最终的方法
    const addListener = (ele, binding) => {
        //绑定的图片地址
        let imageSrc = binding.value;
        //如果已经加载过，则无需重新加载，直接将src赋值
        if (isAlredyLoad(imageSrc)) {
            ele.src = imageSrc;
            return false;
        }
        let item = {
            ele: ele,
            src: imageSrc
        };
        //图片显示默认的图片
        ele.src = init.default;
        //再看看是否可以显示此图片
        if (isCanLoad(item)) {
            return;
        };
        //否则将图片地址和元素均放入监听的lisenList里
        listenList.push(item);

        //然后开始监听页面scroll事件

        window.onscroll = () => {
            let carriedOut = throttle(function () {
                let length = listenList.length;
                for (let i = 0; i < length; i++) {
                    isCanLoad(listenList[i]);
                }
            }, 1000);
            carriedOut();
        };
    };
    Vue.directive('lazyLoad', {
        bind: addListener
    });
};
