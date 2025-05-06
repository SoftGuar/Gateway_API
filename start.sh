#!/bin/bash

# Color codes for output messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting development environment...${NC}"

# Configure git to ignore file permission changes
echo -e "${GREEN}Configuring git to ignore permission changes...${NC}"
git config core.fileMode false

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${GREEN}Current branch: ${CURRENT_BRANCH}${NC}"

# Pull latest changes
echo -e "${GREEN}Pulling latest changes from ${CURRENT_BRANCH}...${NC}"
if ! git pull origin $CURRENT_BRANCH; then
    echo -e "${RED}Failed to pull latest changes.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
if ! npm install; then
    echo -e "${RED}Failed to install dependencies.${NC}"
    exit 1
fi

# Start development server
echo -e "${GREEN}Starting development server...${NC}"
npm run dev