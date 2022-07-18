import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {allocateParamToString} from 'utils';
import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import concat from 'lodash/concat';
import reduce from 'lodash/reduce';
import compact from 'lodash/compact';
import isString from 'lodash/isString';
import forEach from 'lodash/forEach';
import isArray from 'lodash/forEach';
import values from 'lodash/values';
import isEmpty from 'lodash/isEmpty';
import without from 'lodash/without';
import isNumber from 'lodash/isNumber';
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  DynamicFetchInfiniteParamsProps,
  DynamicFetchPaginateParamsProps,
  UseInfiniteProps,
  UseInfiniteResultProps
} from '../../../index';

/**
 * @param url
 * @param name
 * @param infiniteKey
 * @param staticKey
 * @param query
 * @param search
 * @param params
 * @param onSuccess
 * @param onError
 * @param version
 * @param initialData
 * @param enabled
 * @param staleTime
 * @param cacheTime
 */
const useInfinite = ({
  axiosInstance,
  url,
  name = 'notLongTimeAvailable',
  infiniteKey,
  staticKey,
  query,
  search,
  params,
  onSuccess,
  onError,
  initialData,
  enabled = false,
  staleTime = 180000,
  cacheTime = 600000,
  options
}: UseInfiniteProps): UseInfiniteResultProps => {
  const [dynamicParams, setDynamicParams] = useState<DynamicFetchInfiniteParamsProps | undefined>(undefined);
  let prettyName: Array<string | number | undefined | null> | string = isString(name) ? name : compact(name);

  if (
    prettyName === 'notLongTimeAvailable' ||
    !isEmpty(without(values(merge(search, dynamicParams?.search)), undefined, null))
  ) {
    prettyName = concat(name, ['search']);
    staleTime = 0;
    cacheTime = 0;
  }
  const queryClient = useQueryClient();

  const requestConfig: AxiosRequestConfig = {
    url: allocateParamToString(url, merge(params, dynamicParams?.params)),
    method: 'GET'
  };

  const fetchData: any = ({pageParam = 1}) => {
    set(
      requestConfig,
      'params',
      merge(merge({page: pageParam}, merge(query, dynamicParams?.query)), merge(search, dynamicParams?.search))
    );
    return axiosInstance(requestConfig);
  };

  const infiniteQuery = useInfiniteQuery(prettyName, fetchData, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    keepPreviousData: false,
    enabled,
    staleTime,
    cacheTime,
    retryDelay: 5000,
    onSuccess,
    onError,
    initialData,
    retry: (failureCount: number, error: AxiosError): boolean => {
      if (error?.response?.status === 404 || error?.response?.status === 500) return false;
      return failureCount <= 1;
    },
    getPreviousPageParam: (lastPage: any) => {
      if (lastPage?.meta?.current_page > 1) return lastPage?.meta?.current_page - 1;
      return false;
    },
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.meta?.current_page < lastPage?.meta?.last_page) return lastPage?.meta?.current_page + 1;
      return false;
    },
    ...options
  });
  const refresh = () => queryClient.invalidateQueries(prettyName);

  let data: Array<any> | any = {};

  if (infiniteKey && staticKey) {
    if (isArray(staticKey)) {
      forEach(staticKey, (key: string) => {
        set(data, key, get(infiniteQuery.data, ['pages', 0, 'data', key]));
      });
    } else if (isString(staticKey)) {
      set(data, staticKey, get(infiniteQuery.data, ['pages', 0, 'data', staticKey]));
    }
    set(
      data,
      infiniteKey,
      reduce(
        infiniteQuery.data?.pages,
        (allData: Array<any>, pageData: AxiosResponse) => concat(allData, get(pageData?.data, infiniteKey)),
        []
      )
    );
  } else {
    data = reduce(
      infiniteQuery.data?.pages,
      (allData: Array<any>, pageData: AxiosResponse) => concat(allData, pageData?.data),
      []
    );
  }

  useEffect(() => {
    if (!isEmpty(compact(values(dynamicParams)))) {
      if (dynamicParams?.pageParams) {
        if (isNumber(dynamicParams?.pageParams)) infiniteQuery.fetchNextPage({pageParam: dynamicParams?.pageParams});
        else infiniteQuery.fetchNextPage();
      } else {
        queryClient.setQueryData(prettyName, () => []);
        infiniteQuery.refetch();
      }
    }
  }, [dynamicParams]);

  const fetch = (fetchParams: DynamicFetchPaginateParamsProps) => {
    setDynamicParams(fetchParams);
  };

  const fetchPage = (fetchPageParams: DynamicFetchInfiniteParamsProps) => {
    setDynamicParams(fetchPageParams);
  };

  return {
    ...infiniteQuery,
    refresh,
    fetch,
    fetchPage,
    data
  };
};

export default useInfinite;
