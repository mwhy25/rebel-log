export function getVisitorId() {
  if (typeof window === 'undefined') return null;

  let id = localStorage.getItem('visitor-id');
  if (!id) {
    id = 'v-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('visitor-id', id);
  }
  return id;
}
