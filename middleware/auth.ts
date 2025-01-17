export default defineNuxtRouteMiddleware(async (event) => {
  try {
    const user = await useNuxtApp().$Amplify.Auth.getCurrentUser();
  } catch (error) {
    return navigateTo("/login");
  }
});
