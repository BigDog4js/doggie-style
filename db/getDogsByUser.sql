SELECT dogs.id, dogs.name, age, breed, gender, dogs.state, dogs.description, dogs.image, dogs.posted, contacts.name as contact_name, contacts.email, contacts.phone 
FROM dogs
JOIN contacts
ON dogs.contact_id = contacts.id
WHERE dogs.user_id = $1
order by dogs.id
;