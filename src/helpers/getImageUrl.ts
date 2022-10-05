export const getImageUrl = (url: string | undefined) => {
  const appImageUrl = process.env.REACT_APP_IMAGE_URL;
  return url && appImageUrl ? `${appImageUrl}${url}` : undefined;
};
