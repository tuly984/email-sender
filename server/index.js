const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.post('/mail', async (req, res, next)=> {

// getting from client
    const {email, subject, text} = req.body;

    //console.log(email, subject, text);
    // create reusable transporter object using the default ship trsnsport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            // email of sender
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let message = {
        from: process.env.EMAIL, // sender a
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: "<b>+ text +</b>", // html body
      };

      try{
        const info = await transporter.sendMail(message);
        res.status(200).json({
            "Message": message
        });
        console.log(info);
      }catch (err){
         res.send(err);
        console.log("Error" + err);
      }

      transporter.close();

});
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () =>console.log('server is running on port :' + PORT));