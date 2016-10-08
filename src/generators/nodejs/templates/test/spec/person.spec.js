/**
 * @file Person 的测试用例
 * @author ielgnaw(wuji0223@gmail.com)
 */

import chai from 'chai';
import path from 'path';

'use strict';

const Person = require(path.join(__dirname, '../../src', 'Person'));

const expect = chai.expect;

describe('Person', function () {
    this.timeout(50000);

    let person;

    beforeEach(() => {
        person = new Person('yato', 11);
    });

    describe('#name', () => {
        it('returns the name', () => {
            expect(person.name).to.equal('yato');
        });

        it('name can be changed', () => {
            person.name = 'yato1';
            expect(person.name).to.equal('yato1');
        });

        it('set error name', () => {
            try {
                person.name = {};
            }
            catch (e) {
                expect(e.toString()).to.equal('Error: "name" must be a string.');
            }
        });
    });

    describe('#age', () => {
        it('returns the age', () => {
            expect(person.age).to.equal(11);
        });

        it('age can be changed', () => {
            person.age = 33;
            expect(person.age).to.equal(33);
        });

        it('set error age', () => {
            try {
                person.age = 'aa';
            }
            catch (e) {
                expect(e.toString()).to.equal('Error: "age" must be a number.');
            }
        });
    });

    describe('#promise', () => {
        it('returns the right result', () => {
            return person.promiseVal(5).then(ret => {
                expect(ret).to.equal(6);
            });
        });
    });
});
