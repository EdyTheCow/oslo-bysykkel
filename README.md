<br />
<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/BeefBytes/Assets/master/Other/oslo_bysykkel.svg">
</p>

# 📚 About
VueJs application displaying city bicycle stations and status. The data is fetched from: https://oslobysykkel.no/apne-data/sanntid

Live version can be found at: https://bysykkel.edy.io

Application is built using:
- VueJs 3
- TailwindCSS (UnoCSS)
- Axios


# 🏗️ Deployment
Instructions for deploying the application. Pick one of the three alternatives:

- Building locally
- Deploying using Docker Compose (dev and prod)
- Deploying to Netlify

## Building locally
<b>Clone repository</b><br />
```
git clone https://github.com/EdyTheCow/oslo-bysykkel.git
```
<b>Launch dev preview</b><br />
```
npm install -g pnpm && npm run dev
```
<b>Access the application</b><br />
Navigate to `localhost:3333` in your browser to access the preview

## Deploying using Docker Compose
- The prod enviroment uses Traefik as reverse proxy to provide certificates and Nginx as web server
- The dev enviroment launches into dev preview for rapid developement

<b>Clone repository</b><br />
```
git clone https://github.com/EdyTheCow/oslo-bysykkel.git
```

### Dev enviroment
<b>Launch dev preview container</b><br />
```
docker compose -f docker-compose-dev.yml up
```
<b>Access the application</b><br />
Navigate to `localhost:3333` in your browser to access the preview

If container is launched on a external server, SSH tunnel can be used to access the dev preview. Easiest way to do this is to set network to host so you're accessing host locally rather than container. That way you don't have to worry about container changing IP.

### Prod enviroment
Production enviroment uses docker image built on top of Nginx using Github Actions. Whenever there's a change in the repository, a new updated image is built. Watchtower can be used to automate the fetching of new docker images in prod enviroment to automatically push updates. The image can be found in the repository at `Dockerfile`. Alternatively the application could be also run from any enviroment using `ghcr.io/edythecow/oslo-bysykkel:master` image, which includes built and ready to deploy app.

Traefik reverse proxy will automatically generated the certificates using Let's Encrypt. Additional certificate resolvers can be added, such as Cloudflare by following Traefik docs: https://doc.traefik.io/traefik/https/acme/#providers

<b>Change enviroment variables</b><br />
Navigate to `prod-env/compose/.env` file and change the domain variable. Available variables:
| Variable | Example | Description |
|-|:-:|-|
| COMPOSE_PROJECT_NAME | prod_oslo-bysykkel | Docker compose container prefix |
| DATA_DIR | ../data | Location where data is stored |
| DOMAIN | example.com | Domain to access the application |
| CF_API_EMAIL | - | Cloudflare email (only used if CF is cert resolver) |
| CF_API_KEY | -| Cloudflare global API key (only used if CF is cert resolver) |

<b>Set correct acme.json permissions</b><br />
Navigate to `prod-env/data/traefik` and run:
```
sudo chmod 600 acme.json
```
This file will store the generated certificates.

<b>Launch prod enviroment</b><br />
Navigate to `prod-env/compose` and run:
```
docker compose up
```

<b>Access the application</b><br />
Navigate to the `DOMAIN` in your browser you have set earlier

## Deploying to Netlify
- Fork the repository
- Navigate to https://www.netlify.com
- Add new site, select the repository via GitHub account
- Deploy, `netlify.toml` is included so no further configuration is required
