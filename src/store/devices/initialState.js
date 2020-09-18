import * as Storage from '../../common/Storage';

const storage = Storage.get();

export default {
  list: [],
  selected: storage?.devices?.selected || '',
};
