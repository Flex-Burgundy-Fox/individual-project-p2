<template>
    <div class="col">
        <div class="shadow card" @click='$router.push(`/recipe/${recipe.idMeal || recipe.id}`)' style="cursor:pointer;">
            <img :src="recipe.strMealThumb || recipe.imageUrl" class="card-img-top" alt="No Picture"/>
            <div class="card-body" style="padding: 10px 10px; padding-bottom: 15px;">
                <p class="card-text text-capitalize" style="font-size:12pt">{{recipe.strMeal || recipe.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'RecipeCard',
    props: ['recipe']
}
</script>

<style>

</style>