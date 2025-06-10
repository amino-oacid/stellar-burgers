import store from './store';

describe('Проверка rootReducer', () => {
  it('Проверка правильной инициализации rootReducer при передаче неизвестного экшена', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
