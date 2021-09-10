const { User, Bill } = require("../models")

const axios = require("axios")

const URL_MIDTRANS = "https://app.sandbox.midtrans.com/snap/v1/"
const URL_MIDTRANS_STATUS = "https://api.sandbox.midtrans.com/v2/"

const HEADER_MIDTRANS = {
   Authorization: process.env.HEADER_MIDTRANS
}

class BillController {
   static checkout(req, res, next) {
      const data = {
         transaction_details: {
            order_id: req.body.transaction_details.order_id,
            gross_amount: req.body.transaction_details.gross_amount
         },
         credit_card: {
            secure: req.body.credit_card.secure
         }
      }

      axios({
         method: "POST",
         url: `${URL_MIDTRANS}/transactions`,
         data: data,
         headers: HEADER_MIDTRANS
      })
         .then(({ data }) => res.status(201).json({ data }))
         .catch((err) => next(err))
   }

   static sentBillToDB(req, res, next) {
      const { OrderId, transaction_status, UserId } = req.body

      Bill.create({ OrderId, transaction_status, UserId })
         .then((_) => {})
         .catch((err) => next(err))
   }

   static showBill(req, res, next) {
      if (req.headers.order_id !== "undefined" && "order_id" in req.headers) {
         Bill.findOne({
            where: {
               OrderId: req.headers.order_id
            }
         })
            .then((bill) => {
               axios({
                  method: "GET",
                  url: `${URL_MIDTRANS_STATUS}${bill.OrderId}/status`,
                  headers: HEADER_MIDTRANS
               })
                  .then(({ data }) => {
                     Bill.update(
                        {
                           transaction_status: data.transaction_status
                        },
                        {
                           where: {
                              OrderId: data.order_id
                           }
                        }
                     )
                        .then((_) => {
                           Bill.findAll({
                              include: [
                                 {
                                    model: User
                                 }
                              ],
                              where: {
                                 UserId: req.currentUser.id
                              }
                           })
                              .then((data) => {
                                 if (
                                    data[data.length - 1].transaction_status ===
                                    "settlement"
                                 ) {
                                    User.update(
                                       {
                                          role: "pro"
                                       },
                                       {
                                          where: {
                                             id: req.currentUser.id
                                          }
                                       }
                                    )
                                       .then((_) => {})
                                       .catch((err) => next(err))
                                 }
                                 res.status(200).json({ data })
                              })
                              .catch((err) => next(err))
                        })
                        .catch((err) => next(err))
                  })
                  .catch((err) => next(err))
            })
            .catch((err) => next(err))
      } else {
         Bill.findAll({
            where: {
               UserId: req.currentUser.id
            }
         })
            .then((data) => res.status(200).json({ data }))
            .catch((err) => next(err))
      }
   }
}

module.exports = BillController
