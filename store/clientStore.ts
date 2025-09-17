import { KeyValueProps } from '@/types/restClient';
import { create } from 'zustand';

export type ClientStore = {
  currentTab: number;
  headers: KeyValueProps[];
  addHeader: (_header: KeyValueProps) => void;
  updateHeader: (_newHeader: KeyValueProps) => void;
  setTab: (_index: number) => void;
};

export const useClientStore = create<ClientStore>()((set) => ({
  headers: [],
  currentTab: 0,
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
  setTab: (index: number) => set((state) => ({ ...state, currentTab: index })),
}));
