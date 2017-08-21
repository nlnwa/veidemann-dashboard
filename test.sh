for ((i=1; i<10000;i++)); 
do
echo $i
curl -X POST -H "Content-Type: application/json" -d '{ "entity_id": "8df92223-fa3b-4845-9695-597a6a086f70","scope": { "surt_prefix": "" },"job_id": [ "de8f9bf1-24d7-45a6-a501-484c6c64102a" ],"meta": { "name": "http://seed'${i}'.foo","description": "jauda"} }' "http://localhost:3010/api/seeds" 
done
