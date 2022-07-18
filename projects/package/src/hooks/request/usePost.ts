import {AxiosError, AxiosRequestConfig} from 'axios';
import {allocateParamToString} from 'utils';
import {useMutation, useQueryClient} from 'react-query';
import merge from 'lodash/merge';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import {MutationRequestProps, UsePostProps, UsePostResultProps} from '../../../index';

const usePost = ({
  axiosInstance,
  name,
  url,
  method = 'POST',
  query,
  isMultipart,
  showError = true,
  removeQueries,
  isUrlencoded = false,
  refetchQueries,
  onSuccess,
  onError,
  options
}: UsePostProps): UsePostResultProps => {
  const queryClient = useQueryClient();

  const requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-type': isMultipart
        ? 'multipart/form-data'
        : isUrlencoded
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
      silent: !showError
    },

    url,
    method,
    params: query
  };

  const createRequest = ({body, queryParams, params}: MutationRequestProps) => {
    if (queryParams) set(requestConfig, 'params', merge(query, queryParams));
    if (params) set(requestConfig, 'url', allocateParamToString(url, params));
    set(requestConfig, 'data', body);
    return axiosInstance(requestConfig);
  };

  const mutationData = useMutation(name, createRequest, {
    retry: false,
    onSuccess: (data, variables) => {
      forEach(removeQueries, (removeQuery: Array<string | number | undefined | null> | string) =>
        queryClient.removeQueries(removeQuery)
      );
      forEach(refetchQueries, (refetchQuery: Array<string | number | undefined | null> | string) =>
        queryClient.refetchQueries(refetchQuery)
      );
      if (isFunction(onSuccess)) {
        onSuccess(data?.data, variables, variables?.params);
      }
    },
    onError: (error: AxiosError, variables) => {
      if (isFunction(onError)) {
        onError(error.request, variables, variables?.params);
      }
    },
    ...options
  });

  const post = (mutationParams: MutationRequestProps) => mutationData.mutate(mutationParams);

  return {...mutationData, post, params: mutationData.variables?.params};
};

export default usePost;
