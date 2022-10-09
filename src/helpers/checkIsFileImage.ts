export const checkIsFileImage = (file: File | undefined) => {
  if (!file) return true;
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  return acceptedImageTypes.includes(file.type);
};
