<template>
   <div class="container text-center mt-5">
      <div class="row">
         <div class="col">
            <div class="card d-flex justify-content-center">
               <div
                  style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"
               >
                  <i class="checkmark">✓</i>
               </div>
               <h3>
                  Selamat Transaksi Telah Selesai
                  <br />
                  Silahkan menunggu, transaksi Anda akan segera kami konfirmasi!
               </h3>
               <button @click.prevent="sentBillToDB" class="btn btn-primary">
                  Oke
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

export default {
   name: "FinishBill",
   methods: {
      sentBillToDB() {
         // The get() method of the URLSearchParams interface returns the first value associated to the given search parameter.
         const params = new URLSearchParams(document.location.search)
         const order_id = params.get("order_id")
         const transaction_status = params.get("transaction_status")

         axios({
            method: "POST",
            url: `${baseURL}/bills/sentBillToDB`,
            data: {
               OrderId: order_id,
               transaction_status: transaction_status,
               UserId: localStorage.getItem("id")
            },
            headers: {
               access_token: localStorage.getItem("access_token")
            }
         })
            .then(_ => {})
            .catch(err => console.log(err))

         this.$router.push({
            path: "/account/history-bills",
            query: { order_id }
         })
      }
   }
}
</script>

<style scoped>
body {
   text-align: center;
   padding: 40px 0;
   background: #ebf0f5;
}
h1 {
   color: #88b04b;
   font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
   font-weight: 900;
   font-size: 40px;
   margin-bottom: 10px;
}
p {
   color: #404f5e;
   font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
   font-size: 20px;
   margin: 0;
}
i {
   color: #9abc66;
   font-size: 100px;
   line-height: 200px;
   margin-left: -15px;
}
.card {
   background: white;
   padding: 60px;
   border-radius: 4px;
   box-shadow: 0 2px 3px #c8d0d8;
   display: inline-block;
   margin: 0 auto;
}
</style>
