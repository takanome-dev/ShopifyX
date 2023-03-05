export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const imageTypes = ['png', 'jpg', 'jpeg', 'gif'];

export const validateFile = (file: File) => {
  const type = file.type.split('/');
  if (type[0] === 'image') return imageTypes.includes(type[1]);

  return false;
};
