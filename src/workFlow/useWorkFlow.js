export const executeWorkflow = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const executeWorkFlow = Math.round(Math.random());
      resolve(executeWorkFlow ? "Passed" : "Failed");
    }, 5000);
  });
};
