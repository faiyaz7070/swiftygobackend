const express=require("express")
const router=express.Router()
const Querry=require("../models/querry")
const nodemailer=require("nodemailer")


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'malickfaiyaz415@gmail.com',
    pass: 'xntilylligbrahei'
  }
});

router.post("/querry",(req,res)=>{
   const { name,email, phoneno,querry }=req.body;
   const newQuerry=new Querry({ name,email, phoneno, querry })
   newQuerry.save()
   .then(() => {
    const mailOptions = {
      from:email,
      to: 'infoswiftygo@gmail.com',
      subject: 'for information',
      text: `Name:${name}, Email:${email}, Phone:${phoneno}, Querry:${querry}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send  email.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Thank you we will Reply you soon.' });
      }
    });
  })
  .catch((error) => {
    console.error('Error saving Querry:', error);
    res.status(500).json({ success: false, message: 'Failed to save Querry.' });
  });
})


router.get('/queries', (req, res) => {
  // You can add any logic here to retrieve queries from your database
  Querry.find()
    .then((queries) => {
      res.status(200).json(queries);
    })
    .catch((error) => {
      console.error('Error retrieving queries:', error);
      res.status(500).json({ success: false, message: 'Failed to retrieve queries.' });
    });
});

module.exports=router;