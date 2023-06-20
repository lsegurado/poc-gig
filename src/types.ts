import type { Country } from "country-list";
import type { store } from "./app/store";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

export interface SaveableContact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  country: Country;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type Contact = Required<SaveableContact>