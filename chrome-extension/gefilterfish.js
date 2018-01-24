// Grab the ASIN and product title
var asin         = document.getElementById("ASIN").value;
var productTitle = document.getElementById("productTitle").innerText;

// Check if ASIN is in our database
$.get( "https://localhost:5000/in_db", { asin: asin })
  .done( function ( in_db ) {

    // If in the DB then modify the page
    if (in_db) {

      // Grab the topics and add in the buttons
      $.get( "https://localhost:5000/model", { asin: asin })
        .done( function( data ) { 

        // Replace the title of the section
        $('h3[data-hook="lighthut-title"]').replaceWith('<h3 data-hook="lighthut-title" class="a-spacing-base">Topics in customer reviews</h3>');
     
          // Add in buttons
          console.log(data.topic.length); 
          $('.cr-lighthouse-terms').replaceWith('<div class="cr-lighthouse-terms"><div float="left">');
          for (var i = 0; i < data.topic.length; i++) {
            $('.cr-lighthouse-terms').append('<span class="a-declarative">'+
                                                '<form action="https://127.0.0.1:5000/reviews?topic='+i+'&title='+encodeURIComponent(productTitle)+'" method="post">'+
                                                 ' <button class="cr-lighthouse-term" name="submit" type="submit">'+data.topic[i]+'</button>'+
                                                '</form>'+
                                              '</span>');
          }
          $('.cr-lighthouse-terms').append('</div></div>');
//          $(".cr-lighthouse-terms").css({"backgroundColor": "black", "color": "white"});
      
        });

    } 

  });




