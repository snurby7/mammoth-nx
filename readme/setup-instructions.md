# Application set up Guide

To get the application up and run, below are a few steps you will need to do in order to have it run.
This project uses neo4j for the database and NestJS for the API.

## Setup neo4j

<p align="center">
  <a href="http://neo4j.com/" target="blank"><img src="https://dist.neo4j.com/wp-content/uploads/neo4j_logo-325x150.png" width="320" alt="Nest Logo" /></a>
</p>

neo4j, like I mentioned before is being used for long term data storage and currently is just being hosted off my laptop.
It could easily be put into a docker container or wherever, it's up to you to decide that.

I recommend installing [Neo4j Desktop](https://neo4j.com/download/)

Steps:

1. Launch Neo4j Desktop
2. Create a new project
   1. I called mine "Mammoth" with Neo4j v4.x
3. Add a new Graph (I again called mine Mammoth) with password "mammoth"
   1. You can change the password to whatever you want just update `neo4j.module.ts` in the api folder
4. That's really all you need to do to setup Neo4j simple and easy.
5. One quick gotcha is to make sure you click **"Start"** on your graph or else the API has nothing to talk to.

## Setup NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


NestJS will actually be set up for you after you run `npm install` however, NestJS
also has a very good [CLI](https://docs.nestjs.com/cli/overview)

```bash
-> npm i -g @nestjs/cli
```

## Angular Setup

<p align="center">
  <a href="http://angular.io/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="250" alt="Nest Logo" /></a>
</p>

Angular will also be set up for you by default, nothing needs to be done there. Angular
also ships with a [CLI](https://cli.angular.io)
