/** @format */

import { create } from 'zustand';

type UiState = {
	isSidebarOpen: boolean;
	isSidebarPinned: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	togglePin: () => void;
};

export const useUiStore = create<UiState>((set) => ({
	isSidebarOpen: false,
	isSidebarPinned: false,
	openSidebar: () =>
		set((state) => (state.isSidebarPinned ? state : { isSidebarOpen: true })),
	closeSidebar: () =>
		set((state) => (state.isSidebarPinned ? state : { isSidebarOpen: false })),
	togglePin: () =>
		set((state) => ({
			isSidebarPinned: !state.isSidebarPinned,
			isSidebarOpen: !state.isSidebarPinned ? true : state.isSidebarOpen,
		})),
}));
