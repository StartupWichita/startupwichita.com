     $(document).ready(function() {
        function getOwlJson(fileURL, funcDataSuccess){
          var jsonData;
          jQuery.getJSON( fileURL ).done(function( data ){ funcDataSuccess( data ); });
        }
        function insertOwlJson(fileURL, funcDataSuccess){
          var json = getOwlJson(fileURL);
          funcDataSuccess(json);
        }

        function customOwlWidthSetup(owlItemWidth){
          var singleW = owlItemWidth;
          var itemCount = 0;
          var itemsCustom = {};

          while((singleW*itemCount)+1<2000){
            var start = (singleW*itemCount) + 1;
            var tempCount = itemCount + 1;
            itemsCustom[start] ={
              items: tempCount
            }
            itemCount++;
          }
          return itemsCustom;
        }

        getOwlJson('json/peopleData.json', peopleDataSuccess);

        function peopleDataSuccess(data){
          var content = '';
          var $target = $('#peopleCarousel');
          for(var i in data.items){

             var fname = data.items[i].fname;
             var lname = data.items[i].lname;
             var title = data.items[i].title;
             var description = data.items[i].description;
             var img = data.items[i].img;
             var alt = data.items[i].alt;

             content += '<div>';
             content += '<img class="lazyOwl" src="' +img+ '" data-src="' +img+ '" alt="' +alt+ '">';
             content += '<div class="people-teaser white text-center"><h4>' +title+ '</h4><h4>' +fname+ ' ' +lname+ '</h4><p>' +description+ '</p></div>';
             content += '</div>';
          }
          $target.html(content);
          $target.owlCarousel({
            dots: false,
            loop: true,
            navigation: !Modernizr.touch,
            navText: ['',''],
            lazyLoad: true,
            themeClass: '',
            responsive: customOwlWidthSetup(292)
          });
        }

        getOwlJson('json/newsData.json', newsDataSuccess);
        function newsDataSuccess(data){
          var $target = $('#newsCarousel');
          var content = '';
          for(var i in data.items){

             var headline = data.items[i].headline;
             var teaser = data.items[i].teaser;
             content += '<div>';
             content += '<div class="news-teaser white"><a href="#"><h3 class="text-center white">' +headline+ '</h3><p class="white">' +teaser+ '</p></a></div>';
             content += '</div>';
          }
          $target.html(content);
          $target.owlCarousel({
            dots: false,
            loop: true,
            navigation: !Modernizr.touch,
            navText: ['',''],
            lazyLoad: true,
            themeClass: '',
            responsive: customOwlWidthSetup(550)
          });
        }

        getOwlJson('json/resourcesData.json', resourcesDataSuccess);
        function resourcesDataSuccess(data){
          var $target = $('#resourcesCarousel'),
              content = '',
              itemsCount = data.items.length;
          for(var i=0; i< itemsCount; ){
             content += '<div><div class="container-fluid">';
             content += '<div class="row">';
             for(var k=0; k<6; k++){
               if(i >= itemsCount){
                   break;
               } else {
                 var headline = data.items[i].headline,
                     itemdate = data.items[i].itemdate,
                     teaser   = data.items[i].teaser;
                 content += '<div class="col-sm-4 resource-wrapper"><div class="resources-teaser white"><a href="" class="white grey-bg"><h3 class="white">' +headline+ '</h3><p class="date white">' +itemdate+ '</p><p class="white sm-collapse">' +teaser+ '</p></a></div></div>';
                 i++;
               }
             }
             content += '</div>';
             content += '</div></div>';
          }
          $target.html(content);
          $target.owlCarousel({
            items:1,
            dots: false,
            loop: true,
            navigation: !Modernizr.touch,
            navText: ['',''],
            lazyLoad: true,
            themeClass: ''
          });
        }
      });
