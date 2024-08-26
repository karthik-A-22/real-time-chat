# Real-Time Chat Application

## Overview

This is a real-time chat application that supports user authentication, instant messaging, message history retrieval, and group chat functionality. The application uses WebSocket (Socket.IO) for real-time communication and JWT for authentication.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
   - [User Authentication](#user-authentication)
   - [Messaging](#messaging)
   - [Group Chat](#group-chat)
3. [WebSocket Events](#websocket-events)
4. [Setup and Deployment](#setup-and-deployment)

## Getting Started

To get started with the application:

1. Clone the repository:
    ```bash
    git clone https://github.com/karthik-A-22/real-time-chat.git
    cd real-time-chat
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables, including `JWT_SECRET`, `MONGO_URI`, and `PORT`.

4. Start the application:
    ```bash
    npm start
    ```

## API Endpoints  