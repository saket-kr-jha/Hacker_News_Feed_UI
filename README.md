# Hacker News UI

This is the front-end application for the Hacker News feed, built using Angular. It fetches and displays the top 200 news stories from the Hacker News API.

## Features
- 📰 Display top 200 news stories with titles and links
- 🔍 Search functionality to find specific stories
- 📄 Pagination for improved readability
- ⏳ Loader while fetching data
- ✅ Unit tests for core functionalities

## Tech Stack
- **Framework**: Angular
- **Language**: TypeScript
- **UI Library**: Bootstrap
- **Testing**: Jasmine & Karma

## Installation
### Prerequisites
- Node.js (LTS) installed
- Angular CLI installed (`npm install -g @angular/cli`)

## Running Unit Tests
ng test --no-watch --code-coverage

### Steps to Run the Project
```sh
# Clone the repository
git clone https://github.com/saket-kr-jha/Hacker_News_Feed_UI.git
cd hacker-news-ui

# Install dependencies
npm install

# Run the application
ng serve

# Open in browser
http://localhost:4200
