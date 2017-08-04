/*
This is empty on purpose! Your code to build the resume will go here.
 */
 /* Test for Javascript
var name = "Momoko Xu";
var awesomeThoughts = "I am " + name + " and I am AWESOME!";
$("#main").append(awesomeThoughts);
awesomeThoughts.replace("AWESOME", "CUTE");
$("#main").append(awesomeThoughts);
*/
langs = ["Java", " Python", " JavaScript", " HTML/CSS", " C++", " MATLAB"," SQL"];
libs = ["AWS", " Hadoop", " Spark", " Mahout", " Numpy", " Scipy", " Pandas", " Tweepy", " Bootstrap"];
tools = ["Sublime Text", " Eclips", " Git"];
oss = ["macOs", " Linux(CentOS)"];
var bio = {
	"name": "Momoko Xu",
	"role": "Software Developer",
	"email": "momoko0808@hotmail.com",
	"picture": "images/me.jpg",
	"linkedIn": "https://www.linkedin.com/in/yingtao-xu-25b72677/",
	"github": "https://github.com/MomokoXu",
	"website": "http://www.momokoxu.com/",
	"langs": langs,
	"libs": libs,
	"tools":tools,
	"oss":oss,
	"message": "Welcome to Momoko's Resume App"
}
var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
var formattedEmail = HTMLemail.replace("%data%", bio.email);
var formattedGithub = HTMLgithub.replace("%data%", bio.github);
var formattedLinkedin = HTMLlinkedin.replace("%data%", bio.linkedIn);
var formattedWeb = HTMLweb.replace("%data%", bio.website);
var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);
var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.message);
$("#header").prepend(formattedWelcomeMsg);
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
$("#header").prepend(formattedPicture);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedLinkedin);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedWeb);
$("#header").append(HTMLskillsStart);
var formattedLangs = HTMLlangs.replace("%data%", bio.langs);
var formattedLibs = HTMLlibs.replace("%data%", bio.libs);
var formattedTools = HTMLtools.replace("%data%", bio.tools);
var formattedOSs = HTMLoss.replace("%data%", bio.oss);
$("#header").append(formattedLangs);
$("#header").append(formattedLibs);
$("#header").append(formattedTools);
$("#header").append(formattedOSs);

var work = {};
work.position = "Software Developer";
work.city = "Mountian View";

var education = {};
education["school"] = "Columbia University";
education["year"] = "2015 Fall";
education["city"] = "New York";
education["degree"] = "Master"

var formattedTitle = HTMLworkTitle.replace("%data%", work.position);
var formattedJobCity = HTMLworkLocation.replace("%data%", work.city);
$("#workExperience").append(HTMLworkStart);
$("#workExperience").append(formattedTitle);
$("#workExperience").append(formattedJobCity);

var formattedschoolName = HTMLschoolName.replace("%data%", education.school);
var formattedschoolDegree = HTMLschoolDegree.replace("%data%", education.degree);
var formattedschoolDates = HTMLschoolDates.replace("%data%", education.year);
var formattedschoolCity = HTMLschoolLocation.replace("%data%", education.city);
$("#education").append(HTMLschoolStart);
$("#education").append(formattedschoolName);
$("#education").append(formattedschoolDegree);
$("#education").append(formattedschoolDates);
$("#education").append(formattedschoolCity);

var educationJSON = {
	"schools": [
		{
			"name": "Columbia University",
			"city": "New York",
			"degree": "Msc",
			"major": ["EE", "CS"]
		},

		{
			"name": "University of Oxford",
			"city": "Oxford",
			"degree": "Msc",
			"major": ["Biomedical Engineering"]
		}
	]
};

