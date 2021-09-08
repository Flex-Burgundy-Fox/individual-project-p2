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
            <button type="button" class="btn btn-primary mx-auto" @click="login" data-bs-dismiss="modal">Login</button>
          </div>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    name: 'LoginModal',
    data(){
        return{
            user: {
                email : '',
                password: ''
            }
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', this.user)
            .then(({data}) => {
                localStorage.access_token = data.token
                this.$store.commit('SET_TOKEN', data.token)
                this.$store.commit('SET_USERDATA', data.userData)
                this.$store.dispatch('fetchOrginalRecipe')
                this.user = {
                  email : '',
                  password: ''
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    },
}
</script>

<style>

</style>