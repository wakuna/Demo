$(document).ready(function(){
     				$.ajax({
     				type: "GET",
     				url: "/gh/get/response.xml/wakuna/xml/blob/tree/journey.xml",
     				dataType: "xml",
     				success: function(xml){
     				var $journeys = $(xml).find('journey');
     				var totalJourneys = $journeys.length;
     				var journeysPerPage = 3;
     				var startIndex = 0;
     				//var numberOfPages = Math.ceil(totalJourney/journeysPerPage);
     				var output = "";
     				var displayJourneys = function() {
	     				var $journeySlice = $journeys.slice(startIndex, journeysPerPage);
	     				$('#shelf-items').html('');
	     					$journeySlice.each(function(){
	     					var title = $(this).find('title').text();
	     					var subtitle = $(this).find('subtitle').text();
	     					var image = $(this).find('image').filter('[default="1"]').attr('name');
	     					output += '<li><img src="http://static.studiosus.com/image/198x132/' + image + '" width="80px" height="50px"></img>' + 
	     						'<br /><h3><span class="title">' + title + 
	     						'</span><span class="subtitle">' + subtitle + 
	     						'</span></h3></li>';
	     					if (startIndex == 0){
	         					$('#control_previous').hide();
	         				}
	         				else {
	         					$('#control_previous').show();
	         				}
	     				});
	     				output += '<li>' + startIndex + '&nbsp;' + totalJourneys + '</li>';
	     				$('#slider_journeys').html(output).appendTo('#shelf-items');
     				}
     				
     				if (startIndex == 0){
     					$('#control_previous').hide();
     					$('#slider_journeys').append(startIndex);
     				}
     				else {
     					$('#control_previous').show();
     				}
     				
	     			$('#control_previous').click(function() {
	                    if( startIndex <= totalJourneys) {
	                        startIndex -= journeysPerPage;
	                       displayJourneys();
	                       if (startIndex <= 0){
	                    	   $('#control_previous').hide();
	                       }
	                    }
	                });
	     			
	     			$("#control_next").click(function(){
	     				if( startIndex < totalJourneys) {
	     					startIndex += journeysPerPage;
	     					displayJourneys();
	                     }else {
	                    	$('#control_next').hide();
	                     }
	             	}); 
	     			
	                displayJourneys(); // display for the first time (ajax call);
	            }
	   }); 
       		});
