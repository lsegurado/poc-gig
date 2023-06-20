import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../types";
import { mockState } from "../__fixtures__";

const mockUseAppDispatch = jest.fn();

const mockUseAppSelector: TypedUseSelectorHook<RootState> = (func) => func(mockState());

jest.mock('../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockUseAppDispatch
}))
jest.mock('../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector
}))