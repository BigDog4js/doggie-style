SELECT dogs.id, dogs.name, age, breed, gender, dogs.state, dogs.description, dogs.image, dogs.posted, contacts.name as contact_name, contacts.email, contacts.phone 
FROM dogs
JOIN contacts
ON contact_id = contacts.id
order by dogs.id
;