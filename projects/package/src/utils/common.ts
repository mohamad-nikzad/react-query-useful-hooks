import lodash from 'lodash';

export const allocateParamToString = (str: string, params?: object): string => {
  if (!params) return str;
  str = lodash.replace(str, /\{\{[a-z|A-Z|0-9|.|_]+\}\}/g, (word: string) => {
    return lodash.get(params, lodash.replace(word, /\{\{|\}\}/g, ''), word);
  });
  return str;
};
