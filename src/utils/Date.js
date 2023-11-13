export const formatDate = (date) => {
  const initiatedate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return initiatedate;
};
