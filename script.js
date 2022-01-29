var save = document.getElementById("save");

save.addEventListener('click', function(){
	var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
	var blood_type = document.getElementById("blood_type").value;
	var email = document.getElementById("email").value;
	var date = document.getElementById("date").value;
	add_donor_information(fname, lname, blood_type, email, date);
})
/*

var Clear = document.getElementById("Clear");
var Edit = document.getElementById("Edit");
var Delete = document.getElementById("Delete");
var Search = document.getElementById("Search");



Clear.addEventListener('click', function(){
	document.getElementById("c_RID").value = '';
	document.getElementById("dropdown").value = '';
	document.getElementById("c_date").value = '';
	document.getElementById("c_rstatus").value = '';
	document.getElementById("c_pstatus").value = '';
	document.getElementById("c_RT").value = '';
})

Edit.addEventListener('click', function(){
	var rid = document.getElementById("c_RID").value;
	var cid = document.getElementById("dropdown").value;
	var date = document.getElementById("c_date").value;
	var rstatus = document.getElementById("c_rstatus").value;
	var pstatus = document.getElementById("c_pstatus").value;
	var rt = document.getElementById("c_RT").value;
	editReservation(rid, cid, date, rstatus, pstatus, rt);
})

Delete.addEventListener('click', function(){
	var rid = document.getElementById("c_RID").value;
	delReservation(rid);
})

Search.addEventListener('click', function(){
	var id = document.getElementById("id").value;
	if (id.length == 10){
		searchdate(id);
	} else {
		searchReservation(id);
	}
})
*/
function add_donor_information(fname, lname, blood_type, email, date){
	$.ajax({
		url: 'http://localhost:8000/donor',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			donor_fname: fname,
			donor_lname: lname,
			donor_blood_type: blood_type,
			donor_email: email,
			donor_donate_date: date
		}),
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}


function displayReservation()
{
$.ajax({
    url: 'http://localhost:8000/reservation',
    type:"GET",
    dataType: "json",
    success: function(resp) {
		$("#display").html("");
		if (resp.status  == 'OK') {
			 for (i = 0; i < resp.size; i++)
                {
                    reservation_id = resp.tasks[i].Reservation_id;
                    customer_id = resp.tasks[i].Customer_id;
                    date = resp.tasks[i].dates;
					r_status = resp.tasks[i].Reservation_status;
					p_status = resp.tasks[i].Payment_status;
					customer_reservation_time = resp.tasks[i].Customer_reservation_time;
					$("#display").append("<tr>"+
					"<td width= '150px'>"+reservation_id+"</td>"+
					"<td width= '150px'>"+customer_id+"</td>"+
					"<td width= '150px'>"+date+"</td>"+
					"<td width= '150px'>"+r_status+"</td>"+
					"<td width= '150px'>"+p_status+"</td>"+
					"<td width= '150px'>"+customer_reservation_time+"</td>"+"</tr>");
	            }
		} else
		{
			$("#display").html("");
			alert(resp.status);
		}
    },
    error: function (e) {
        		alert("danger");
   	},
		beforeSend: function (xhrObj){
			xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
		}
	}); 
		
$.ajax({
    		url: 'http://localhost:8000/customer',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#dropdown").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                        {
                            customer_id = resp.tasks[i].Customer_id;
							$("#dropdown").append("<option>" +
							customer_id + "</option>"
							);
	                    }
				} else
				{
					$("#dropdown").html("");
					alert(resp.status);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
}


function editReservation(rid, cid, date, rstatus, pstatus, rt) {
	$.ajax({
		url: 'http://localhost:8000/reservation',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Reservation_id: rid,
			Customer_id: cid,
			dates: date,
			Reservation_status: rstatus,
			Payment_status: pstatus,
			Customer_reservation_time: rt
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}

function delReservation(id) {
	$.ajax({
		url: 'http://localhost:8000/reservation/' + id,
		type: "DELETE",
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}

function searchReservation(id) {
$.ajax({
    		url: 'http://localhost:8000/reservation/'+ id,
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").remove();
				$("#display-search").append("<tr>"+
					"<td width= '150px'>"+resp.Reservation_id+"</td>"+
					"<td width= '150px'>"+resp.Customer_id+"</td>"+
					"<td width= '150px'>"+resp.Dates+"</td>"+
					"<td width= '150px'>"+resp.Reservation_status+"</td>"+
					"<td width= '150px'>"+resp.Payment_status+"</td>"+
					"<td width= '150px'>"+resp.Customer_reservation_time+"</td>"+"</tr>");
    		},
    		error: function (e) {
        		alert("Please fill in the search box.");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
}

function searchdate(id) {
	$.ajax({
				url: 'http://localhost:8000/reservation/date/'+ id,
				type:"GET",
				dataType: "json",
				success: function(resp) {
					$("#display").remove();
					$("#display-search").append("<tr>"+
						"<td width= '150px'>"+resp.Reservation_id+"</td>"+
						"<td width= '150px'>"+resp.Customer_id+"</td>"+
						"<td width= '150px'>"+resp.Dates+"</td>"+
						"<td width= '150px'>"+resp.Reservation_status+"</td>"+
						"<td width= '150px'>"+resp.Payment_status+"</td>"+
						"<td width= '150px'>"+resp.Customer_reservation_time+"</td>"+"</tr>");
				},
				error: function (e) {
					alert("Please fill in the search box.");
				   },
				   beforeSend: function (xhrObj){
					 xhrObj.setRequestHeader("Authorization",
						   "Basic " + btoa("Zaide:Zaide001"));
				  }
			}); 
	}
