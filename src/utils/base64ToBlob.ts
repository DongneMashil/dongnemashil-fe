export function base64ToBlob(data: string, mimeType: string): Blob {
  if (data.startsWith('data:')) {
    const byteString = atob(data.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeType });
  }

  // base64가 아닌 경우 바로 보내줌.
  return new Blob([data], { type: mimeType });
}
