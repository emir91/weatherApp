$(document).ready(function(){
    
    $("#send").on("click", function(){

        var city = $("#city").val();
        

        if(city != ""){

            $.ajax({

                url:"http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d2cbbadc1f224bb0efbcdbac5b16e4fe",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    var land = data.sys.country;
                    var city = data.name;
                    var cityInfo = "<h4>"+city+","+land+"</h4>";
                    var result = tempHum(data);
                    $("#cityName").html(cityInfo);
                    $("#data").html(result);
                    $("#city").val(''); 
                },
                
            });

            $.ajax({

                url: "https://api.waqi.info/feed/"+city+"/?token=6451ec918ac6aae5b1522e5a13fdd3389b3e9fa5",
                type: "GET",
                dataType: "jsonp",
                success: function(res){
                    var qualRes = airQual(res);
                    $("#data").append(qualRes);
                }
            });
        } else {
            alert('The input field must contain right city name');
        }
            
    });
});

 function tempHum(data){
    var cel = Math.round(data.main.temp - 273.15);
    var des = data.weather[0].description;
    var pic = data.weather[0].icon;
    var temp = "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Temperature</h3></div><div class='panel-body body-font'><p>"+cel+" C&deg</p></div><div class='panel-footer'></div></div></div>";
    var desc = "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3 style='text-transform:capitalize'>"+des+"</h3></div><div class='panel-body'><img src='http://openweathermap.org/img/wn/"+pic+".png'>"+"</div><div class='panel-footer'></div></div></div>";
    return temp + desc;
}

function airQual(res){
    var qual = res.data.aqi;

    if(qual <= 50){
        return "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer good white'>Good</div></div></div>";
    } else if(qual <= 100){
        return "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer moderate'>Moderate</div></div></div>";
    } else if(qual <= 150){
        return  "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer sensitive-groups'>Unhealty for sensitive groups</div></div></div>";
    } else if(qual <= 200){
        return "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer unhealty white'>Unhealty</div></div></div>";
    } else if(qual <= 300){
        return "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer very-unhealty white'>Very Unhealty</div></div></div>";
    } else{
        return "<div class='col-md-4'><div class='panel panel-info'><div class='panel-heading'><h3>Air Quality Index</h3></div><div class='panel-body body-font'>"+qual+"</div><div class='panel-footer hazardous white'>Hazardous</div></div></div>";
    }
}

