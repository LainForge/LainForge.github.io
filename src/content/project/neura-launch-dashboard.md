---
title: From Code to Cloud in Minutes - Neura Launch
pubDatetime: 2023-08-24T15:22:00Z
projectSlug: launch-ml-models-like-websites
featured: true
draft: false
tags:
  - machine learning, devops
ogImage: ""
description:
  Neura Launch Is Your One-Stop Solution for Hassle-Free ML Model Deployment.
---

# Introduction

Imagine this: After spending more than 6 months alone, drinking 10 cups of coffee everyday inside of your small room, glued to your computer screen, you've birthed a ML model that can write flawless code and is wayyyyy better than GPT4. 

And now you want to earn some money from it.

But you don't know how to host/manage ML models in cloud 😞 soo...

You have two options - 

- Either you go and learn devOps and all other ML model hosting related stuff and waste another 6 months of your life.
- Or you type `neura-launch push` and get API endpoints to interact with your ML model that is magically hosted in cloud for you.

Considering you are a **sane** person, I'm sure you'd want to go with the second option. (?)

So in the rest of the article I'm going to tell you how **Neura Launch** can help you _host and manage your machine learning models_ as if they are some frontend websites!!! 

![tell me more image](/imgs/neura-launch/cat.jpeg)

## How Does It Work?

Neura Launch is a collection of bunch of different softwares services that together lets you magically host and manage your models. I don't want to scare you with their names and how they fit in together.. so I'll tell you a story.

Say you created the legendary **cats vs dogs** machine learning model that classifies an image into either of the two categories.
Your folder structure for your project would look something like this - 
```
- model.py
- test.py
- train.py
- checkpoints/
  - model_30_epochs.pth
  - model_80_epochs.pth
  - model_best.pth
```

### Step 0: Make an account on neura-launch-dashboard
The first step of the process is to create your account on the neura-launch-dashboard.
This dashboard would be your one-stop-solution for managing all of your different machine learning models. 

You can start/stop an existing service, track usage and manage resources for your models from this dashboard

### Step 1: Upload your code to cloud

Now in this step, we're gonna make use of Neura-Launch CLI tool to upload your code to the cloud machine.

So first you will have to simply open a terminal in the root directory of your project and run the following command:

```
neura-launch init
```

This will create a `inference.py` file in the root directory which would be used by our service to create an API to interact with your model while it's hosted on cloud.

The `inference.py` would contain an extension of neuralaunch.InferenceBase class and you need to override `load` and `infer` functions according to your usecase.

```
import neuralaunch
from .model import CatVsDogNN

class Inference(neuralaunch.InferenceBase):
  
  def load(**kwargs):
    # load your NN
  
  def infer(**kwargs):
    # make predictions using your NN

```

After this you have to ask *neura-launch-dashboard* to a create a token for your project. You can do so by running the following command on the terminal: 

```
neura-launch remote add <remote_project_name> 
```

This will open a neura-launch-dashboard webpage on your browser where you have to signin to your account (if you haven't already).

> Behind the scenes neura-launch cli tool will get a token from the dashboard which would be used for making any further communication between the two.

And now you're ready to push your code to the cloud!!! 🥳
Just type the following command in your terminal:
```
neura-launch push
```

With this the cli tool will create a zip of your folder and send it to the neura-launch dasboard backend service where it will verify the code using checksums and create a docker container and start it automatically.

Ofcs this will take sometime... Expected to be around 5ish minutes. But you can track the progress of this entire pipeline through neura-launch-dashboard.

Once the service is up and running you can use the dashboard to increase/decrease the  amount of resources, track usage, start or stop the service etc.

![drake meme](/imgs/neura-launch/meme.png)

-------

# Conclusions

This is an ongoing open source project under [LainForge](http://lainforge.org/) and you can track the development on [github](https://github.com/LainForge/Neura-Launch-Dashboard), [discord](https://discord.gg/UxGdN56meC) or [contact](https://bento.me/tarat) me if you have any thoughts/ideas around this or just want to say Hi. 

Thank you for reading! Enjoy the rest of your day/night ☺️





