const mongoose = require('mongoose');
const Contact = require('./models/contact');
const Prayer = require('./models/prayer');
const Comment = require('./models/comment');


var prayerData = [
	{
		title:"prayer1",
	 	prayer: "alkfs;dfsadkfjas;dflksda;lfjasdl;fjasfasdl;faslf",
		image: "https://www.kpccoh.org/files/attach/images/196/830/014/31adfe432add1a2992dda9539b2c8c08.JPG"
	},
	{
		title:"prayer1",
	 	prayer: "alkfs;dfsadkfjas;dflksda;lfjasdl;fjasfasdl;faslf",
		image: "https://www.kpccoh.org/files/attach/images/196/970/015/9d1d026a0e251ea0492f51e56acd90a5.jpg"
	},
	{
		title:"prayer1",
	 	prayer: "alkfs;dfsadkfjas;dflksda;lfjasdl;fjasfasdl;faslf",
		image: "https://www.kpccoh.org/files/attach/images/196/243/015/f549375b1a43b613a91c42fdb3fb2d05.jpeg"
	},
	{
		title:"prayer1",
	 	prayer: "alkfs;dfsadkfjas;dflksda;lfjasdl;fjasfasdl;faslf",
		image: "https://www.kpccoh.org/files/attach/images/196/243/015/fbc960000efa103e5467b59423194da3.jpeg"
	}
];


function seedDB() {
	Prayer.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed contacts!");
			// add a new contact
			prayerData.forEach(function(prayer){
				Prayer.create(prayer, function(err, newPrayer){
					if(err){
						console.log(err);	
					} else {
						Comment.create(
							{
								text:"You are always in my prayer...",
								author:"kwons"
							}, function(err, newComment) {
								if(err){
									console.log(err);
								} else {
									newPrayer.comments.push(newComment);
									newPrayer.save();
									console.log("created a new comment!");
								}
							}
							
						)
					}
				});
			});
		}
	});
	
}	
	
module.exports = seedDB;