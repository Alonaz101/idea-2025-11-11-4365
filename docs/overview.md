# Project Overview: Mood-Based Recipe Recommendation System

This repository contains the backend server, data models, and API implementations for the MVP and post-MVP phases of the Mood-based Recipe Recommendation application. Each part reflects Jira issues SCRUM-360 to SCRUM-369 specifications.

## Features Summary by Jira Issue

- **SCRUM-360: MVP Architecture and Component Interactions**
  - Express backend setup, MongoDB integration
  - API endpoint routing for moods, recipes, users

- **SCRUM-361: MVP Data Models**
  - MongoDB Mongoose schemas for User, Recipe, Mood

- **SCRUM-362: MVP API Specifications**
  - API endpoints:
    - POST `/api/mood` to submit user mood and get recipe recommendations
    - GET `/api/recipes` to fetch recipes with optional mood filtering
    - POST `/api/users` to create user profiles
    - GET `/api/users/{id}/favorites` to get user's favorite recipes
    - POST `/api/users/{id}/favorites` to add a recipe to favorites

- **SCRUM-363: MVP Security, Privacy & Compliance (planned post-MVP)**
  - HTTPS enforcement placeholder
  - Future JWT authentication
  - Compliance notes

- **SCRUM-364: MVP Performance, Scalability & Reliability**
  - Database indexing planned
  - Backend designed for scalability

- **SCRUM-365: MVP Roadmap and Implementation Considerations**
  - Components organized as per sprint roadmap

- **SCRUM-366: MVP Testing, Logging, and Monitoring Guidelines (planned)**
  - Planning for unit tests and logging

- **SCRUM-367: Post-MVP User Authentication and Enhanced Mood Input (planned)**
  - JWT and OAuth authentication planned

- **SCRUM-368: Post-MVP Favorites Management and User-Generated Mood Tags (planned)**
  - Support for user favorites and tagging enhancements

- **SCRUM-369: Post-MVP Grocery Delivery API Integration (planned)**
  - Integration with grocery delivery APIs planned

---

### Repository Structure

- `backend/models` - MongoDB schema models
- `backend/routes` - Express API route handlers
- `backend/server.js` - Express server entry point
- `docs/overview.md` - This file

### Next Steps

- Complete frontend React implementation
- Implement post-MVP features as per sprint plans
- Add tests, logging, and monitoring

Repository URL: https://github.com/Alonaz101/idea-2025-11-11-4365

---
Created with full traceability to Jira issues SCRUM-360 through SCRUM-369.
