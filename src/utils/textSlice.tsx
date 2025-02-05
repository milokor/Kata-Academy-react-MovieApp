export const textSlice = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated: string = text.slice(0, maxLength);
  const lastSpaceIndex: number = truncated.lastIndexOf(' ');
  return lastSpaceIndex === -1
    ? `${truncated}...`
    : `${text.slice(0, lastSpaceIndex)}...`;
};
