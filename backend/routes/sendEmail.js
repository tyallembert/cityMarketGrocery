var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
    auth: {
        user: 'groceryDepartmentAuto@gmail.com',
        pass: 'xqqqlikqakzcdwrf'
    }
});
transporter.verify().then(console.log).catch(console.error);

const handlebarOptions = {
  viewEngine: {
      layoutsDir: './templates',
      defaultLayout: false,
  },
  viewPath: './templates',
};

function sendEmail() {
  console.log("sending mail")
  var mailOptions = {
    from: 'Grocery Auto<groceryDepartmentAuto@gmail.com>',
    to: 'tyallembert@gmail.com',
    subject: 'End Of Day Report',
    template: 'EODemail',
    context: {
      test: "Testing variable"
    }
  };
  transporter.use('compile', hbs(handlebarOptions));
    
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
}

module.exports = { sendEmail };