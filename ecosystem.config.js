module.exports = {
  apps: [
    {
      name: "Fastify Typescript Starter",
      script: "./node_modules/ts-node/dist/bin.js",
      args: "src/index.ts",
      automation: false,
      watch: true,
      env: {
        NODE_ENV: "development",
        TS_NODE_PROJECT: "./tsconfig.json",
      },
      env_production: {
        NODE_ENV: "production",
        TS_NODE_PROJECT: "./tsconfig.json",
      },
    },
  ],
};
