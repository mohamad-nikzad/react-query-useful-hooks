import StaticAxios, {AxiosInstance} from 'axios';
import {useCustomFetch, useCustomPaginate} from 'hooks';
import {
  ConfigureProps,
  QueryOptionProps,
  UseFetchProps,
  UseFetchResultProps,
  UsePaginateProps,
  UsePaginateResultProps
} from '../index';

function makeReactQueryHooks() {
  let axiosInstance: AxiosInstance = StaticAxios;
  let fetchQueryOptions: QueryOptionProps = {};
  let paginateQueryOptions: QueryOptionProps = {};
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
    if (options.paginateQueryOptions !== undefined) {
      paginateQueryOptions = options.paginateQueryOptions;
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

  function usePaginate(props: Omit<UsePaginateProps, 'axiosInstance'>): UsePaginateResultProps {
    return useCustomPaginate({
      axiosInstance,
      ...props,
      options: {
        ...queryOptions,
        ...fetchQueryOptions,
        ...paginateQueryOptions,
        ...props.options
      }
    });
  }

  return {configure, useFetch, usePaginate};
}

const reactQueryHooksInstance = makeReactQueryHooks();

const {configure, useFetch, usePaginate} = reactQueryHooksInstance;

export {configure, useFetch, usePaginate};
