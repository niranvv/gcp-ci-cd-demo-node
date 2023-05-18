# gcp-ci-cd-demo
Test Node Application to automatically build & deploy to GCP

## Build & Test locally
```
cd node-hello-world
npm install
npm start
```

## Enable APIs
```
gcloud services enable appengine.googleapis.com cloudfunctions.googleapis.com artifactregistry.googleapis.com run.googleapis.com translate.googleapis.com
```

## App Engine Deploy
```
gcloud app deploy
```

## Cloud Run Deploy
```
gcloud run deploy
```