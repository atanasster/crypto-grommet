
const HISTORY_STORAGE_NAME = 'HISTORY_STORAGE';

export const loadHistory = () => (
  localStorage ? JSON.parse(localStorage.getItem(HISTORY_STORAGE_NAME)) || [] : []
);

export const addHistory = (item) => {
  if (localStorage) {
    // localStorage.removeItem(HISTORY_STORAGE_NAME);
    const history = loadHistory();
    const updated = [...(history.slice(0, 100)), item];
    localStorage.setItem(HISTORY_STORAGE_NAME, JSON.stringify(updated));
    return updated;
  }
  return [];
};
