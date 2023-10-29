import swaggerJsdoc from "swagger-jsdoc";

const rootSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Termux API HTTP",
      version: "1.0.0",
      description: "Interface Termux API over HTTP webserver",
      license: {
        name: "MIT License",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "dianudi",
        url: "https://github.com/dianudi",
        // email: "info@mail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description:
          "Optional server description, e.g. Internal staging server for testing",
      },
      {
        url: "http://redmi-4x.lan:3000",
        description:
          "Optional server description, e.g. Main (production) server",
      },
    ],
  },
  apis: ["dist/routes/*.js"],
});

export { rootSpec };
