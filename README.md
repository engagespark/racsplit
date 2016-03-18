[![Build Status](https://travis-ci.org/engagespark/racsplit.svg?branch=master)](https://travis-ci.org/engagespark/racsplit)

racsplit
========
Splitter for ractive.js component files


Installation
------------
`$ npm install racsplit`


Usage
-----
```
usage: racsplit [options] <path>

 <path>            path to file

 -t, --type=TYPE   output file type, default [script], types: [css|script|modules|imports|temp]
 -h, --help        display help & usage
 -v, --version     display cli name & version

 https://github.com/engagespark/racsplit
```

Sample
------
* `$ racsplit component/sample-component.html`
* `$ racsplit --type script component/sample-component.html`

License
-------
MIT Copyright (c) 2016 engageSPARK
