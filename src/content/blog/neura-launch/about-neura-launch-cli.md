---
title: Neura Launch CLI tool
pubDatetime: 2023-10-11T15:22:00Z
postSlug: launch-ml-models-like-websites-cli
featured: true
draft: false
tags:
  - machine learning, devops, python, cli
ogImage: ""
description: Neura Launch CLI tool allows you to publish your machine learning models to the cloud using a single command.
category: project
projectTitle: "Neura Launch"
---

## Pre-requisites

Ok so first things first, if this is your first time here, you might want to check out the [Neura Launch](https://lainforge.org/posts/launch-ml-models-like-websites/) blog to get a better understanding of what we are trying to achieve here.

Anyways, In this devlog I will take you through the process of building a CLI tool that will allow us to publish our machine learning models to the cloud using a single command.

## Introduction

When I think of building a CLI tool, the two things that immediately come to my mind are `python` and `argparse`.
Python because of its simplicity and argparse because it is a built-in module in python that allows us to parse command line arguments.

Let me show you how easy it is to build a CLI tool using python and argparse.

```python

import argparse

parser = argparse.ArgumentParser(description='Echo hello world.')
parser.add_arguements("--name", type=str, help="Name of the person to greet")

args = parser.parse_args()

print(f"Hello {args.name}")

```

That's it. This is all the code that you need to write to build a CLI tool that will greet a person by their name.

> Only if our CLI tool was this simple.

### What do we want our CLI tool to do?

First, let's figure out the requirements. We want our CLI tool to do the following things:

- Initialize the project
- Add project token
- Push the project to the cloud

### Initialize the project

Initializing a project is simply adding a `inference.py` and `config.yaml` file to the root directory of the project. The `inference.py` file will contain the code that will be used to make predictions using the model. The `config.yaml` file will contain all the information about the project and the model that we want to publish to the cloud.

For this we will use the `init` command that will run the following code:

```python
def init_nl(args):

    project_name = input("project name: ")

    while not project_name:
        project_name = input("project name can't be empty! \nproject name: ")

    # Define the path to the template inference.py file
    inference_path = os.path.join(os.path.dirname(
        __file__), 'templates', 'inference.py')

    # Get the current working directory
    root_dir = os.getcwd()

    # Define the path where you want to copy the template file
    destination_path_inference = os.path.join(root_dir, 'inference.py')

    # Copy the template file to the current directory
    shutil.copyfile(inference_path, destination_path_inference)

    data = {
        'project_name': project_name,
        'inference_file': './inference.py'
    }

    with open('config.yaml', 'w') as yaml_file:
        yaml.dump(data, yaml_file, default_flow_style=False)

    print("initialized neura-launch project")

```

As you can see in the code above, we are simply copying the `inference.py` file from the `templates` directory (inside of the CLI) to the root directory of the project.

### Add project token

Next up, we want to add the project token. For this we will use the `add_token` command.
Here I had a long discussion with my team about two things:

- If we should hide the project token when the user is typing it in the terminal or not.
- If we should store the project token in the `config.yaml` file or in some secure database like keyring.

The first question was easy to answer. We decided to hide the project token when the user is typing it in the terminal for security reasons. To achieve this we used another python module namely `getpass` which allows us to hide the user input in the terminal.

```python
import getpass
token = getpass.getpass("enter the secret token: ")
```

And once we discussed the security concerns of storing the project token in the `config.yaml` file, we decided to use the `keyring` module to store the project token in the system's keyring.

Keyring is a python module that allows us to store passwords and other sensitive information in the system's keyring. It is a cross-platform module and works on all the major operating systems.

```python
import keyring

keyring.set_password("neura-launch", "project-token", token)
```

Let's take a step back and talk about why it was necessary for us to use keyring to store the project token.

Suppose our user is working on a project with multiple collaborators. Now if we store the project token in the `config.yaml` file, then the project token will be visible to all the collaborators. This is a security concern because anyone with the project token can push the project to the cloud.

But since we are using keyring, only the user who has the project token stored in their system's keyring can push the project to the cloud. This introduces an extra layer of security to our project.

### Push the project to the cloud

This is the last and probably the most important step. This is where we will push the project to the cloud. For this we want to leverage the `push` command.

But before we can push the project, we need to figure out - Where and How are we going to store the project code? How are we going to authenticate the user? How will our Dashboard know that the project has been pushed to the cloud? etc.

To answer all these questions, we need to understand the architecture of our project.

![architecture](/imgs/neura-launch-cli/push_arch.png)

Alright so there are a lot of new things here. Let's break it down one by one.

First of all we have to understand that we are going to use AWS to store the project code. We will use S3 buckets to store the project code.

#### Why?

Because S3 buckets are cheap and easy to use. They are also highly scalable and secure.

#### How?

We wanted to abstract the process of pushing the project from the CLI tool. So we decided to send a POST request to the Neura Launch API with the project information. The API will then push the project to the S3 bucket and update the project information on the Neura Launch Dashboard.

There's one very important thing that we need to discuss here and that is `code validation`.

How do we know that the code that the user has on their local machine is the same as the code that is stored in the S3 bucket?

To solve this problem we generate a `checksum` of the zip file before pushing the code and then send that checksum to the `/upload` api which will then store the checksum in the database.

This way our builder service can compare the checksum of the zip file that it generates with the checksum that is stored in the database. If the checksum matches, then the code is valid and the builder service can proceed with building the docker image.

#### Back to the CLI tool

Now that we have a basic understanding of the architecture of our project, let's get back to the CLI tool.

First we want to create a zip file of the project code. For this we will use the shutil module.

```python
import shutil
shutil.make_archive(token, 'zip', os.getcwd())
```

Then we want to generate the checksum of the zip file. For this we will use the hashlib module.

```python
import hashlib
sha256_hash = hashlib.sha256()
  with open(token + '.zip', "rb") as f:
      # Read and update hash string value in blocks of 4K
      for byte_block in iter(lambda: f.read(4096), b""):
          sha256_hash.update(byte_block)
checksum = sha256_hash.hexdigest()
```

Then we want to send a POST request to the `/upload` api with the project information and the checksum.

```python
import requests
files = {
        'file': (token + '.zip', open(token + '.zip', 'rb')),
        'checksum': (None, sha256_hash.hexdigest())
    }

response = requests.post(
    BACKEND_SERVER_URL, files=files)

if response.status_code == 200:
    print("Code uploaded successfully!")
else:
    print("Error uploading code!")
```

That's it. This is all the code that you need to write to push your project to the cloud.

## Conclusion

I know I haven't covered the `/upload` API in this devlog but I will cover it in the next devlog so stay tuned for that 😉.
The code for the CLI tool is available on [Github](https://github.com/LainForge/neura-launch-cli).
If you have any questions or suggestions, feel free to reach out to us on our [discord](https://discord.gg/UxGdN56meC)
