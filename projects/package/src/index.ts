import StaticAxios, {AxiosInstance} from 'axios';
import useCustomFetch from './hooks/request/useFetch';
import {ConfigureProps, QueryOptionProps, UseFetchProps, UseFetchResultProps} from '../index';

function makeReactQueryHooks() {
  let axiosInstance: AxiosInstance = StaticAxios;
  let fetchQueryOptions: QueryOptionProps = {};
  let queryOptions: QueryOptionProps = {};

  function configure(options: ConfigureProps) {
    if (options.axios !== undefined) {
      axiosInstance = options.axios;
    }
    if (options.fetchQueryOptions !== undefined) {
      fetchQueryOptions = options.fetchQueryOptions;
    }
    if (options.queryOptions !== undefined) {
      queryOptions = options.queryOptions;
    }
  }

  function useFetch(props: Omit<UseFetchProps, 'axiosInstance'>): UseFetchResultProps {
    return useCustomFetch({
      axiosInstance,
      ...props,
      options: {
        ...queryOptions,
        ...fetchQueryOptions,
        ...props.options
      }
    });
  }

  return {configure, useFetch};
}

const reactQueryHooksInstance = makeReactQueryHooks();

const {configure, useFetch} = reactQueryHooksInstance;

export {configure, useFetch};
