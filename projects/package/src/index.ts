import React from 'react';
import StaticAxios, {AxiosInstance} from 'axios';

const useAxios = makeUseAxios();

const {resetConfigure, configure} = useAxios;

export default useAxios;

export {resetConfigure, configure};

function configToObject(config) {
  if (typeof config === 'string') {
    return {
      url: config
    };
  }

  return {...config};
}

export function makeUseAxios(configureOptions) {
  let axiosInstance: AxiosInstance;
  let defaultOptions: any;

  function resetConfigure() {
    axiosInstance = StaticAxios;
  }

  function configure(options = {}) {
    if (options.axios !== undefined) {
      axiosInstance = options.axios;
    }

    if (options.defaultOptions !== undefined) {
      defaultOptions = {...DEFAULT_OPTIONS, ...options.defaultOptions};
    }
  }

  resetConfigure();
  configure(configureOptions);

  return Object.assign(useAxios, {
    resetConfigure,
    configure
  });

  function useAxios(_config, _options) {
    const config = React.useMemo(() => configToObject(_config));

    console.log(axiosInstance, defaultOptions);

    return 'sina';
  }
}
