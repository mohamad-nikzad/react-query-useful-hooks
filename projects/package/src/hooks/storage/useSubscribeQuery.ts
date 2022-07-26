import {useQuery} from 'react-query';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import get from 'lodash/get';
import {UseSubscribeQueryProps, SubscribeDataProps} from '../../../index';

const useSubscribeQuery = ({name, subscribesDataSet}: UseSubscribeQueryProps): any => {
  const query = useQuery(name);

  const valueSubscribeDataSet = {};
  forEach(subscribesDataSet, (subscribeData: SubscribeDataProps) => {
    set(valueSubscribeDataSet, subscribeData.key, get(query, subscribeData.path));
  });

  return valueSubscribeDataSet;
};

export default useSubscribeQuery;
