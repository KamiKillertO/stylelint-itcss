# stylelint-itcss

[![Greenkeeper badge](https://badges.greenkeeper.io/KamiKillertO/stylelint-itcss.svg)](https://greenkeeper.io/)
![Version on npm](https://img.shields.io/npm/v/stylelint-itcss.svg)
[![Build Status](https://travis-ci.org/KamiKillertO/stylelint-itcss.svg?branch=master)](https://travis-ci.org/KamiKillertO/stylelint-itcss)

## Installation and usage

```bash
npm install --save-dev stylelint stylelint-itcss
//
yarn add --dev stylelint stylelint-itcss
```

Create the `.stylelintrc.json` config file (or open the existing one), add `stylelint-itcss` to the plugins array and the rules you need to the rules list. All rules from stylelint-itcss need to be namespaced with `itcss`.

Please refer to [stylelint docs](http://stylelint.io/user-guide/) for the detailed info on using this linter.

## Rules

⚠️ All rules are "strict" be default, but all rules accept an option `ignoreLayers` to disable them for specific layer(s) (there's a detailed explanation for each layers in this [article](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)).

|       | Rule ID                                                                                    | Description                                                             |
| :---- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
|       | [no-at-important](./src/rules/no-at-important/README.md)                                   | Disallow the use of `!important`                                        |
|       | [no-variable-declaration](./src/rules/no-variable-declaration/README.md)                   | Disallow the declaration of variables                                   |