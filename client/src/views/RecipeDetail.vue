<template>
<div>
    <div id='page' class="container-sm bg-white border rounded-3">
        <div class="d-flex align-items-center mb-5">
            <h2 class="text-capitalize fw-bold d-inline me-3 my-0 ">{{ recipe.name }}</h2>
            <span class="badge rounded-pill text-capitalize" :class="[ recipe.category == 'public'? 'bg-primary' : 'bg-secondary' ]" >{{recipe.category}}</span>
            <span v-show='recipe.price' :class="{ 'text-decoration-line-through': recipe.category == 'public' }" class="fs-4 badge bg-success ms-auto me-5 rounded-pill">Rp. {{recipe.price.toLocaleString('id')}}</span>
        </div>
        <div id='recipeProfile' class="d-flex">
            <div>
                <div class='text-start'>
                    <img class="shadow rounded-3" :src="recipe.image_url" :alt="recipe.name" style="margin-bottom: 20px; width:380px;"/>
                </div>
            </div>
            <div id='recipeStatus' class="ms-5">
                <p>Rating : {{recipe.rating}}</p>
                <p>Time Required : {{recipe.timeReq}}</p>
                <p>Servings : {{recipe.servings}}</p>
            </div>
        </div>
        <div id='recipeAuthor' class="container mt-5">
            <div class="row">
                <div class="col border border-end-0 border-secondary border-2 p-4" >
                    <p>Introduction</p>
                    <p>{{recipe.summary ? recipe.summary : recipe.source ? 'Source from  ' + recipe.source : 'From MealDB API'}}</p>
                </div>
                <div class="col border border-secondary border-2 p-4">
                    <p>Author : {{author.name}}</p>
                    <p>As {{author.status}}</p>
                    <p>Recipe Published : {{author.totalRecipes}}</p>
                </div>
            </div>
        </div>
        <div v-if='pay' id='payLine' style="margin: 100px 0">
            <h5 class="text-muted fst-italic"><span>This recipe is private. <a href='#' type='button' @click.prevent='createPayment'>Purchase</a> to continue</span></h5>
        </div>
        <div v-else>
            <div id='components' class='container mt-4'>
                <div class="row">
                    <div class="col py-4" >
                        <h3 class="mb-4">Ingredients</h3>
                        <ul>
                            <li v-if='!recipe.ingredients.length' class="fst-italic fw-lighter"> No ingredients</li>
                            <li v-for='ingredient in recipe.ingredients' :key='ingredient.name'>{{ingredient.name}}, {{ingredient.quantity}}</li>
                        </ul>                
                    </div>
                    <div class="col py-4">
                        <h3 class="mb-4">Equipments</h3>
                        <ul>
                            <li v-if='!recipe.equipments.length' class="fst-italic fw-lighter"> No equipments</li>
                            <li v-else v-for='equipments in recipe.equipments' :key='equipments.name'>{{equipments.name}}</li>
                            <!-- TEMPLATE -->
                            <!-- <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li>
                            <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li> -->
                        </ul>       
                    </div>
                </div>
            </div>
            <div v-if='mealDB' id='steps' class='container mt-3'>
                <h3 class="mb-4">Steps</h3>
                <p v-for='(method, index) in recipe.methods' :key='index'>{{index+1}}. {{method}}</p>
            </div>
            <div v-else id='steps' class='container mt-3'>
                <h3 class="mb-4">Steps</h3>
                <ol>
                    <li v-for='method in recipe.methods' :key='method.index'>
                        <p class="text-capitalize fw-bold mb-3">{{method.title}}</p>
                        <div class='d-flex'>
                            <img :src="method.imageUrl" :alt="method.title" class="img-thumbnail rounded" style="width: 200px; height: 200px;">
                            <div class="ms-5 text-start">
                                <p>{{method.description}}</p>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name : 'RecipeDetail',
    components : {Navbar},
    data (){
        return{
            recipe: {
                id: this.$route.params.recipeId,
                name : '',
                image_url : '',
                rating: 'null',
                timeReq: 'null',
                servings: 'null',
                summary: '',
                price: '',
                category: '',
                ingredients : [],
                methods: [],
                equipments : [],
                source: '',
            },
            author: {
                name : 'MealDB',
                status : 'MealDB',
                totalRecipes : 'infinite'
            },
            mealDB : false,
            pay : true
        }
    },
    methods: {
        fetchMealDB_recipe(){
            this.$store.dispatch('fetchMealDB_recipe',{ mealDB_id: this.$route.params.recipeId})
            .then((result) => {
                let recipe = result.data.meals[0]
                let {strMeal, strMealThumb, strSource } = recipe
                // console.log(strMeal, strMealThumb );
                // console.log(result.data.meals[0]);
                this.recipe.name = strMeal
                this.recipe.image_url = strMealThumb
                this.recipe.source = strSource

                //GET INGREDIENTS
                let arrIng = Object.keys(recipe).filter(el => el.includes('strIngredient'))
                let arrMeasure = Object.keys(recipe).filter(el => el.includes('strMeasure'))
                let ingredients =  []
                arrIng.forEach((el, index)=> {
                    let ingredient = {}
                    ingredient.name = recipe[el]
                    ingredient.quantity = recipe[arrMeasure[index]]
                    ingredients.push(ingredient)
                })
                this.recipe.ingredients = ingredients.filter(el => el.name)
                //GET INGREDIENTS

                //GET METHODS
                let methods = recipe.strInstructions.split('\r\n')
                this.recipe.methods = methods
                //GET METHODS

            }).catch((err) => {
                console.log(err)
            });
        },

        fetchRecipe(){
            this.$store.dispatch('fetchRecipeDetail', {recipeId : this.$route.params.recipeId})
            .then(({data}) => {
                const {name, timeReq, servings, summary, imageUrl, status, category, price, Component, Methods, User} = data
                this.author = {
                    name : User.name,
                    status : User.status,
                    totalRecipes : User.Recipes.length
                }

                if(Component == undefined && Methods == undefined){
                    this.pay = true
                    this.recipe = {
                        id: this.$route.params.id,
                        name : name,
                        image_url : imageUrl,
                        rating: 'null',
                        timeReq: timeReq,
                        servings: servings,
                        summary: summary,
                        price: price,
                        category: category,
                    }
                }else{
                    this.pay = false
                    this.recipe = {
                        id: this.$route.params.id,
                        name : name,
                        image_url : imageUrl,
                        rating: 'null',
                        timeReq: timeReq,
                        servings: servings,
                        summary: summary,
                        price: price,
                        category: category,
                        ingredients : JSON.parse(Component.ingredients),
                        equipments : JSON.parse(Component.tools),
                        methods: Methods
                    }
                }

            }).catch((err) => {
                console.log('masuk');
                this.$router.push('/notFound')
                console.log(err);
            });
        },

        createPayment(){
            const date = new Date()
            const orderId = this.$route.params.recipeId +'GTRECIPE' + date.toISOString() 
            const price = this.recipe.price
            // console.log(orderId, price);
            this.$store.dispatch('createPayment', { orderId, price })
        }

    },
    mounted(){
        if(this.$route.params.recipeId.length > 4) {
            this.pay = false
            this.fetchMealDB_recipe()
            this.mealDB = true
        }
        else {
            this.fetchRecipe()
            this.mealDB = false
        }
    },
    // computed: {
    //     methods (){
    //         return 
    //     }
    // }
}
</script>

<style>
#page{
    padding: 5% 8%; margin-top: 5%; margin-bottom: 5%; background-color: rgba(245, 245, 245); width:75%
}

#payLine h5 {
   width: 100%; 
   text-align: center; 
   border-bottom: 1px solid #000; 
   line-height: 0.1em;
   margin: 10px 0 20px; 
} 

#payLine h5 span { 
    background:#fff; 
    padding:0 10px; 
}

</style>