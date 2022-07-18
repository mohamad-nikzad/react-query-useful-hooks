import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {allocateParamToString} from 'utils';
import merge from 'lodash/merge';
import get from 'lodash/get';
import isString from 'lodash/isString';
import compact from 'lodash/compact';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import {AxiosError, AxiosRequestConfig} from 'axios';
import values from 'lodash/values';
import without from 'lodash/without';
import {DynamicFetchPaginateParamsProps, UsePaginateProps, UsePaginateResultProps} from '../../../index';

const usePagination = ({
  axiosInstance,
  name = 'notLongTimeAvailable',
  url,
  page = 1,
  perPage,
  query,
  search,
  params,
  onSuccess,
  onError,
  enabled = false,
  staleTime = 180000,
  cacheTime = 600000,
  options
}: UsePaginateProps): UsePaginateResultProps => {
  const [dynamicParams, setDynamicParams] = useState<DynamicFetchPaginateParamsProps | undefined>(undefined);
  let prettyName: Array<string | number | undefined | null> | string = isString(name) ? name : compact(name);

  if (
    prettyName === 'notLongTimeAvailable' ||
    !isEmpty(without(values(merge(search, dynamicParams?.search)), undefined, null))
  ) {
    prettyName = concat(name, ['search']);
    staleTime = 0;
    cacheTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    url: allocateParamToString(url, params),
    method: 'GET',
    params: merge(merge({page, per_page: perPage}, query), merge(search, dynamicParams?.search))
  };

  const paginateQuery = useQuery(
    without(concat(prettyName, page, perPage), undefined, null),
    () => axiosInstance(requestConfig),
    {
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
      retry: (failureCount: number, error: AxiosError): boolean => {
        if (error?.response?.status === 404 || error?.response?.status === 500) return false;
        return failureCount <= 1;
      },
      ...options
    }
  );
  const refresh = () => paginateQuery.remove();
  const data = get(paginateQuery, ['data', 'data']);

  useEffect(() => {
    if (!isEmpty(compact(values(dynamicParams)))) {
      paginateQuery.refetch();
    }
  }, [dynamicParams]);

  const fetch = (fetchParams: DynamicFetchPaginateParamsProps) => {
    setDynamicParams(fetchParams);
  };

  return {...paginateQuery, refresh, data, fetch};
};

export default usePagination;
