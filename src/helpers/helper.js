helpers = {};


helpers.getCategory = function() {
    let categories = [ "Depression","Addictions","Phobias","Conflicts of couple and family","Eating disorders","Distress"]
    let totalCategories = categories.length;
    let randomCategory = categories[Math.floor(Math.random() * totalCategories)]
    return randomCategory
}
helpers.getRole = function() {
    let roles = ["Patient", "Therapist"]
    let totalRoles = roles.length;
    let randomRole = roles[Math.floor(Math.random() * totalRoles)]
    return randomRole
}

helpers.getPhone = function() {
    var numeros = "1234567890";
    var numero = "";
    for (i=0; i<8; i++) numero +=numeros.charAt(Math.floor(Math.random()*numeros.length)); 
    var numero= 6 + numero
    return numero
}


module.exports = helpers;