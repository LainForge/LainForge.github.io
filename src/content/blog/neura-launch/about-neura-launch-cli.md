---
title: Neura Launch CLI tool
pubDatetime: 2023-10-11T15:22:00Z
postSlug: launch-ml-models-like-websites-cli
featured: true
draft: false
tags:
  - machine learning, devops, python, cli
ogImage: ""
description:
  Neura Launch CLI tool allows you to publish your machine learning models to the cloud using a single command.
category: project
projectTitle: "Neura Launch"
---

## Pre-requisites

Ok so first things first, if this is your first time here, you might want to check out the [Neura Launch](https://lainforge.org/posts/launch-ml-models-like-websites/) blog to get a better understanding of what we are trying to achieve here.

Anyways, In this devlog I will take you through the process of building a CLI tool that will allow us to publish our machine learning models to the cloud using a single command.

## Introduction

We've built the CLI tool using the `argparse` module of python. The tool is pretty simple to use and has a few commands that you can use to publish your models to the cloud.

![let's go](/imgs/neura-launch-cli/letsgo.jpeg)

### Commands

Here's a list of all the commands that you can use with the CLI tool:

```bash
neura-launch init
``` 
- This command will initialize the project and create a `neura-launch.yml` file in the root directory of your project. This file will contain all the information about your project and the model that you want to publish to the cloud. Along with that, it will also create a `inferece.py` file in the root directory of your project. This file will contain the code that will be used to make predictions using your model.

```bash
neura-launch add_token
```
- This command will add your project taken that you have to generate on Neura Launch Dashboard. This token will be used to authenticate your requests to the Neura Launch API.

```bash
neura-launch push
```

- This command will push your project to the cloud. It will push the code of your project so S3 bucket and update your project information on the Neura Launch Dashboard.

That's it. These are the only commands that you need to know to publish your machine learning models to the cloud.

## Conclusion

So that's it for this devlog. I hope you liked it. The code for the CLI tool is available on [Github](https://github.com/LainForge/neura-launch-cli).
If you have any questions or suggestions, feel free to reach out to us on our [discord](https://discord.gg/UxGdN56meC)



