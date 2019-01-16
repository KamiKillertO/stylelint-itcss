# stylelint-itcss

![Version on npm](https://img.shields.io/npm/v/kamikillerto/stylelint-itcss.svg)
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

|       | Rule ID                                                                                    | Description                                                             |
| :---- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
|       | [no-at-important](./src/rules/no-at-important/README.md)                                   | Disallow the use of `!important`                                        |