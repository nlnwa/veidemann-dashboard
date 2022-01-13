# Veidemann Dashboard

Veidemann Dashboard is a web-based UI for [veidemann](https://github.com/nlnwa/veidemann-harvester).

### Getting started with veidemann

```
# start minikube
$ minikube start --vm-driver kvm2 --memory 8096 --cpus 2

# fetch veidemann helm charts
$ git clone https://github.com/nlnwa/charts.git

# enter minikube directory
$ cd charts/minikube

# add entry to /etc/hosts mapping veidemann.local to minikube ip  (you will be prompted for a password)
$ ./hosts.sh 

# install veidemann (5-10 min)
$ ./install.sh

# watch installation unfold (in another terminal window/tab)
$ watch -d kubectl get pod

# open dashboard at https://veidemann.local/veidemann
```

### Local development setup


```
# clone
$ git clone https://github.com/nlnwa/veidemann-dashboard.git

# install dependencies
$ yarn

# run tests
ng test

# start development server
$ yarn start \
--ssl \
--ssl-cert 'path/to/veidemann-deploy/dev/bases/certs/veidemann-local_cert.pem' \
--ssl-key 'path/to/veidemann-deploy/dev/bases/certs/veidemann-local_key.pem'

# import 'path/to/veidemann-deploy/dev/bases/certs/veidemann-local_key.pem' to your browser of choice and visit https://localhost:4200/veidemann
```
  
## License

[Apache License 2.0](https://github.com/nlnwa/veidemann-dashboard/blob/master/LICENSE)
