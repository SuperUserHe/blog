---
layout: post
title: "🚀ES6  Proxy和Reflect"
date: 2019-04-08
category:  Coding 
tags:
  - ^ECMAScript 6
---
# Proxy和Reflect
## proxy
>Proxy对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。
### 语法
>let p = new Proxy(target, handler);
#### `target`
>用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
#### `handler`
>一个对象，其属性是当执行一个操作时定义代理的行为的函数。
### `get(target, propKey, receiver)`
拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
### `set(target, propKey, value, receiver)`
拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
### `has(target, propKey)`
拦截`propKey in proxy`的操作，返回一个布尔值。
### `deleteProperty(target, propKey)`
拦截`delete proxy[propKey]`的操作，返回一个布尔值。
### `ownKeys(target)`
```js
//原始对象 obj
let obj = {
  time:'2017-02-12',
  name:'net',
  _r:123,
};
//新成一个对象，映射obj，原始对象的代理。
let monitor = new Proxy(obj,{
  //在读取对象时,将'2017'修改为'2018'
  get(target,key){
    return target[key].replace('2017','2018');
  },
  //在设置对象时，只有key为'name'的值可被修改
  set(target,key,value){
    if(key === 'name'){
      return target[key] = value;
    }else{
      return target[key];
    }
  },
  //在key不为'name'时，拦截in操作。
  has(target,key){
    if(key === 'name'){
      return target[key];
    }else{
      return false;
    }
  },
  //含有'_'的key才可以被deleted操作符删除
  deleteProperty(target,key){
    if(key.indexOf('_')>-1){
      delete target[key];
      return true;
    }else{
      return target[key];
      return false;
    }
  },
  //拦截除了key为'time'的Object.getOwnPropertyNames(proxy)，Object.getOwnPropertySymbols(proxy)，Object.keys(proxy)
  ownKeys(target){
    return Object.keys(target).filter(item=>item!='time');
  }
});
//get
console.log(monitor.time);//对象代理 '2018-02-12'

//set
monitor.time = 1;
console.log(monitor.time);//'2018-02-12'

//has
console.log(`has:${'time' in monitor}`);//has:false
console.log(`has:${'name' in monitor}`);//has:true

//deleteProperty
delete monitor._r;
console.log(monitor);//Proxy {time: "2017-02-12", name: "net"}
delete monitor.name;
console.log(monitor);//Proxy {time: "2017-02-12", name: "net"}

//wonKeys
console.log(Object.keys(monitor));//[]
```
## Reflect
#### Reflect的所有属性和方法都是静态的,`Reflect`没有构造函数。
>new Reflect() //错误的写法
### 设计目地
- 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
- 修改某些Object方法的返回结果，让其变得更合理。
- 让Object操作都变成函数行为。
- Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

### 方法 (get, set, has, deleteProperty, ownKeys)
```js
let obj={
  time:'2017-03-11',
  name:'net',
  _r:123
};

//get
console.log('Reflect get',Reflect.get(obj,'time'));//Reflect get 2017-03-11

//set
Reflect.set(obj,'name','Reflect');
console.log(obj);//{time: "2017-03-11", name: "Reflect", _r: 123}

//has
console.log('has',Reflect.has(obj,'name'));//true

//deleteProperty
Reflect.deleteProperty(obj,'name');
console.log(obj);//{time: "2017-03-11", _r: 123}

//ownKeys
console.log(Reflect.ownKeys(obj))//(2) ["time", "_r"]
```

## Proxy和Reflect实例
```js
//效验函数 obj 效验函数。
function validator(target,validator){
  return new Proxy(target,{//返回一个proxy代理对象
    _validator:validator,
    set(target,key,value,proxy){
      if(target.hasOwnProperty(key)){//是否含有该key值。
        let va = this._validator[key];
        if(!!va(value)){//修改的value 是否符合效验函数。

          return Reflect.set(target,key,value,proxy);//将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true
        }else{
          throw Error(`不能设置${key}到${value}`)
        }
      }else{
        throw Error(`${key}不存在`)
      }
    },
  })
};

const personCalidators = {
  name(val){
    return typeof val === 'string';
  },
  age(val){
    return typeof val === 'number' && val > 18;
  }
};

class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
    return validator(this,personCalidators);
  }
};

const person = new Person();
person.age = 19;
person.name = 'hmm';
console.log(person);//Proxy {name: "hmm", age: 19}
person.age = 10;//不能设置age到10
```
