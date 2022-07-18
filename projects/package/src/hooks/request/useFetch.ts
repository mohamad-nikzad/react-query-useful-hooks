import {useQueryClient} from 'react-query';
import {AxiosError, AxiosRequestConfig} from 'axios';
import {useQuery} from 'react-query';
import {useEffect, useState} from 'react';
import {allocateParamToString} from 'utils';
import compact from 'lodash/compact';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import merge from 'lodash/merge';
import {UseFetchProps, DynamicFetchParamsProps, UseFetchResultProps} from '../../../index';

const useFetch = ({
  axiosInstance,
  url,
  name = 'notLongTimeAvailable',
  query,
  params,
  showError = true,
  onSuccess,
  onError,
  enabled = false,
  options = {},
  staleTime = 180000,
  cacheTime = 600000
}: UseFetchProps): UseFetchResultProps => {
  const queryClient = useQueryClient();
  const prettyName = isString(name) ? name : compact(name);
  if (prettyName === 'notLongTimeAvailable') {
    staleTime = 200;
    cacheTime = 200;
  }

  const [dynamicParams, setDynamicParams] = useState<DynamicFetchParamsProps | undefined>(undefined);

  const requestConfig: AxiosRequestConfig = {
    headers: {silent: !showError},

    url: allocateParamToString(url, merge(params, dynamicParams?.params)),
    method: 'GET',
    params: merge(query, dynamicParams?.query)
  };

  const fetchData = useQuery(prettyName, () => axiosInstance(requestConfig), {
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
  });

  useEffect(() => {
    if (!isEmpty(values(dynamicParams))) {
      queryClient.setQueryData(prettyName, () => []);
      fetchData.refetch();
    }
  }, [dynamicParams]);

  const fetch = (fetchParams: DynamicFetchParamsProps) => {
    setDynamicParams(fetchParams);
  };

  const refresh = () => fetchData.remove();
  return {
    ...fetchData,
    refresh,
    fetch,
    data: fetchData?.data,
    query: merge(query, dynamicParams?.query),
    params: merge(params, dynamicParams?.params)
  };
};

export default useFetch;
