# react-query-hooks

> The best and useful hooks for react-query



![GitHub branch checks state](https://img.shields.io/github/checks-status/sinashahoveisi/react-query-hooks/master?logo=github&style=plastic)
![GitHub issues](https://img.shields.io/github/issues/sinashahoveisi/react-query-hooks?logo=github&style=plastic)
![GitHub](https://img.shields.io/github/license/sinashahoveisi/react-query-hooks?style=plastic)
![npm](https://img.shields.io/npm/v/react-query-hooks?logo=npm&style=plastic)
![Website](https://img.shields.io/website?down_message=offline&style=plastic&up_message=online&url=https%3A%2F%2Fsinasho.ir)
![GitHub language count](https://img.shields.io/github/languages/count/sinashahoveisi/react-query-hooks?logo=TypeScript&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/sinashahoveisi/react-query-hooks?logo=TypeScript&style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sinashahoveisi/react-query-hooks?style=plastic)
---

## What is this?

This package is a [React] simple and useful hooks for [react-query] package.


### Table of Contents

- [Installation](#installation)
- [Api](#Api)
- [Example](#examples)
  - [Simple](#simple)
- [Demo](#demo)
- [Documentation](#documentation)
- [Creator](#creator)
- [License](#license)

---

## Installation
You can install this package in two ways simultaneously

install with [npm]
```sh
npm install react-query-hooks
```

install with [yarn]
```sh
yarn add react-query-hooks
```

## Api

```tsx
import {useFetch, useInfinite, usePaginate, usePost, configure} from 'react-query-hooks';
```

## Examples

### Simple

```tsx
import React from 'react';
import {useFetch} from 'react-query-hooks';

function Todos() {
  const todos = useFetch({
    url: 'todos/1',
    enabled: true
  });
  console.log(todos);
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default Todos;
```

## Creator

Sina Shah Oveisi [@sinashahoveisi](https://sinasho.ir)

> I love programming and I am interested in popular frameworks or programming languages and I am currently coding with JavaScript and React framework.

---

## License
[MIT][license] © [Sina Shahoveisi][author]

[react]: http://reactjs.org

[react-query]: https://react-query-v3.tanstack.com/

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://docs.yarn.com/cli/install

[author]: https://github.com/sinashahoveisi

[license]: https://github.com/sinashahoveisi/react-query-hooks/blob/master/LICENSE