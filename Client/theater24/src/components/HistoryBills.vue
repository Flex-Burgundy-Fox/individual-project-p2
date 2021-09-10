<template>
   <table class="table">
      <thead>
         <tr>
            <th scope="col">#</th>
            <th scope="col">ORDER ID</th>
            <th scope="col">STATUS</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="(bill, index) in historyBills" :key="bill.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ bill.OrderId }}</td>
            <td>
               {{
                  bill.transaction_status === "settlement"
                     ? "success"
                     : bill.transaction_status
               }}
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
import axios from "axios"

const baseURL = "https://theater24.herokuapp.com"

export default {
   name: "HistoryBills",
   data() {
      return {
         emailUser: localStorage.getItem("email"),
         historyBills: []
      }
   },
   methods: {
      fetchHistoryBills() {
         axios({
            method: "GET",
            url: `${baseURL}/bills/showBill`,
            headers: {
               access_token: localStorage.getItem("access_token"),
               order_id: this.$route.query.order_id
            }
         })
            .then(({ data }) => {
               this.historyBills = data.data
            })
            .catch(err => console.log(err))
      }
   },
   created() {
      this.fetchHistoryBills()
   }
}
</script>

<style></style>
