export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = doc(db, "persons", id);
    const data = await getDoc(product);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
