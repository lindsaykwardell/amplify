export default defineNuxtRouteMiddleware(async (event) => {
  try {
    const user = await useNuxtApp().$Amplify.Auth.getCurrentUser();

    console.log(user);
  } catch (error) {
    console.error(error);
    return navigateTo("/");
  }
});
