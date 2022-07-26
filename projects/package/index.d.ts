import {AxiosError, AxiosResponse, AxiosInstance, Method} from 'axios';
import {
  InfiniteData,
  UseQueryResult,
  UseQueryOptions,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseMutationResult,
  MutationKey
} from 'react-query';
import {ListIterateeCustom, PropertyPath} from 'lodash';
import {QueryClient} from "react-query/core";

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
  'mutationKey' | 'mutationFn' | 'onSuccess' | 'onError'
>;

export interface updatePathList {
  objectPath?: PropertyPath;
  listPath?: PropertyPath;
}

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

export type UseFetchResultProps = UseQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> & {
  refresh(): void;
  fetch(fetchParams: DynamicFetchParamsProps): void;
  data: any;
  query?: object;
  params?: object;
};

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

export type UsePaginateResultProps = UseQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> & {
  refresh(): void;
  fetch(fetchParams: DynamicFetchPaginateParamsProps): void;
  data: any;
  query?: object;
  params?: object;
};

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

export type UseInfiniteResultProps = UseInfiniteQueryResult<AxiosResponse<any, any>, AxiosError<unknown, any>> & {
  refresh(): void;
  fetch(fetchParams: DynamicFetchPaginateParamsProps): void;
  fetchPage(fetchParams: DynamicFetchInfiniteParamsProps): void;
  data: any;
};

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

export type UsePostResultProps = UseMutationResult<
  AxiosResponse<any, any>,
  AxiosError<unknown, any>,
  MutationRequestProps
> & {
  post(mutationParams: MutationRequestProps): void;
  params?: MutationRequestProps;
};

export interface useModifyQueryProps {
  queryName: Array<string | number | undefined | null> | string;
}

export type useModifyQueryResultProps = {
  updateQuery(path: updatePathList, updateValue: any, predicate?: ListIterateeCustom<object, boolean> | number): void;
  removeQuery(): void;
  pushQuery(insertValue: any, path?: updatePathList, predicate?: ListIterateeCustom<object, boolean>): void;
  unshiftQuery(insertValue: any, path?: updatePathList, predicate?: ListIterateeCustom<object, boolean>): void;
  deleteQuery(path: updatePathList, predicate?: ListIterateeCustom<object, boolean> | number): void;
  setQuery(insertValue: any): void;
};

export type usePersistResultProps = {
  saveQuery(queryClient: QueryClient): void;
  saveData(name: string, data: any): void;
  getData(name: string): any;
  deleteData(name: string): void;
};

export declare function configure(options: ConfigureProps): void;

export declare function useFetch(props: Omit<UseFetchProps, 'axiosInstance'>): UseFetchResultProps;
export declare function usePaginate(props: Omit<UsePaginateProps, 'axiosInstance'>): UsePaginateResultProps;
export declare function useInfinite(props: Omit<UseInfiniteProps, 'axiosInstance'>): UseInfiniteResultProps;
export declare function usePost(props: Omit<UsePostProps, 'axiosInstance'>): UseInfiniteResultProps;
export declare function useModifyQuery(props: useModifyQueryProps): useModifyQueryResultProps;
export declare function usePersist(): usePersistResultProps;

export default useFetch;
