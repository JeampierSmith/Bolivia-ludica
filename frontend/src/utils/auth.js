
export function getToken() {
  try {
    const stored = localStorage.getItem('bludica_user');
    if (!stored) return null;
    const user = JSON.parse(stored);
    return user && user.token ? user.token : null;
  } catch {
    return null;
  }
}
