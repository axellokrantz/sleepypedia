# Sleepypedia: The Night-time Encyclopedia
Sleepypedia is a unique application that helps you drift off to dreamland while exploring random Wikipedia articles. From the classification of different types of grass to the history of thimble collecting, Sleepypedia offers a soothing way to bore you asleep.

## Features
- Random Wikipedia Exploration: Discover obscure topics you never knew existed, perfect for lulling your mind into a peaceful slumber.
- Soothing Text-to-Speech: Amazon Polly transforms Wikipedia articles into gentle bedtime stories.
- Customizable Experience: Adjust voice, speed, and volume to find your ideal narration.
- Toggle ambient sounds for an extra layer of relaxation.
- Article Management: Curate your own playlist of subjects.
- User-Friendly Interface: Navigate with ease, even in your sleepiest state.

## How It Works

1. **Fetch**: Retrieve random Wikipedia articles at the touch of a button.
2. **Listen**: Let Amazon Polly's soothing voices narrate you into unconsciousness.
3. **Customize**: Adjust voice, speed, and volume to find your ideal sleep-inducing narration.
4. **Sleep**: Drift off to sleep, possibly dreaming about obscure historical facts or rare species of ferns.

## Tech Stack
### Frontend

React, TypeScript, Tailwind & DaisyUI, Vite

### Backend

C# .NET, SQLite, Amazon Polly SDK, Entity Framework Core

## Prerequisites

Node.js (v14 or later)
.NET 6.0 SDK or later
AWS account with Amazon Polly access

## Installation

Clone the repository:
```
git clone https://github.com/yourusername/sleepypedia.git
cd sleepypedia
```
Set up the backend:
```
cd sleepypedia-backend
dotnet restore
dotnet run
```
Set up the frontend:
```
cd sleepypedia-frontend
npm i
npm run dev
```
## Configuration

Set up your AWS credentials for Amazon Polly access.
Update the API endpoint in the frontend code if necessary.

