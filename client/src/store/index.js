import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
axios.defaults.baseURL = "http://localhost:3000/"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mealDB_recipes : [],
    gourmetTavern_recipes : [],
    token: '',
    userData: {
      name: '',
      email: '',
      status: '',
    },
    userRecipes: {
      originalRecipes : [],
      purchasedRecipe : []
    }
  },
  mutations: {
    SET_MEALDB(state, payload){
      state.mealDB_recipes = payload
    },
    SET_GOURMETTAVERN(state, payload){
      state.gourmetTavern_recipes = payload
    },
    SET_TOKEN(state, payload){
      state.token = payload
    },
    SET_USERDATA(state, payload){
      state.userData.name = payload.name
      state.userData.email = payload.email
      state.userData.status = payload.status
    },
    SET_ORIGINALRECIPES(state, payload){
      state.userRecipes.originalRecipes = payload
    }
  },
  actions: {
    login(context, payload){
      return axios({
        method: 'post',
        url: 'users/login',
        data : payload
      })
    },
    register(context, payload){
      axios({
        method: 'post',
        url: 'users/register',
        data : payload
      })
      .then((result) => {
        // console.log(result);
      }).catch((err) => {
        console.log(err.response);
      });
    },

    fetchUserData(context, payload){
      axios({
        method: 'get',
        url: 'users/userData',
        headers: payload
      })
      .then(({data}) => {
        context.commit('SET_USERDATA', data)
      }).catch((err) => {
        console.log(err.response);
      });
    },

    seedMealDB({commit}, payload){
      let mealDB_A = 
        axios({
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
        });
      let mealDB_B = 
        axios({
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=b',
        });
      let mealDB_C = 
        axios({
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=c',
        });

      Promise.all([mealDB_A, mealDB_B, mealDB_C])
      .then((result) => {
        let output = []
        result.forEach(el => {
          // console.log(el.data.meals.slice(0,3));
          output.push(...el.data.meals.slice(0,3))
        })
        commit('SET_MEALDB', output)
      }).catch((err) => {
        console.log(err);
      });
    },

    seedGourmetTavern({commit}, payload){
      axios({
        method : 'get',
        url : 'recipes'
      })
      .then(({data}) => {
        commit('SET_GOURMETTAVERN', data)
      }).catch((err) => {
        console.log(err);
      });
    },

    fetchMealDB_recipe(context, payload){
      return axios ({
        method: 'get',
        url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + payload.mealDB_id,
      });
    },

    fetchRecipe(context, payload){
      return axios ({
        method: 'get',
        url: 'recipes/' + payload.recipeId,
        headers: { access_token : context.state.token},
      });
    },

    postRecipe(context, payload){
      axios({
        method: 'post',
        url: 'newRecipe',
        headers: { access_token : context.state.token},
        data : payload,
      })
      .then(({data}) => {
        router.push('/addRecipe/components/'+data.id)
        // context.commit('SET_USERDATA', data)
      }).catch((err) => {
        console.log(err);
      });
    },

    addComponents(context, payload){
      function postIngredients(){
        return axios({
          method: 'post',
          url: '/newRecipe/components/' + payload.recipeId,
          headers: { access_token : context.state.token},
          data : {
            lists : payload.ingredients,
            category : 'ingredients'
          },
        })
      }

      function postTools(){
        return axios({
          method: 'post',
          url: '/newRecipe/components/' + payload.recipeId,
          headers: { access_token : context.state.token},
          data : {
            lists : payload.tools,
            category : 'tools'
          },
        })
      } 

      if(payload.ingredients.length && payload.tools.length){
        console.log('masuk 2');
        Promise.all([postIngredients(), postTools()])
        .then((result) => {
          console.log(result[0].data);
          console.log(result[1].data);
          router.push('/addRecipe/methods/'+payload.recipeId)
        }).catch((err) => {
          console.log(err);
        });

      }else {
        let flag = false
        if(payload.ingredients.length) flag = 'postIngredients'
        if(payload.tools.length) flag = 'postTools'

        if(flag === 'postIngredients'){
          postIngredients()
          .then((result) => {
            console.log(result);
            router.push('/addRecipe/methods/'+payload.recipeId)
          }).catch((err) => {
            console.log(err);
          });
        }
        else if(flag === 'postTools'){
          postTools()
          .then((result) => {
            console.log(result);
            router.push('/addRecipe/methods/'+payload.recipeId)
          }).catch((err) => {
            console.log(err);
          });
        }
        else{
          console.log('Ingredients & Tools is empty, Please add something first');
        }
      }
    },

    postMethod(context, payload){
      return axios({
        method: 'post',
        url: 'newRecipe/methods/' + payload.recipeId,
        headers: { access_token : context.state.token},
        data : payload.data,
      })
    },

    patchStatusRecipe(context, payload){
      return axios({
        method: 'patch',
        url: 'newRecipe/publish/' + payload.recipeId,
        headers: { access_token : context.state.token},
        data : { status: payload.status}
      })
    },

    fetchOriginalRecipe(context, payload){
      axios({
        method: 'get',
        url: 'myProfile/recipes',
        headers: { access_token : context.state.token},
      })
      .then(({data}) => {
        context.commit('SET_ORIGINALRECIPES', data)
      }).catch((err) => {
        console.log(err);
      });
    },

    editRecipe(context, payload){
      return axios({
        method: 'put',
        url: 'editRecipe/' + payload.recipeId,
        headers: { access_token : context.state.token},
        data : payload
      })
    }

  },
  modules: {
  }
})
