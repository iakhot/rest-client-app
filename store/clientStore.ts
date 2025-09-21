import { KeyValueProps, RestResponse } from '@/types/restClient';
import { create } from 'zustand';

export type ClientStore = {
  currentTab: number;
  headers: KeyValueProps[];
  response?: RestResponse;
  addHeader: (_header: KeyValueProps) => void;
  updateHeader: (_newHeader: KeyValueProps) => void;
  cleanupHeaders: () => void;
  setTab: (_index: number) => void;
  addResponse: (_resp: RestResponse) => void;
};

export const useClientStore = create<ClientStore>()((set) => ({
  headers: [],
  currentTab: 0,
  response: {},
  addHeader: (newHeader: KeyValueProps) =>
    set((state) => ({ ...state, headers: [...state.headers, newHeader] })),
  updateHeader: (newHeader: KeyValueProps) =>
    set((state) => ({
      ...state,
      headers: state.headers.map((header: KeyValueProps) =>
        newHeader.uuid === header.uuid
          ? {
              ...header,
              key: newHeader.key,
              value: newHeader.value,
              selected: newHeader.selected,
            }
          : header
      ),
    })),
  cleanupHeaders: () => set((state) => ({ ...state, headers: [] })),
  setTab: (index: number) => set((state) => ({ ...state, currentTab: index })),
  addResponse: (resp: RestResponse) =>
    set((state) => ({ ...state, response: resp })),
}));
