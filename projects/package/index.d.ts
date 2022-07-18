import {AxiosError, AxiosResponse, AxiosInstance, Method} from 'axios';
import {
  InfiniteData,
  UseQueryResult,
  UseQueryOptions,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  MutationKey
} from 'react-query';
import {UseMutationResult} from 'react-query/types/react/types';

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

export interface MutationRequestProps {
  body?: any;
  queryParams?: object;
  params?: object;
}

export type QueryOptionProps = Omit<
  UseQueryOptions<AxiosResponse<any, any>, AxiosError<unknown, any>, AxiosResponse<any, any>, any>,
  'queryKey' | 'queryFn' | 'enabled' | 'staleTime' | 'cacheTime' | 'onSuccess' | 'onError'
>;

export type QueryFetchOptionProps = Omit<
  UseQueryOptions<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    AxiosResponse<any, any>,
    string | (string | number)[]
  >,
  'queryKey' | 'queryFn' | 'enabled' | 'staleTime' | 'cacheTime' | 'onSuccess' | 'onError'
>;

export type QueryPaginateOptionProps = Omit<
  UseQueryOptions<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    AxiosResponse<any, any>,
    (string | number | null | undefined)[]
  >,
  'queryKey' | 'queryFn' | 'enabled' | 'staleTime' | 'cacheTime' | 'onSuccess' | 'onError'
>;

export type QueryInfiniteOptionProps = Omit<
  UseInfiniteQueryOptions<
    InfiniteData<AxiosResponse<any, any>>,
    AxiosError<unknown, any>,
    AxiosResponse<any, any>,
    InfiniteData<AxiosResponse<any, any>>,
    string | (string | number | null | undefined)[]
  >,
  'queryKey' | 'queryFn' | 'enabled' | 'staleTime' | 'cacheTime' | 'onSuccess' | 'onError'
>;

export type MutationOptionProps = Omit<
  UseMutationOptions<AxiosResponse<any, any>, AxiosError<unknown, any>, MutationRequestProps>,
  'mutationKey' | 'mutationFn'
>;

export interface ConfigureProps {
  axios?: AxiosInstance;
  queryOptions?: QueryOptionProps;
  fetchQueryOptions?: QueryFetchOptionProps;
  paginateQueryOptions?: QueryPaginateOptionProps;
  infiniteQueryOptions?: QueryInfiniteOptionProps;
  mutationOptions?: MutationOptionProps;
}

export interface UseFetchProps {
  axiosInstance: AxiosInstance;
  url: string;
  name?: Array<string | number | undefined | null> | string;
  query?: object;
  params?: object;
  staleTime?: number;
  cacheTime?: number;
  showError?: boolean;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
  options?: QueryFetchOptionProps;
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
  options?: QueryPaginateOptionProps;
}

export interface UsePaginateResultProps extends UseQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> {
  refresh(): void;
  fetch(fetchParams: DynamicFetchPaginateParamsProps): void;
  data: any;
  query?: object;
  params?: object;
}

export interface UseInfiniteProps {
  axiosInstance: AxiosInstance;
  url: string;
  name?: Array<string | number | undefined | null> | string;
  infiniteKey?: string;
  staticKey?: string[];
  query?: object;
  search?: object;
  params?: object;
  staleTime?: number;
  cacheTime?: number;
  initialData?: any;
  enabled?: boolean;
  onSuccess?(data: InfiniteData<AxiosResponse>): void;
  onError?(error: AxiosError): void;
  options?: QueryInfiniteOptionProps;
}

export interface UseInfiniteResultProps
  extends UseInfiniteQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> {
  refresh(): void;
  fetch(fetchParams: DynamicFetchPaginateParamsProps): void;
  fetchPage(fetchParams: DynamicFetchInfiniteParamsProps): void;
  data: any;
}

export interface UsePostProps {
  axiosInstance: AxiosInstance;
  name: MutationKey;
  url: string;
  query?: object;
  method?: Method;
  removeQueries?: Array<Array<string | number | undefined | null> | string>;
  refetchQueries?: Array<Array<string | number | undefined | null> | string>;
  isMultipart?: boolean;
  showError?: boolean;
  isUrlencoded?: boolean;
  onSuccess?(response: any, request?: any, params?: any): void;
  onError?(error: any, request?: any, params?: any): void;
  options?: MutationOptionProps;
}

export interface UsePostResultProps
  extends UseMutationResult<AxiosResponse<any, any>, AxiosError<unknown, any>, MutationRequestProps> {
  post(mutationParams: MutationRequestProps): void;
  params?: MutationRequestProps;
}

export declare function configure(options: ConfigureProps): void;

export declare function useFetch(props: Omit<UseFetchProps, 'axiosInstance'>): UseFetchResultProps;
export declare function usePaginate(props: Omit<UsePaginateProps, 'axiosInstance'>): UsePaginateResultProps;
export declare function useInfinite(props: Omit<UseInfiniteProps, 'axiosInstance'>): UseInfiniteResultProps;
export declare function usePost(props: Omit<UsePostProps, 'axiosInstance'>): UseInfiniteResultProps;

export default useFetch;
