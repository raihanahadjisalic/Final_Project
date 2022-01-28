var save = document.getElementById("save");

save.addEventListener('click', function(){
	var fname = document.getElementById("donor-fname").value;
	var lname = document.getElementById("donor-lname").value;
	var btype = document.getElementById("donor-btype").value;
	var email = document.getElementById("donor-email").value;
	var date = document.getElementById("donation-date").value;
	add_donor(fname, lname, btype, email, date);
})


function add_donor(fname, lname, btype, email, date) {
	$.ajax({
		url: 'http://localhost:8000/donor',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
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


