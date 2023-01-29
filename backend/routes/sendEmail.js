// var nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars')
// const path = require('path')

// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//     auth: {
//         user: 'groceryDepartmentAuto@gmail.com',
//         pass: 'xqqqlikqakzcdwrf'
//     }
// });
// transporter.verify().then(console.log).catch(console.error);

// const handlebarOptions = {
//   viewEngine: {
//       layoutsDir: './templates',
//       defaultLayout: false,
//   },
//   viewPath: './templates',
// };

// function sendEmail(data) {
  
//   var totalBoxes = 0;
//   var totalBoats = 0;
//   [totalBoxes, totalBoats] = calculateTotals(data);
//   var mailOptions = {
//     from: 'Grocery Auto<groceryDepartmentAuto@gmail.com>',
//     to: 'tyallembert@gmail.com',
//     subject: 'End Of Day Report',
//     template: 'EODemail',
//     context: {
//       data: data,
//       totalBoats: totalBoats,
//       totalBoxes: totalBoxes
//     }
//   };
//   transporter.use('compile', hbs(handlebarOptions));
    
//   transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//   });
// }
// function calculateTotals(data){
//   console.log("got into calculate");
//   console.log(typeof data.liveFreight)
//   var tempBoxes = 0;
//   var tempBoats = 0;
//   for(var value in data.liveFreight){
//     tempBoxes += parseInt(data.liveFreight[value].boxes);
//     tempBoats++;
//   }
//   return [tempBoxes, tempBoats];
// }

// module.exports = { sendEmail };