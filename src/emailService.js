const nodemailer = require('nodemailer')

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
}
  
// transporter to send email
const transporter = nodemailer.createTransport(transport)
  
transporter.verify((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

const receiveEmail = async (email, name, message) => {
  const mail = {
    from: email,
    to: process.env.EMAIL,
    subject: `MJWS contact ${name}`,
    text: message,
    replyTo: email
  }

  transporter.sendMail(mail, (err) => {
    if (err) {
      throw new Error(err)
    } else {
      return message
    }
  })
}

const sendEmailReceived = async (email) => {
  const mail = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Kiitos yhteydenotosta',
    text: 'Tämä on automaattisesti lähetetty sähköposti, \
    joka ilmoittaa,että yhteydenottonne on tullut perille \
    ja siihen vastataan mahdollisimman pian'
  }

  transporter.sendMail(mail, (err) => {
    if (err) {
      throw new Error(err)
    }
  })
}

module.exports = {
  receiveEmail,
  sendEmailReceived
}