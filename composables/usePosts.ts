import type { Schema } from "~/amplify/data/resource";
import { defineStore } from "pinia";
import naturalOrder from "natural-order";

type Post = {
  content: string;
  createdAt: string;
  id: string;
  settings: { avatarUrl: string };
  event: string;
};

export const usePosts = defineStore("posts", {
  state: () => ({
    posts: new Map<
      string,
      {
        content: string;
        createdAt: string;
        id: string;
        settings: { avatarUrl: string };
        event: string;
      }[]
    >(),
  }),
  getters: {
    getByLocationId(): (locationId: string) => Post[] {
      return (locationId: string) =>
        naturalOrder(this.posts.get(locationId) ?? [])
          .orderBy("desc")
          .sort(["createdAt"]);
    },
  },
  actions: {
    async fetchPosts(locationId: string) {
      try {
        const { data } =
          await useNuxtApp().$Amplify.GraphQL.client.models.Post.list({
            filter: {
              locationId: { eq: locationId },
            },
            selectionSet: [
              "content",
              "createdAt",
              "id",
              "settings.avatarUrl",
              "event",
            ],
          });

        console.log(data);

        this.posts.set(locationId, data as Post[]);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    },
    async createPost({
      locationId,
      content,
      settingsId,
    }: {
      locationId: string;
      content: string;
      settingsId: string;
    }) {
      // roll event
      const event = eventToText();

      try {
        const { data } =
          await useNuxtApp().$Amplify.GraphQL.client.models.Post.create({
            locationId,
            content,
            event,
            settingsId,
          });

        console.log(data);

        await this.fetchPosts(locationId);
      } catch (error) {
        console.error("Error creating post", error);
      }
    },
  },
});

enum Event {
  Dysentery,
  BrokenArm,
  BrokenLeg,
  SnakeBite,
  Exhaustion,
  Death,
  Nothing,
}

function rollEvent() {
  // random number between 0 and 100
  const roll = Math.floor(Math.random() * 100);

  if (roll < 10) return Event.Dysentery;
  if (roll < 20) return Event.BrokenArm;
  if (roll < 30) return Event.BrokenLeg;
  if (roll < 40) return Event.SnakeBite;
  if (roll < 50) return Event.Exhaustion;

  return Event.Nothing;
}

function eventToText() {
  switch (rollEvent()) {
    case Event.Dysentery:
      return "You have dysentery.";
    case Event.BrokenArm:
      return "You have broken your arm.";
    case Event.BrokenLeg:
      return "You have broken your leg.";
    case Event.SnakeBite:
      return "You have been bitten by a snake.";
    case Event.Exhaustion:
      return "You are exhausted.";
    default:
      return "Nothing happened.";
  }
}
