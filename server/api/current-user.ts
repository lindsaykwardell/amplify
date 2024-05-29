import { getCurrentUser } from "aws-amplify/auth/server";
import { runAmplifyApi } from "~/server/utils/amplifyUtils";

export default defineEventHandler(async (event) => {
  const user = await runAmplifyApi(event, (contextSpec) =>
    getCurrentUser(contextSpec)
  );

  return user;
});
