<template>
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title mx-auto" id="staticBackdropLabel">Login to Gourmet Tavern</h4>
          </div>
          <div class="modal-body">

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model='user.email' type="string" class="form-control">
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model='user.password' type="password" class="form-control">
            </div>
            <div class="mb-3">
			        <a class="form-text" href='' data-bs-toggle="modal" data-bs-target="#registerModal" data-bs-dismiss="modal">Don't have an account? Register here.</a>
		        </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> -->
			<GoogleLogin class="btn btn-primary mx-auto" :params="params" :onSuccess="onSuccess" :onFailure="onFailure" data-bs-dismiss="modal">Login with Google</GoogleLogin>
            <button type="button" class="btn btn-primary mx-auto" @click="login" data-bs-dismiss="modal">Login with Email</button>
          </div>
        </div>
    </div>
</div>
  
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name: 'LoginModal',
    components: {GoogleLogin},
    data(){
        return{
            user: {
                email : '',
                password: ''
            },
            params: {
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
            },
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', this.user)
            .then(({data}) => {
				this.$toasted.success(data.message, {
					icon: 'check',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					},
					duration: 3000
				})
                localStorage.access_token = data.token
                this.$store.commit('SET_TOKEN', data.token)
                this.$store.commit('SET_USERDATA', data.userData)
                this.$store.dispatch('fetchUserRecipe')
                this.$store.dispatch('fetchPurchasedRecipe')
                this.user = {
                  email : '',
                  password: ''
                }
            }).catch((err) => {
              // this.$toasted.error(response.data.message, {
              //     icon: 'warning',
              //     action: {
              //         text: 'Close',
              //         onClick: (e, toastObject) => {
              //             toastObject.goAway(0);
              //         }
              //     },
              //     duration: 5000
              // })
                console.log(err)
            });
        },
        onSuccess(googleUser) { 
			let token = googleUser.getAuthResponse().id_token;
			this.$store.dispatch('loginGoogle', {token})
			.then(({ data }) => {
				this.$toasted.success('Login SuccessFully', {
                  icon: 'check',
                  action: {
                      text: 'Close',
                      onClick: (e, toastObject) => {
                          toastObject.goAway(0);
                      }
                  },
                  duration: 3000
              	})
				localStorage.access_token = data.token
				this.$store.commit('SET_TOKEN', data.token)
				this.$store.commit('SET_USERDATA', data.userData)
				this.$store.dispatch('fetchUserRecipe')
				this.$store.dispatch('fetchPurchasedRecipe')
				this.user = {
				email : '',
				password: ''
				}
			})
			.catch(err => console.log(err.response.data))
        },

		onFailure(err){
			console.log(err);
		}
    },
}
</script>

<style>

</style>