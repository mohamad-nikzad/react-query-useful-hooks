import React from 'react';
import {useFetch} from 'react-query-useful-hooks';

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
