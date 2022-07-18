import React from 'react';
import {useFetch} from 'react-query-hooks';

function Books() {
  const sina = useFetch({
    url: 'todos/1',
    enabled: true
  });
  console.log(sina);
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default Books;
