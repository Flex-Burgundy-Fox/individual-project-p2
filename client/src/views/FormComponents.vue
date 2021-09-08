<template>
<div class="me-5">
    <div class="mb-5" style="margin-right: 200px">
        <h3>Ingredients</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Ingredient Name & Quantity</span>
                <input v-model='ingredient.name' type="text" aria-label="First name" class="form-control">
                <input v-model='ingredient.quantity' type="text" aria-label="Last name" class="form-control">
            <button type="button" class="btn btn-primary btn-sm" @click='ingArr'>Add Ingredient</button>
        </div>
        <h5 class="ms-4 mt-4 text-muted" v-if='!ingredients.length'>No ingredients yet</h5>
        <ul>
            <li v-for='ingredient in ingredients' :key='ingredient.name'>{{ingredient.name}}, {{ingredient.quantity}}</li>
        </ul>
    </div>
        <hr class="mb-5">

    <div class="mb-5" style="margin-right: 200px">
        <h3>Tools</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Tool Name & Quantity</span>
                <input v-model='tool.name' type="text" aria-label="First name" class="form-control">
                <input v-model='tool.quantity' type="text" aria-label="Last name" class="form-control">
            <button type="button" class="btn btn-primary btn-sm" @click='toolArr'>Add Tool</button>
        </div>
        <h5 class="ms-4 mt-4 text-muted" v-if='!tools.length'>No tools yet</h5>
        <ul>
            <li v-for='tool in tools' :key='tool.name'>{{tool.name}}, {{tool.quantity}}</li>
        </ul>
    </div>
        <hr class="mb-5">
    <div class="text-end">
        <button class="btn btn-primary" @click='postComponents'>Next</button>
    </div>

</div>
  
</template>

<script>
export default {
    name : 'FormComponents',
    data(){
        return {
            ingredients : [],
            ingredient : {
                name : '',
                quantity : '',
            },
            tools: [],
            tool : {
                name : '',
                quantity : '',
            },
        }
    },
    methods: {
        ingArr(){
            this.ingredients.push(this.ingredient)
            this.ingredient = {
                name : '',
                quantity : '',
            }
        },
        toolArr(){
            this.tools.push(this.tool)
            this.tool = {
                name : '',
                quantity : '',
            }
        },
        postComponents(){
            this.$store.dispatch('addComponents', {
                recipeId : this.$route.params.recipeId,
                ingredients : this.ingredients,
                tools : this.tools,
            })
        }
    }

}
</script>

<style>

</style>