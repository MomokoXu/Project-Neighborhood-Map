/*
This is empty on purpose! Your code to build the resume will go here.
 */
 /*
var name = "Momoko Xu";
var awesomeThoughts = "I am " + name + " and I am AWESOME!";
$("#main").append(awesomeThoughts);
awesomeThoughts.replace("AWESOME", "CUTE");
$("#main").append(awesomeThoughts);
*/
var formattedName = HTMLheaderName.replace("%data%", "Momoko Xu");
var formattedRole = HTMLheaderRole.replace("%data%", "Software Developer");
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
