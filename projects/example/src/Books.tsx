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
