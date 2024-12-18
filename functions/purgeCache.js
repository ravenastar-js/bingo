import { json } from "../utils/json";

export const onRequestGet = async ({ request }) => {
  try {
    const cache = await caches.open("resources:cache");
    const keys = await cache.keys();

    const deletePromises = keys.map(key => cache.delete(key));
    const results = await Promise.all(deletePromises);
    const allDeleted = results.every(result => result);

    return json({ cacheCleared: allDeleted });
  } catch (error) {
    return json({ error: "Something went wrong!", details: error.message }, 500);
  }
};
