import {atom} from "jotai";

// Login modal state atom
// null = closed, "signIn" = sign in modal open, "signUp" = sign up modal open
export const loginModalAtom = atom<"signIn" | "signUp" | null>(null);

// Login status atom
// This atom tracks whether the user is currently logged in
// Initialized to false (will be synced with localStorage on client-side mount)
export const isLoggedInAtom = atom<boolean>(false);
