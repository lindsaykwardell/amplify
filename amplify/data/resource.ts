import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Game: a
    .model({
      datePlayed: a.date(),
      profession: a.enum(["Banker", "Carpenter", "Farmer"]),
      startMonth: a.enum(["March", "April", "May", "June", "July"]),
      endMonth: a.enum([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]),
      endYear: a.integer(),
      party: a.hasMany("PartyMember", "gameId"),
      wagon: a.integer(),
      oxen: a.integer(),
      spareParts: a.integer(),
      setsOfClothing: a.integer(),
      bullets: a.integer(),
      money: a.integer(),
    })
    .authorization((allow) => [allow.guest()]),
  PartyMember: a
    .model({
      gameId: a.id(),
      name: a.string(),
      survived: a.boolean(),
      game: a.belongsTo("Game", "gameId"),
    })
    .authorization((allow) => [allow.guest()]),
  Settings: a
    .model({
      locationId: a.id(),
      location: a.belongsTo("Location", "locationId"),
    })
    .authorization((allow) => [allow.owner()]),
  Location: a
    .model({
      name: a.string(),
      slug: a.string(),
      image: a.string(),
      settings: a.hasMany("Settings", "locationId"),
    })
    .authorization((allow) => [allow.guest(), allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
