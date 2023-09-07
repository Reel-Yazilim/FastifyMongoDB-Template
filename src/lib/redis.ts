import { ServerPlugins, server } from "../index";

export const setCache = async (
  key: string,
  value: any,
  ex?: number
): Promise<void> => {
  try {
    await ServerPlugins.redis.set(key, JSON.stringify(value), {
      EX: ex || 300, // 5 minutes
    });
  } catch (err) {
    server.log.error(`Failed to set cache for key ${key}: ${err}`);
  }
};

export const getCache = async (key: string): Promise<any> => {
  try {
    const data = await ServerPlugins.redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    server.log.error(`Failed to get cache for key ${key}: ${err}`);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await ServerPlugins.redis.del(key);
  } catch (err) {
    server.log.error(`Failed to delete cache for key ${key}: ${err}`);
  }
};

export const deleteAllCache = async (): Promise<void> => {
  try {
    await ServerPlugins.redis.flushAll();
  } catch (err) {
    server.log.error(`Failed to delete all cache: ${err}`);
  }
};
