import { expect } from 'chai';
import { noop } from '../src/utils';

describe('utils.noop', () => {
  it('does nothing', () => {
    expect(noop()).to.be.undefined;
  });
});
