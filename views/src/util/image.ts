export const generateBase64FromImage = (imageFile: Blob) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = e => resolve((e.target as FileReader).result);
        reader.onerror = reject;
    });

    reader.readAsDataURL(imageFile);
    return promise;
};

// Previous JS Version
// export const generateBase64FromImage = imageFile => {
//   const reader = new FileReader();
//   const promise = new Promise((resolve, reject) => {
//     reader.onload = e => resolve(e.target.result);
//     reader.onerror = err => reject(err);
//   });

//   reader.readAsDataURL(imageFile);
//   return promise;
// };
