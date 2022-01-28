var update = document.getElementById("update");

update.addEventListener('click', function(){
    var id = document.getElementById("donor-id").value;
	var fname = document.getElementById("donor-fname").value;
	var lname = document.getElementById("donor-lname").value;
	var btype = document.getElementById("donor-btype").value;
	var email = document.getElementById("donor-email").value;
	var date = document.getElementById("donation-date").value;
	edit_donor(id, fname, lname, btype, email, date);
})

function edit_donor(id, fname, lname, btype, email, date) {
	$.ajax({
		url: 'http://localhost:8000/donor',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			donor_id: id,
			donor_fname: fname,
			donor_lname: lname,
			donor_blood_type: btype,
			donor_email: email,
			donor_donate_date: date
		}),
		success: function (data) {
			alert(data.status);
		},
		error: function (e) {
			alert("Error Occured.");
		}
	});
}

function donor_ids() {
$.ajax({
    url: 'http://localhost:8000/donor',
    type:"GET",
    dataType: "json",
    success: function(resp) {
        $("#donor-id").html("");
        if (resp.status  == 'OK') {
           for (i = 0; i < resp.size; i++)
                {
                    id = resp.tasks[i].donor_id;
                    $("#donor-id").append("<option>" +
                    id + "</option>"
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
    }
}); 
}