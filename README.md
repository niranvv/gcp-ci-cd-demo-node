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
# Demo instructions(DRAFT)

```Shell
gcloud config set project ??
export PROJECT_ID=$(gcloud config get-value project)
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export REGION=us-central1
gcloud config set compute/region $REGION
```
- Create repo in Cloud Source Repositories
- Clone it
- Add gitignore
    ` npm init `
- replace package.js
- create app.js
- NPM install & check
    ```Shell 
    npm install
    node app.js
    ```
- Git commit & push
    ```Shell
    git add .
    git commit -m "Initial commit"
    git push
    ```
- Add Dockerfile & .dockerignore
- Add artifact Registry >> "registry-docker-hello"
- Authenticate Docker
    ```Shell
    gcloud auth configure-docker us-central1-docker.pkg.dev 
    ```
- Docker Build & Push
    ```Shell 
    docker build -t us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:test .
    docker push us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:test
    ```
- Add cloudbuild-cd-cloudrun.yaml
    ```YAML
    steps:
    # Build the container image
    - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:$REVISION_ID', '.']
    #  dir: 'node-hello-world'
    # Push the container image to Container Registry
    - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:$REVISION_ID']
    # Deploy container image to Cloud Run
    - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args: ['run', 'deploy', 'node-hello-world', 
            '--image', 'us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:$REVISION_ID', 
            '--region', 'us-central1',
            "--allow-unauthenticated"
            ]
    images: ['us-central1-docker.pkg.dev/$PROJECT_ID/registry-docker-hello/gcp-ci-cd-demo:$REVISION_ID']
    ```
- Add Cloud Build Trigger
- Add app.yaml with "runtime: nodejs18"
- Add cloudbuild-cd-appengine.yaml
    ```YAML
    steps:
    - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'bash'
    #  dir: 'node-hello-world'
    args: ['-c', 'gcloud config set app/cloud_build_timeout 1600 && gcloud app deploy']
    timeout: '1600s'
    ```
