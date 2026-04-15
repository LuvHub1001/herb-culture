import { atom } from "jotai";

export const buttonGuAtom = atom<string | null>(null);
export const userSelectedGuAtom = atom<boolean>(false);
export const locationAtom = atom<{
  latitude: number;
  longitude: number;
} | null>(null);
export const currentGuAtom = atom<string | null>(null);
export const geoStatusAtom = atom<"pending" | "ok" | "unavailable">("pending");
export const categoryAtom = atom<string | null>(null);
export type SortKey = "default" | "endSoon" | "newest";
export const sortAtom = atom<SortKey>("default");
