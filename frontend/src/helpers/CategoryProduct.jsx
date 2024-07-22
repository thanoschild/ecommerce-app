import summaryApi from "../common";

async function fetchCategoryProduct(category) {
  const response = await fetch(summaryApi.singleCategoryProduct.url, {
    method: summaryApi.singleCategoryProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const data = await response.json();
  return data;
}

export default fetchCategoryProduct;