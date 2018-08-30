import {
  renameObjectKeys,
} from 'utils';

describe('renameObjectKeys', () => {
  it('renames keys accoring to a map', () => {
    const object = {
      some_key: 'foo'
    };

    const map = {
      some_key: 'someKey'
    };
    expect(renameObjectKeys(map, object)).to.deep.equal({ someKey: 'foo' });
  });
});
