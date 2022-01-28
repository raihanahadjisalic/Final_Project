var del = document.getElementById("delete");
var search = document.getElementById("search");

del.addEventListener('click', function(){
	var id = document.getElementById("id-delete").value;
	delete_donor(id);
})

search.addEventListener('click', function(){
	var id = document.getElementById("id").value;
	search_donor_information(id);	
})

function list_of_donors()
{
$.ajax({
    url: 'http://localhost:8000/donor',
    type:"GET",
    dataType: "json",
    success: function(resp) {
		if (resp.status  == 'OK') {
			 for (i = 0; i < resp.size; i++)
                {
                    id = resp.tasks[i].donor_id;
                    fname = resp.tasks[i].donor_fname;
                    lname = resp.tasks[i].donor_lname;
					blood_type = resp.tasks[i].donor_blood_type;
					email = resp.tasks[i].donor_email;
					date = resp.tasks[i].donor_donate_date;
					$("#display").append("<tr>"+
					"<td width='50'>"+id+"</td>"+
					"<td width='130'>"+fname+"</td>"+
					"<td width='130'>"+lname+"</td>"+
					"<td width='130'>"+blood_type+"</td>"+
					"<td width='120'>"+email+"</td>"+
					"<td width='130'>"+date+"</td>"+
					"<td width='160'>"+
					"<a href='edit.html' class='btn btn-secondary btn-sm'>"+"edit"+"</a>"+
					"</td>"+"</tr>");
	            }
		} else
		{
			$("#display").html("");
			alert(resp.status);
		}
    },
    error: function (e) {
        		alert("danger");
   	}
	}); 
}

function delete_donor(id) {
	$.ajax({
		url: 'http://localhost:8000/donor/' + id,
		type: "DELETE",
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function search_donor_information(id) {
    $.ajax({
        url: 'http://localhost:8000/donor/'+ id,
        type:"GET",
        dataType: "json",
        success: function(resp) {
            $("#display").remove();
            $("#display2").append("<tr>"+
				"<td width='50'>"+resp.donor_id+"</td>"+
				"<td width='130'>"+resp.donor_fname+"</td>"+
				"<td width='130'>"+resp.donor_lname+"</td>"+
				"<td width='130'>"+resp.donor_blood_type+"</td>"+
				"<td width='120'>"+resp.donor_email+"</td>"+
				"<td width='130'>"+resp.donor_donation_date+"</td>"+
				"<td width='160'>"+
				"<a href='edit.html' class='btn btn-secondary btn-sm'>"+"edit"+"</a>"+
				"</td>"+"</tr>");
        },
        error: function (e) {
            alert("error");
        }
    }); 
}
    