var aPro = ["广东省","广西省","福建省"];
var aCity = [["广州","深圳","中山"],["a","b","c"],["d","e","f"]];
var aCountry = [[["a","b"],['c','d'],['e','f']],[['i','j'],['k','l'],['m','n']],[['o','p'],['q','r'],['s','t']]];
var temp1,temp2;
for(var i = 0;i<aPro.length;i++)
{
    $("#selProvince").append("<option>"+aPro[i]+"</option>");
}
$("#selProvince").change(function(){
    $("#selCountry").children().not(":eq(0)").remove();
    $("#selCity").children().not(":eq(0)").remove();
    temp1 = $(this).children("option:selected").index();
    var aaCity = aCity[temp1-1];
    for(var i = 0;i<aaCity.length;i++)
{
    $("#selCity").append("<option>"+aaCity[i]+"</option>");
}
});
$("#selCity").change(function(){
    $("#selCountry").children().not(":eq(0)").remove();
    temp2 = $(this).children("option:selected").index();
    var aaCountry = aCountry[temp1-1][temp2-1];
    for(var i = 0;i<aaCountry.length;i++)
{
    $("#selCountry").append("<option>"+aaCountry[i]+"</option>");
}
});