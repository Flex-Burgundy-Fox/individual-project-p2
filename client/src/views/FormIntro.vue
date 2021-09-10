<template>
<div class="me-5">
    <table class="table table-borderless">
        <tbody>
            <tr>
                <td>Recipe Title:</td>
                <td><input type="text" v-model="recipe.name"></td>
            </tr>
            <tr>
                <td>Time Required (minutes):</td>
                <td><input type="number" v-model="recipe.timeReq"></td>
            </tr>
            <tr>
                <td>Servings:</td>
                <td><input type="number" v-model="recipe.servings"></td>
            </tr>
             <tr>
                <td>Preview Image URL:</td>
                <td><input type="string" v-model="recipe.imageUrl"></td>
            </tr>
             <tr>
                <td>Summary:</td>
                <td><textarea name="" id="" cols="30" rows="4" v-model="recipe.summary"></textarea></td>
            </tr>
            <tr>
                <td>Category:</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input v-model="recipe.category" type="radio" class="btn-check" name="btnradio" id="btnradio1" value='public'>
                        <label class="btn btn-outline-primary" for="btnradio1">Public</label>

                        <input v-model="recipe.category" type="radio" class="btn-check" name="btnradio" id="btnradio2" value='private'>
                        <label class="btn btn-outline-secondary" for="btnradio2">Private</label>
                        <!-- <p>{{recipe.category}}</p> -->
                    </div>
                </td>
            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="number" min="1000" v-model="recipe.price" :disabled=" recipe.category == 'public' ? true : false" ></td>
            </tr>
        </tbody>
    </table>
    <hr class="mb-5">
    <div class="text-end">
        <button v-if='isEdit' class="btn btn-secondary me-3" @click='$router.push("/profile")'>Back to profile</button>
        <button v-if='isEdit' class="btn btn-success me-3" @click='$router.push("/recipe/"+ $route.params.recipeId)'>Look on page</button>
        <button v-if='isEdit' class="btn btn-primary" @click='$store.dispatch("editRecipe", {recipeId: $route.params.recipeId,  recipe})'>Save</button>
        <button v-else class="btn btn-primary" @click='$store.dispatch("postRecipe", recipe)'>Next</button>
    </div>
</div>
</template>

<script>
export default {
    name : 'FormIntro',
    data(){
        return {
            recipe : {
                name: '',
                timeReq: '',
                servings: '',
                summary: '',
                imageUrl: '',
                category: 'public',
                status: '',
                price: 1000
            },
            isEdit : false
        }
    },
    mounted() {
        if(this.$route.path.includes('editRecipe')){
            this.isEdit = true
            this.$store.dispatch('fetchRecipeDetail', {recipeId: this.$route.params.recipeId})
            .then(({data}) => {

                const {name, timeReq, servings, summary, imageUrl, category, status, price} = data
                this.recipe.name = name
                this.recipe.timeReq = timeReq
                this.recipe.servings = servings
                this.recipe.summary = summary
                this.recipe.imageUrl = imageUrl
                this.recipe.category = category
                this.recipe.status = status
                this.recipe.price = price

            }).catch((err) => {
                console.log(err);
            });
        } 
        else return 'Add'
        
    },

}
</script>

<style>


</style>