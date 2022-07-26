import {useQueryClient} from 'react-query';

const useGetQuery = (name: Array<string | number | undefined | null> | string) => {
  const queryClient = useQueryClient();

  const getData = () => queryClient.getQueryData(name);
  const data = getData();

  return {data, getData};
};

export default useGetQuery;
