export default defineNuxtRouteMiddleware(async (event) => {
  try {
    const user = await useNuxtApp().$Amplify.Auth.getCurrentUser();

    if (user) {
      return navigateTo("/dashboard");
    }
  } catch (error) {
    // Do nothing
  }
});
