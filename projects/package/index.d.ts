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
}

export interface DynamicFetchInfiniteParamsProps {
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
  paginateQueryOptions?: QueryOptionProps;
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

export interface UsePaginateProps {
  axiosInstance: AxiosInstance;
  name?: Array<string | number | undefined | null> | string;
  url: string;
  page: number;
  perPage?: number;
  staleTime?: number;
  cacheTime?: number;
  query?: object;
  search?: object;
  params?: object;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
  options?: QueryOptionProps;
}

export interface UsePaginateResultProps extends UseQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> {
  refresh(): void;
  fetch(fetchParams: DynamicFetchPaginateParamsProps): void;
  data: any;
  query?: object;
  params?: object;
}

export declare function useFetch(props: Omit<UseFetchProps, 'axiosInstance'>): UseFetchResultProps;
export declare function usePaginate(props: Omit<UsePaginateProps, 'axiosInstance'>): UsePaginateResultProps;
export declare function configure(options: ConfigureProps): void;

export default useFetch;
