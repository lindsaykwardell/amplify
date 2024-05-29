import {
  fetchAuthSession,
  fetchUserAttributes,
  signIn,
  signOut,
} from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";

// configure the Amplify client library
if (process.client) {
  Amplify.configure(outputs, { ssr: true });
}

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default defineNuxtPlugin({
  name: "AmplifyAPIs",
  enforce: "pre",
  setup() {
    return {
      provide: {
        // You can call the API by via the composable `useNuxtApp()`. For example:
        // `useNuxtApp().$Amplify.Auth.fetchAuthSession()`
        Amplify: {
          Auth: {
            fetchAuthSession,
            fetchUserAttributes,
            signIn,
            signOut,
          },
          GraphQL: {
            client,
          },
        },
      },
    };
  },
});
