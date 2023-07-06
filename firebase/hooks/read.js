

export const readData =  (userId) => {
  let data;
  console.log(userId);
  try {
    
    console.log(data);
    return data;
  } catch (err) {
    return err.message;
  }
};
