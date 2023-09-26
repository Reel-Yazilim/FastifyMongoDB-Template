import { ServerPlugins, server } from "./server";

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

export const getCacheKeys = async (pattern: string): Promise<string[]> => {
  try {
    const keys = await ServerPlugins.redis.keys(pattern);
    return keys;
  } catch (err) {
    server.log.error(`Failed to get cache keys for pattern ${pattern}: ${err}`);
    return [];
  }
};

export const getCacheKeysCount = async (pattern: string): Promise<number> => {
  try {
    const keys = await ServerPlugins.redis.keys(pattern);
    return keys.length;
  } catch (err) {
    server.log.error(
      `Failed to get cache keys count for pattern ${pattern}: ${err}`
    );
    return 0;
  }
};

export const checkCache = async (key: string): Promise<boolean> => {
  try {
    const exists = await ServerPlugins.redis.exists(key);
    return exists === 1;
  } catch (err) {
    server.log.error(`Failed to check cache for key ${key}: ${err}`);
    return false;
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
