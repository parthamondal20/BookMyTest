import User from "../models/user.model.js";
const initAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("✅ Super admin already exists");
    return;
  }

  await User.create({
    username: "super admin",
    email: adminEmail,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });
  console.log("🚀 Super admin created successfully");
};

export default initAdmin;
