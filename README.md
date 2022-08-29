# Bluepot
> My goal was to create a webpage for posting league of legends (a video game) clips

> Check out the live frontend [_here_](https://blue-pot.herokuapp.com/). -->

## Table of Contents
* [General Info](#general-information)
* [GitHub Repo](#github-repos)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)

## General Information
This project, part of Flatiron Software Engineering track, Phase 3, focused on developing a backend server with API access.  We worked as a team of three to develop both the frontend and backend servers in one week.

## GitHub Repo
- [github](https://github.com/hkassow/bluepot)


## Technologies Used
### Backend Server
- Ruby ~> version 2.7.4
- Rails ~> version 7.0.3
- Bycrypt ~> version 3.1.7
- Active Storage ~> version 7.0
- Postgresql ~> version 12.11
- Google cloud

### Frontend Server
- React ^18.2.0
- React-Router-Dom ^6.3
- React-Player ^2.10
- Semantic-UI ^2.4.1

## Features
### Backend MAIN API Endpoints
| Method | Endpoint | Params | Description |
| --- |----- | ------ | ------|
| GET | /me |  | returns current session user 
| POST | /login |  | creates a new session for an existing user
| DELETE | /logout|  | logs the current user out
| GET | /other |  | returns user associated with username
|  | | username | 
| POST | /signup |  | creates a new user
|  | |username | 
|  | |password | encrypted in the backend
| DELETE | /users/:id |  | deletes the user
| GET | /posts |  | returs all posts
| GET | /posts/:id |  | returns a specific post
| GET | /show_top |  | returns the top three rated posts
| POST |  /posts |  | creates a new post
|  | |title | post title
|  | |video | video file stored by active storage
|  | |user_id | user associated with the post
|  | |description | post description
| PATCH | /posts/:id |  | updates a post
|  | |title | post title
|  | |video | video file stored by active storage
|  | |user_id | user associated with the post
|  | |description | post description
| DELETE | /posts/:id |  | deletes the post
| GET | /comments/:id |  | returs specific comment
| POST |  /comments |  | creates a new comment
|  | |text | comment text
|  | |user_id | user associated with the post
|  | |post_id | post associated with the post
| PATCH | /comments/:id |  | updates a comments text
|  | |text | comment text
| DELETE | /comments/:id |  | deletes the post
| POST | /follow |  | user follows another user to see their posts
|  | |follower_id | id of user following another user
|  | |followee_id | id of user being followed
| DELETE | /follow |  | user unfollows
|  | |follower_id | id of user following another user
|  | |followee_id | id of user being followed

## Setup
Take the following steps to set up the servers in a development environment
- Fork the project into your local machine [repo](https://github.com/hkassow/bluepot)
- Ensure postgres is insalled locally 
### Backend
- `bundle install`
- `rails db:create`
- `rails db:migrate`
- `sudo service postgresql start`
- `rails s`
- Backend server will now be running on [http://localhost:3000](http://localhost:3000)

### Frontend
- `npm install --prefix client`
- `npm start -- prefix client`
- Frontend server will now be running on [http://localhost:4000/](http://localhost:4000/)


## Usage

1. Login and create an account by clicking the [user] icon (top right)
2. Customize your permanent tags on the homepage
3. View posts to follow users, and comment on/rate posts
4. Navigate to user pages by clicking on [posted by: user]  
5. View your user comment and post history by clicking the [user]icon


## Project Status
- Project is: _completed_.

