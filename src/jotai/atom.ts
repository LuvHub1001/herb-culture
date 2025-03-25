import { atom } from "jotai";

export const buttonGuAtom = atom<string | null>(null);
export const locationAtom = atom<{
  latitude: number;
  longitude: number;
} | null>(null);
export const currentGuAtom = atom<string | null>(null);
