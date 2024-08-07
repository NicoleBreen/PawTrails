export const launchImageLibraryAsync = jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: 'fake-uri' }],
  });