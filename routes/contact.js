const express=require("express")
const router=express.Router()
const Contact=require("../models/contact")
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

router.post("/contact",(req,res)=>{
   const { name,email, phoneno, typeofshifting,from,to,floorfrom,floorto }=req.body;
   const newcontact=new Contact({ name,email, phoneno, typeofshifting,from,to,floorfrom,floorto })
   newcontact.save()
   .then(() => {
    const mailOptions = {
      from:email,
      to: 'infoswiftygo@gmail.com',
      subject: 'for information',
      text: `Name:${name}, Email:${email}, Phone:${phoneno}, Type:${typeofshifting}, From:${from}, To:${to},  from:${floorfrom},  to:${floorto}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send  email.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Thank you we will connect you soon.' });
      }
    });
  })
  .catch((error) => {
    console.error('Error saving Contact:', error);
    res.status(500).json({ success: false, message: 'Failed to save Contact.' });
  });
})


router.get("/all",async(req,res)=>{
try {
 const cnt= await Contact.find()
 res.send(cnt)
} catch (error) {
  console.log(error);
}
})

module.exports=router;