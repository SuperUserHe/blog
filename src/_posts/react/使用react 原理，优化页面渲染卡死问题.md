---
layout: post
title: "🚀使用react 原理，优化页面渲染卡死问题"
date: 2021-06-11
category:  Coding
tags:
  - ^react
---

# 页面卡顿分析
  >在浏览器中，js 线程和渲染线程共用一个主线程
  >遇到一些复杂的计算任务时，JavaScript 运行时间过长，就会阻塞渲染线程上的任务，导致掉帧

  优化方案有很多：
  1. 拆分计算任务，匀到多帧 
  2. 通过 worker 开启多线程计算
  3. 采用 wasm 加速计算

# 拆分计算任务，匀到多帧
## React是怎么做的？
  1. React 在页面更新时，会自顶向下计算 virtual dom 上的不同处。如果计算任务耗时过长，渲染线程在 16 ms 中无法执行任务，页面会出现掉帧/卡死现象。
  2. React Fiber 解决这个问题的思路是把渲染/更新过程（递归diff）拆分成一系列小任务。每次检查树上的一小部分，做完看是否还有时间继续下一个任务，有的话继续，没有的话把自己挂起，主线程不忙的时候再继续

## 案例
执行下面的代码，浏览器会有10s左右的时间处于卡死状态：无法滚动、无法编辑、无法关闭tab

```js
      function repeat (str, count) {
           let result = ''
           for (let i = 0; i < count; i++) {
               result += str
           }
         return result;
      } 
       console.log(repeat('1', 9999999))
```
按照 fiber 的设计思想，拆分计算任务，来解决页面卡死的问题
 ```js
  const repeat = (str, count) => {
        let maxLoopCount = 999999;
        async function runTask(count, cb) {
            let taskStr = '';
            let taskResult = new Promise((rs) => {
            	// window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
                window.requestAnimationFrame(() => {
                    for (let i = 0; i < count && i < maxLoopCount; i++) {
                        taskStr += str;
                    }
                    // 拆分任务 每次执行的任务不大于maxLoopCount
                    if (count > maxLoopCount) {
                        runTask(count - maxLoopCount, (restValue) => {
                            cb && cb(taskStr + restValue);
                            rs(taskStr + restValue);
                        });
                    } else {
                        cb && cb(taskStr);
                        rs(taskStr);
                    }
                });
            });
            return taskResult;
        }
        return runTask(count);
    };
    repeat('1', 999999999).then((result) => console.log(result));
``` 

# 总结
 1. js 线程如果占用主线程太长时间，会影响页面本身的渲染任务
 2. 通过拆分 js 任务，保证在不影响渲染进程的前提下，实现js复杂任务的计算