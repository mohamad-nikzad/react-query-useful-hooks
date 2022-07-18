import StaticAxios, {AxiosInstance} from 'axios';
import {useCustomFetch, useCustomInfinite, useCustomPaginate} from 'hooks';
import {
  ConfigureProps,
  QueryInfiniteOptionProps,
  QueryOptionProps,
  QueryPaginateOptionProps,
  UseFetchProps,
  UseFetchResultProps,
  UseInfiniteProps,
  UseInfiniteResultProps,
  UsePaginateProps,
  UsePaginateResultProps
} from '../index';

function makeReactQueryHooks() {
  let axiosInstance: AxiosInstance = StaticAxios;
  let fetchQueryOptions: QueryOptionProps = {};
  let paginateQueryOptions: QueryPaginateOptionProps = {};
  let infiniteQueryOptions: QueryInfiniteOptionProps = {};
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
    if (options.infiniteQueryOptions !== undefined) {
      infiniteQueryOptions = options.infiniteQueryOptions;
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

  function useInfinite(props: Omit<UseInfiniteProps, 'axiosInstance'>): UseInfiniteResultProps {
    return useCustomInfinite({
      axiosInstance,
      ...props,
      options: {
        ...infiniteQueryOptions,
        ...props.options
      }
    });
  }

  return {configure, useFetch, usePaginate, useInfinite};
}

const reactQueryHooksInstance = makeReactQueryHooks();

const {configure, useFetch, usePaginate, useInfinite} = reactQueryHooksInstance;

export {configure, useFetch, usePaginate, useInfinite};
