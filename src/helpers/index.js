export const generateMessageId = (_lastId, codeLengthLimit = 7) => {
  let lastId = parseInt(_lastId);
  lastId += 1;
  const idLength = ("" + lastId).length;
  const codePlaceholder = "0".repeat(codeLengthLimit - idLength);
  const code = codePlaceholder + lastId;
  return code;
};
