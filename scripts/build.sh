#!/bin/bash

# Set the external IP address as an environment variable
export EXTERNAL_IP_ADDRESS=35.228.141.206

# Set the API_URL and CLIENT_URL environment variables
export API_URL=http://$EXTERNAL_IP_ADDRESS:8000
export CLIENT_URL=http://$EXTERNAL_IP_ADDRESS:3000

# Run docker-compose up
sudo docker-compose up -d
