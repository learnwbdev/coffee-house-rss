import { productId, productsUrl } from "./constants.js";

function setProductIds(productsData) {
  const productsDataWithIds = productsData.map((product, idx) => {
    product[productId] = idx;
    return product;
  });
  return productsDataWithIds;
}

async function getProductItems(productCategory) {
  const productsDataResponse = await fetch(productsUrl);

  if (!productsDataResponse.ok) {
    console.log(`Error fetching data from the file: ${productsUrl}`);
    return undefined;
  }

  const productsData = await productsDataResponse.json();

  const productDataForCategory = productsData.filter(
    (product) => product.category === productCategory,
  );

  const productsDataWithIds = setProductIds(productDataForCategory);

  return productsDataWithIds;
}

export default getProductItems;
