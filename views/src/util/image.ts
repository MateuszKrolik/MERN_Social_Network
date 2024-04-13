export const generateBase64FromImage = (imageFile: Blob) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = e => resolve((e.target as FileReader).result);
        reader.onerror = reject;
    });

    reader.readAsDataURL(imageFile);
    return promise;
};
