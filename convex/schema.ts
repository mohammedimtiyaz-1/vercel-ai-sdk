import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";

const schema = defineSchema({
  // Define your schema here
  ...authTables,
});
export default schema;
