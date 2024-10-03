# Makefile for automating deployment of frontend and backend services

# Variables
REPO_URL=https://github.com/J93es/2024-creative-engineering-design-competition.git
PROJECT_DIR=/srv/2024-CEDC/2024-CEDC
FRONTEND_DIR=$(PROJECT_DIR)/frontend
BACKEND_DIR=$(PROJECT_DIR)/backend
ENV_DIR=/srv/2024-CEDC/env

# Targets
.PHONY: all update build-frontend build-backend deploy deploy-frontend deploy-backend restart-nginx start-pm2 stop-pm2

# 1. Clone or update the repository
update:
	if [ ! -d "$(PROJECT_DIR)" ]; then \
		sudo git clone $(REPO_URL) $(PROJECT_DIR); \
	else \
		cd $(PROJECT_DIR) && sudo git pull; \
		fi

# 2. Install dependencies and build frontend
build-frontend:
	sudo cp $(ENV_DIR)/frontend $(FRONTEND_DIR)/.env && cd $(FRONTEND_DIR) && sudo npm install && sudo npm run build

# 3. Install dependencies for backend and start with PM2
build-backend:
	sudo cp $(ENV_DIR)/backend $(BACKEND_DIR)/.env && cd $(BACKEND_DIR) && sudo npm install && sudo npm run build

# 4. Stop and restart backend service with PM2
stop-pm2:
	sudo pm2 stop 2024-CEDC-backend || true && sudo pm2 delete 2024-CEDC-backend || true

start-pm2:
	cd $(BACKEND_DIR) && sudo pm2 start npm --name 2024-CEDC-backend -- run start

save-pm2:
	sudo pm2 save

# 5. Reload Nginx to apply new configuration
restart-nginx:
	sudo systemctl reload nginx

deploy-frontend:update build-frontend restart-nginx
	@echo "Frontend deployment completed."

deploy-backend:update build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Backend deployment completed."

# 6. Full deployment: Update, build, and restart services
deploy: update build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Deployment completed."