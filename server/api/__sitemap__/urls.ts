import recipes from "~/data/recipes";

export default defineSitemapEventHandler(() => {
  return recipes.map((recipe) => ({
    loc: `/recipe/${recipe.slug}`,
    _sitemap: "pages",
  }));
});
// export default defineEventHandler(async (event) => {
//   return "Hello Nitro";
// });
