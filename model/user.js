require('dotenv').config();
const hgSql = require("./paneldb.js");
const jwt = require("jsonwebtoken");


const Users = function(users) {};

Users.loginUsers = (my_data, result) => {

  const password = my_data.password;
  const encryptedPass = encrypt(password);
  const mhash = JSON.stringify(encryptedPass);

  console.log(mhash);

  let query = "select id, password, user_role, user_name, user_profile,last_login_date, email from users where user_name='"+ my_data.user_name+"' and status=1";
  hgSql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if(res.length<=0)
    {
      result(null, 2);
    }else
    {
      const txt = decrypt(JSON.parse(res[0].password));
     // console.log("my text");
      if(txt==password)
      {

      const token = jwt.sign({ id: res[0].id }, process.env.USER_TOKEN);
      const data = { "token":token, "user_role": res[0].user_role, "user_name": res[0].user_name, "last_login":res[0].last_login_date,"email":res[0].email,"user_profile":res[0].user_profile, "user_id":res[0].id};
      result(null, data);
    }else{
      result(null,0);
    }
    }

  });

};


Users.addUsers = (my_data, result) => {

const password = my_data.password;
const encryptedPass = encrypt(password);
const mhash = JSON.stringify(encryptedPass);

let created = new Date().toISOString().slice(0, 10);

//check if user exists
let checkQuery = "select id from users where user_name='"+my_data.user_name+"' or email='"+ my_data.email+"'";
hgSql.query(checkQuery, (err, res)=>{
  if(err)
  {
    result(err, null);
    return;
  }
  if(res.length<=0){
    hgSql.query("insert into users (user_name, password, user_role, status, created_at, last_login_date, ip_address, email, user_tags, date_of_birth, contact_number) values ('"+ my_data.user_name +"', '"+ mhash +"', '"+ my_data.user_role +"',  '"+ my_data.status +"', '"+  created +"', '"+  created +"', '127.0.0.1','"+  my_data.email +"','"+  my_data.user_tags +"','"+  my_data.date_of_birth +"','"+  my_data.contact_number +"')", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null,1);
    });
  }else{
    result(null, 2);
  }
});
};



Users.getUsers = (result) => {  
  let checkQuery = "select * from users where status=1";
  hgSql.query(checkQuery, (err, res)=>{
    if(err)
    {
      result(err, null);
      return;
    }
    else{
      result(null, res);
      return;
    }
  });
  };

module.exports = Users;
