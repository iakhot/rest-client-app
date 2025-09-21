import { useClientStore } from '@/store/clientStore';
import { beforeEach, expect, it } from 'vitest';
import { describe } from 'node:test';
import { mockHeaders } from './mocks';
import { KeyValueProps } from '@/types/restClient';

const initialState = useClientStore.getInitialState();

beforeEach(() => {
  useClientStore.setState(initialState, true);
});

describe('ClientStore', () => {
  it('should set tab index', () => {
    useClientStore.getState().setTab(3);
    expect(useClientStore.getState().currentTab).toBe(3);
  });
  it('should add header', () => {
    const header = mockHeaders[0] as KeyValueProps;
    useClientStore.getState().addHeader(header);
    expect(useClientStore.getState().headers).toHaveLength(1);
    expect(useClientStore.getState().headers[0]).toMatchObject(header);
  });
  it('should update header', () => {
    const header = mockHeaders[0] as KeyValueProps;
    header.uuid = '123';
    useClientStore.getState().addHeader(header);
    expect(useClientStore.getState().headers).toHaveLength(1);
    expect(useClientStore.getState().headers[0]).toMatchObject(header);
    const newHeader = mockHeaders[1] as KeyValueProps;
    newHeader.uuid = '123';
    useClientStore.getState().updateHeader(newHeader);
    expect(useClientStore.getState().headers).toHaveLength(1);
    expect(useClientStore.getState().headers[0]).toMatchObject(newHeader);
  });
});
