const mapping: Record<string, string> = {
  families: 'family',
  memories: 'memory',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
