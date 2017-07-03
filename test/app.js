/**
 * @file test
 * @author ielgnaw <wuji0223@gmail.com>
 */

/* global describe, before, it */

import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

describe('Nodejs Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/nodejs'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'nodejs-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    '.npmignore',
                    '.travis.yml',
                    'README.md',
                    'src',
                    'test'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/nodejs'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'nodejs-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    '.npmignore',
                    '.travis.yml',
                    'README.md',
                    'src',
                    'test'
                ]);
            });
    });
});

describe('React Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/react'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'react-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/react'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'react-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
});

describe('React&Smarty Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactphp'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'reactphp-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactphp'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'reactphp-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
});

describe('React Multipage Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactmulti'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'reactmulti-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactmulti'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'reactmulti-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
});

describe('React&Redux Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactredux'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'reactredux-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactredux'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'reactredux-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
});

describe('React&Redux&Smarty Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactreduxphp'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'reactreduxphp-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactreduxphp'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'reactreduxphp-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config',
                    'entry'
                ]);
            });
    });
});

describe('React&Redux&React Router Project', () => {
    it('should add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactallinone'))
            .withOptions({
                isCreateProjectDir: false,
                projectName: 'reactallinone-project',
                isInstall: false
            })
            .then(() => {
                assert.file([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
    it('should not add files', () => {
        return helpers.run(path.join(__dirname, '../src/generators/reactallinone'))
            .withOptions({
                isCreateProjectDir: true, // 为 true 说明要新增目录，所以断言应该判断不存在
                projectName: 'reactallinone-project1',
                isInstall: false
            })
            .then(() => {
                assert.noFile([
                    'package.json',
                    '.babelrc',
                    '.editorconfig',
                    '.eslintrc',
                    '.fecsrc',
                    '.gitignore',
                    '.jshintrc',
                    'index.html',
                    'README.md',
                    'src',
                    'build',
                    'mock',
                    'config'
                ]);
            });
    });
});
