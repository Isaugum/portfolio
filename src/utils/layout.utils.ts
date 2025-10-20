export const changeTheme = (): void => {
  const theme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute(
    'data-theme',
    theme === 'light' ? 'dark' : 'light'
  );
};
