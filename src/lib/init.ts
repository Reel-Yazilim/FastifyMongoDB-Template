import Models from "../models";
import { hashPassword } from "./bcrypt";
import { server } from "./server";

export default async function init() {
  const HashedPassword = hashPassword("12345678");

  const findedAdmin = await Models.UserModel.findOne({
    username: "Admin",
  });

  if (!findedAdmin) {
    const Admin = await Models.UserModel.create({
      username: "Admin",
      password: HashedPassword,
    });

    server.log.info("-----------------------");
    server.log.info("Admin user created");
    server.log.info(Admin);
    server.log.info("-----------------------");

    return;
  } else {
    return;
  }
}
