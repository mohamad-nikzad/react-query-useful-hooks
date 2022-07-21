# react-query-useful-hooks

The best and useful hooks for [react-query]


![GitHub branch checks state](https://img.shields.io/github/checks-status/sinashahoveisi/react-query-useful-hooks/master?logo=github&style=plastic)
![GitHub issues](https://img.shields.io/github/issues/sinashahoveisi/react-query-useful-hooks?logo=github&style=plastic)
![GitHub](https://img.shields.io/github/license/sinashahoveisi/react-query-useful-hooks?style=plastic)
![npm](https://img.shields.io/npm/v/react-query-useful-hooks?logo=npm&style=plastic)
![Website](https://img.shields.io/website?down_message=offline&style=plastic&up_message=online&url=https%3A%2F%2Fsinasho.ir)
![GitHub language count](https://img.shields.io/github/languages/count/sinashahoveisi/react-query-useful-hooks?logo=TypeScript&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/sinashahoveisi/react-query-useful-hooks?logo=TypeScript&style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sinashahoveisi/react-query-useful-hooks?style=plastic)

## Features

- All the [axios] awesomeness you are familiar with
- Zero configuration, but configurable if needed
- One-line usage

## Installation

```sh
npm install axios react-query react-query-useful-hooks
```
> `axios` and `react-query` is a peer dependency and needs to be installed explicitly

## Quick Start

```tsx
import React from 'react';
import {useFetch} from 'react-query-useful-hooks';

import React from 'react';
import {useFetch} from 'react-query-useful-hooks';

function Todos() {
    const {isError, isFetching, data, refetch} = useFetch({
        url: 'todos/1',
        enabled: true
    });

    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error!</p>;
    return (
        <div>
            <button onClick={() => refetch()}>refetch</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Todos;
```

## API

The package exports one default export and named exports:

```tsx
import {
    useFetch, 
    useInfinite, 
    usePaginate, 
    usePost, 
    configure
} from 'react-query-useful-hooks';
```

## Configuration

Unless provided via the `configure` function, `react-query-useful-hooks` uses as defaults:

- `axios` - set axios instance. the default `axios` package export
- `queryOptions` - set [options of useQuery of react-query] to set in the options of all queries of useFetch and usePaginate
- `fetchQueryOptions` - set [options of useQuery of react-query] to set in the options of all queries of useFetch 
- `paginateQueryOptions` - set [options of useQuery of react-query] to set in the options of all queries of usePaginate
- `infiniteQueryOptions` - set [options of useInfiniteQuery of react-query] to set in the options of all queries of useInfinite
- `mutationOptions` - set [options of useMutation of react-query] to set in the options of all usePost

These defaults may not suit your needs, for example:

- you may want a common base url or timeout for axios requests
- need to customize cacheTime or staleTime
- or different behavior in onSuccess and onError requests

In such cases you can use the `configure` function to provide your custom implementation of both.

> When `configure` is used, it should be invoked once before any usages of hooks

### Example

```tsx
import { configure } from 'react-query-useful-hooks'
import axios from 'axios'

configure({
    axios: axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        timeout: 1000
    }),
    queryOptions: {
        retry: 5,
        retryDelay: 100,
        retryOnMount: false
    }
});
```

## Creator

Sina Shah Oveisi [@sinashahoveisi](https://sinasho.ir)

> I love programming and I am interested in popular frameworks or programming languages and I am currently coding with JavaScript and React framework.

---

## License
[MIT][license] © [Sina Shahoveisi][author]

[react]: http://reactjs.org

[react-query]: https://react-query-v3.tanstack.com/

[options of useQuery of react-query]: https://react-query-v3.tanstack.com/reference/useQuery

[options of useInfiniteQuery of react-query]: https://react-query-v3.tanstack.com/reference/useInfiniteQuery

[options of useMutation of react-query]: https://react-query-v3.tanstack.com/reference/useMutation

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://docs.yarn.com/cli/install

[author]: https://github.com/sinashahoveisi

[license]: https://github.com/sinashahoveisi/react-query-useful-hooks/blob/master/LICENSE