import {AxiosError, AxiosResponse, AxiosInstance} from 'axios';
import {UseQueryOptions, UseQueryResult} from 'react-query/types/react/types';

export interface DynamicFetchParamsProps {
  query?: object;
  params?: object;
}

export interface DynamicFetchPaginateParamsProps {
  query?: object;
  params?: object;
  search?: object;
  pageParams?: boolean | number;
}

export type QueryOptionProps = Omit<
  UseQueryOptions<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    AxiosResponse<any, any>,
    string | (string | number)[]
  >,
  'queryKey' | 'queryFn' | 'enabled' | 'staleTime' | 'cacheTime' | 'onSuccess' | 'onError'
>;

export interface ConfigureProps {
  axios?: AxiosInstance;
  fetchQueryOptions?: QueryOptionProps;
  queryOptions?: QueryOptionProps;
}

export interface UseFetchProps {
  axiosInstance: AxiosInstance;
  url: string;
  name?: Array<string | number | undefined | null> | string;
  query?: object;
  params?: object;
  version?: number;
  staleTime?: number;
  cacheTime?: number;
  showError?: boolean;
  isGeneral?: boolean;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
  options?: QueryOptionProps;
}

export interface UseFetchResultProps extends UseQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> {
  refresh(): void;
  fetch(fetchParams: DynamicFetchParamsProps): void;
  data: any;
  query?: object;
  params?: object;
}

export declare function useFetch(): any;
export declare function configure(): any;

export default useFetch;
