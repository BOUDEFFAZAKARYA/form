import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

import * as schema from "./schema"
import { env } from "process"

// Create the connection
const connection = connect({
  url: env.DATABASE_URL,
})
export const db = drizzle(connection, { schema })