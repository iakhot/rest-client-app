export const wrapServerError = (error: unknown) => {
  return {
    error: {
      name: (error as Error)?.name,
      message: (error as Error)?.message,
    },
  };
};
