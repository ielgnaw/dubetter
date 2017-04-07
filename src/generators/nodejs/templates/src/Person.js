/**
 * @file Person 类
 * @author ielgnaw(wuji0223@gmail.com)
 */

export default class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    get age() {
      return this._age;
    }

    set age(value) {
        if (typeof value !== 'number') {
            throw new Error('"age" must be a number.');
        }

        this._age = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value !== 'string') {
            throw new Error('"name" must be a string.');
        }

        this._name = value;
    }

    promiseVal(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(value + 1);
            }, 1000);
        });
    }
}
