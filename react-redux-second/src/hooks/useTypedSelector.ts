import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TReducerState } from '../state';

export const useTypedSelector: TypedUseSelectorHook<TReducerState> = useSelector