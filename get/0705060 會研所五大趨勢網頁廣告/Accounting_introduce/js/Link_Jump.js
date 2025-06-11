$(function () {//所有連結＃後面自動滑動

           $('a[href*=#]:not([href=#])').click(function() {
               var target = $(this.hash);
               $('html,body').animate({
                   scrollTop: target.offset().top
               }, 1000);
               return false;
           });

       });