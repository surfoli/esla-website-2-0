export function isAuthorized(request: Request): boolean {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    // matches beginning of string or '; ' then esla_admin=1 then ';' or end of string
    return /(?:^|;\s*)esla_admin=1(?:;|$)/.test(cookieHeader);
  } catch {
    return false;
  }
}
