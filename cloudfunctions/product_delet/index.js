// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'huanjing-tbskh'
})
const db = cloud.database();
const _ =db.command;


// 云函数入口函数
exports.main = async (event, context) => {
  ap=cloud.getWXContext()
  try{
     return await db.collection("cart").where({
       _openid:ap.OPENID,
       checked:"true"
     }).remove()
  }
  catch(e){
    console.log("云函数失败",e)
  }
}