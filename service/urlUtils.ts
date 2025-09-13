export const composeUrl = (
  pageSlug: string,
  path: string,
  method?: string,
  url?: string,
  body?: string
) => {
  const index = path.indexOf(pageSlug);
  let newPath = path;
  const encodedUrl = url ? btoa(url) : undefined;
  const encodedBody = body ? btoa(body) : undefined;
  const vars = [method, encodedUrl, encodedBody];

  if (index !== -1) {
    const initPath = path.slice(0, index + pageSlug.length) + '/';
    newPath = initPath;
    for (const param of vars) {
      if (!param) break;
      newPath = newPath.concat(`${param}/`);
    }
  }
  return newPath;
};
