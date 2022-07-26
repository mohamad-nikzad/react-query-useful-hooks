import {useQuery} from 'react-query';
import {useModifyQuery} from 'hooks';

interface IGetConfig {
  name: Array<string | number | undefined | null> | string;
  data?: any;
  staleTime?: number;
  cacheTime?: number;
}
const useSetQuery = ({name, data, staleTime = Infinity, cacheTime = Infinity}: IGetConfig) => {
  const newModifyQuery = useModifyQuery({
    queryName: name
  });

  const newQuery = useQuery(name, () => data, {
    staleTime,
    cacheTime
  });

  const setData = (newData: any) => {
    newModifyQuery.setQuery(newData);
  };

  return {...newQuery, setData};
};

export default useSetQuery;
