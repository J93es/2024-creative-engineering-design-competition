# Makefile for automating deployment of frontend and backend services

# Variables
REPO_URL=https://github.com/J93es/2024-creative-engineering-design-competition.git
PROJECT_DIR=/srv/2024-CEDC/2024-CEDC
FRONTEND_DIR=$(PROJECT_DIR)/frontend
FRONTEND_V2_DIR=$(PROJECT_DIR)/frontend-v2
BACKEND_DIR=$(PROJECT_DIR)/backend
ENV_DIR=/srv/2024-CEDC/env

.PHONY: all update build-frontend build-frontend-v2 build-backend deploy deploy-frontend deploy-frontend-v2 deploy-backend restart-nginx start-pm2 stop-pm2

update:
	if [ ! -d "$(PROJECT_DIR)" ]; then \
		sudo git clone $(REPO_URL) $(PROJECT_DIR); \
	else \
		cd $(PROJECT_DIR) && sudo git pull; \
	fi

build-frontend:
	sudo cp $(ENV_DIR)/frontend $(FRONTEND_DIR)/.env && cd $(FRONTEND_DIR) && sudo npm install && sudo npm run build

build-frontend-v2:
	sudo cp $(ENV_DIR)/frontend-v2 $(FRONTEND_V2_DIR)/.env && cd $(FRONTEND_V2_DIR) && sudo npm install && sudo npm run build

build-backend:
	sudo cp $(ENV_DIR)/backend $(BACKEND_DIR)/.env && cd $(BACKEND_DIR) && sudo npm install && sudo npm run build

stop-pm2:
	sudo pm2 stop 2024-CEDC-backend || true && sudo pm2 delete 2024-CEDC-backend || true

start-pm2:
	cd $(BACKEND_DIR) && sudo pm2 start npm --name 2024-CEDC-backend -- run start

save-pm2:
	sudo pm2 save

restart-nginx:
	sudo systemctl reload nginx

deploy-frontend:update build-frontend restart-nginx
	@echo "Frontend deployment completed."

deploy-frontend-v2:update build-frontend-v2 restart-nginx
	@echo "Frontend v2 deployment completed."

deploy-backend:update build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Backend deployment completed."

deploy: update build-frontend-v2 build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Deployment completed."