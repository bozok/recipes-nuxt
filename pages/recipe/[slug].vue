<script lang="ts" setup>
import recipes from "~/data/recipes";

const route = useRoute();
const recipe = recipes.find((item) => item.slug === route.params.slug);
useSeoMeta({
  description: recipe?.description,
  ogDescription: recipe?.description,
});
// definePageMeta({
//   validate: async (route) => {
//     // check if recipe exists
//     return !!recipes.find((item) => item.slug === route.params.slug);
//   },
// });

useSchemaOrg([
  defineRecipe({
    name: recipe?.title,
    description: recipe?.description,
    image: recipe?.image,
    cookTime: recipe?.cookingTime,
    prepTime: recipe?.prepTime,
    nutrition: recipe?.nutrition,
    recipeYield: recipe?.recipeYield,
    recipeCategory: recipe?.recipeCategory,
    recipeCuisine: recipe?.recipeCuisine,
    aggregateRating: {
      ratingValue: recipe?.ratings,
    },
    recipeIngredient: recipe?.recipeIngredient,
    recipeInstructions: recipe?.recipeInstructions,
  }),
]);

defineOgImageComponent("CustomTemplate", {
  title: recipe?.title,
  description: recipe?.description,
  image: recipe?.image,
});
</script>

<template>
  <div v-if="recipe">
    <!-- Hero Section -->
    <section
      class="relative h-[60vh] flex items-center justify-center rounded-lg"
    >
      <nuxt-img
        format="webp"
        placeholder
        :src="recipe.image"
        alt="recipe Image"
        class="absolute w-full h-full object-cover"
      />

      <div class="absolute inset-0 bg-black opacity-50" />
    </section>

    <!-- recipe Details Card -->
    <section
      class="relative container bg-white rounded-lg shadow-lg z-20 -mt-20 p-4 lg:p-8 mb-12 max-w-5xl"
    >
      <h1 class="text-3xl font-bold text-center mb-2">{{ recipe.title }}</h1>

      <p class="text-gray-700 text-center text-lg mb-2">
        {{ recipe.description }}
      </p>

      <div class="text-lg text-center font-light text-gray-700 mb-8">
        <span>🔥 {{ recipe.nutrition.calories }}</span>
      </div>

      <recipe-info :recipe="recipe" class="mb-8" />

      <!-- Ingredients -->
      <div class="mb-4">
        <h3 class="font-bold text-lg text-primary mb-2">Ingredients</h3>

        <ul class="list-disc list-inside">
          <li v-for="ingredient in recipe.recipeIngredient" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <!-- Cooking Instructions -->
      <div>
        <h3 class="font-bold text-lg mb-4 text-primary">Instructions</h3>

        <ul class="list-disc list-inside">
          <li
            v-for="instruction in recipe.recipeInstructions"
            :key="instruction.name"
            class="text-gray-700 mb-2"
          >
            <span class="font-bold">{{ instruction.name }}: </span>

            {{ instruction.text }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
