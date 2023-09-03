export interface JwtPayload {
  sub?: string | null;
  name?: string | null;
  iat?: number | null;
  exp?: number | null;
}

export const jwtParser = (): JwtPayload => {
  let result: JwtPayload = {
    sub: null,
    name: null,
    iat: null,
    exp: null,
  };
  const token = window.localStorage.getItem('access_token');
  if (token) {
    const parts = token.split('.');
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      result = JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );
    }
  }
  return result;
};
