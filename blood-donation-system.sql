CREATE TABLE IF NOT EXISTS donor_details (
    donor_id serial8 primary key,
    donor_fname character varying(100),
    donor_lname character varying(100),
    donor_blood_type character varying(100),
    donor_email character varying(100),
    donor_donate_date date
);

CREATE TABLE IF NOT EXISTS userpass (
	username text primary key,
	password text
);

CREATE OR REPLACE FUNCTION encode_donor_information(par_donor_fname character varying(100), 
													par_donor_lname character varying(100), 
													par_donor_blood_type character varying(100),
													par_donor_email character varying(100),
													par_donor_donate_date date) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  loc_res text;
BEGIN
   
   INSERT INTO donor_details(donor_fname, donor_lname, donor_blood_type, donor_email, donor_donate_date)
		VALUES (par_donor_fname, par_donor_lname, par_donor_blood_type, par_donor_email, par_donor_donate_date);
   return json_build_object(
	      'status', 'Thank you'
   );
END;
$$;

CREATE OR REPLACE FUNCTION edit_donor_information(par_donor_id bigint,
												  par_donor_fname character varying(100), 
												  par_donor_lname character varying(100), 
												  par_donor_blood_type character varying(100),
												  par_donor_email character varying(100),
												  par_donor_donate_date date) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  loc_res text;
BEGIN
   
   UPDATE donor_details SET donor_fname = par_donor_fname,
						    donor_lname = par_donor_lname,
						    donor_blood_type = par_donor_blood_type,
						    donor_email = par_donor_email,
						    donor_donate_date = par_donor_donate_date
   WHERE donor_id = par_donor_id;
   return json_build_object(
		'status', 'Donor information update'
	);
END;
$$;

CREATE OR REPLACE FUNCTION delete_donor_information(par_donor_id bigint) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  loc_id text;
  loc_res text;
BEGIN
   SELECT INTO loc_id donor_id from donor_details where donor_id = par_donor_id;
   
   IF loc_id ISNULL THEN
   		loc_res = 'ID DOES NOT EXISTS';
   ELSE
		DELETE FROM donor_details
		WHERE donor_id = par_donor_id;  
		loc_res = 'Donor information deleted successfully';
	END IF;
    return json_build_object(
	      'status', loc_res
	 );
END;
$$;

CREATE OR REPLACE FUNCTION search_donor_information(par_donor_id bigint) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  loc_rec record;
BEGIN
   SELECT INTO loc_rec * from donor_details where donor_id = par_donor_id;
   
   return json_build_object(
	    'donor_id', loc_rec.donor_id,
		'donor_fname', loc_rec.donor_fname,
	    'donor_lname', loc_rec.donor_lname,
	    'donor_blood_type', loc_rec.donor_blood_type,
	    'donor_email', loc_rec.donor_email,
	    'donor_donate_date', loc_rec.donor_donate_date
	);
END;
$$;

CREATE OR REPLACE FUNCTION list_of_donors() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  loc_rec record;
  loc_tasks_json json[];
  loc_size int default 0;
BEGIN
   FOR loc_rec IN SELECT donor_id, donor_fname, donor_lname, donor_blood_type, donor_email, donor_donate_date from donor_details loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'donor_id', loc_rec.donor_id,
							'donor_fname', loc_rec.donor_fname,
							'donor_lname', loc_rec.donor_lname,
							'donor_blood_type', loc_rec.donor_blood_type,
							'donor_email', loc_rec.donor_email,
							'donor_donate_date', loc_rec.donor_donate_date
						 );
		loc_size = loc_size + 1;
	END LOOP; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
END;
$$;