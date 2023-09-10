const express=require("express")
const router=express.Router()
const Message=require("../models/message")
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

router.post("/message",(req,res)=>{
   const { name,email,message }=req.body;
   const newMessage=new Message({ name,email, message })
   newMessage.save()
   .then(() => {
    const mailOptions = {
      from:email,
      to: 'infoswiftygo@gmail.com',
      subject: 'to know more',
      text: `Name:${name}, Email:${email}, message:${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send  email.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Thank you for your question. You will get your answer soon.' });
      }
    });
  })
  .catch((error) => {
    console.error('Error saving Message:', error);
    res.status(500).json({ success: false, message: 'Failed to save Message.' });
  });
})
module.exports=router;