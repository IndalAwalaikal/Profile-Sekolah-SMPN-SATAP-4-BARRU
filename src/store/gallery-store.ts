import { create } from "zustand";
import type { Photo } from "@/types";

interface GalleryState {
  isOpen: boolean;
  photos: Photo[];
  index: number;
  open: (photos: Photo[], startIndex?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useGalleryStore = create<GalleryState>()((set) => ({
  isOpen: false,
  photos: [],
  index: 0,
  open: (photos, startIndex = 0) =>
    set({ isOpen: true, photos, index: Math.max(0, Math.min(startIndex, photos.length - 1)) }),
  close: () => set({ isOpen: false }),
  next: () =>
    set((state) => ({
      index: state.photos.length ? (state.index + 1) % state.photos.length : 0,
    })),
  prev: () =>
    set((state) => ({
      index: state.photos.length
        ? (state.index - 1 + state.photos.length) % state.photos.length
        : 0,
    })),
}));
