const FIREBASE_DOMAIN =
  "https://zpo-projekt-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getAllItems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/orders.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch items.");
  }

  const transformedItems = [];
  for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };

    transformedItems.push(itemObj);
  }

  return transformedItems;
}

export async function addOrder(orderData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/orders.json`, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function getOrderIDs() {
  const response = await fetch(`${FIREBASE_DOMAIN}/orders.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch items.");
  }
  return data;
}
