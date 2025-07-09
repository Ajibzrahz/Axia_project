import bcrypt from "bcryptjs";

const hashed = async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const details = bcrypt.hashSync(this.password, 10);
  this.password = details;
  next();
};

export { hashed };
