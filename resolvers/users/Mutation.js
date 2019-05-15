const addUser = (root, args, context) => {
  if (!context.userId) {
    throw new Error("Not authenticated");
  }
  context.db.push(args.details);
  return context.db;
};

module.exports = {
  addUser
};
