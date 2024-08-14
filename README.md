# Serene

Serene is an app made with Expo in React Native. Its goal is to analyze if the user has anxiety or not. 

This app use _SPA Architeture_:
![spa-architeture](https://miro.medium.com/v2/resize:fit:1200/1*UDNTLsNbqVYI284ea3VjDA.png)

The app interacts with Serene's API, which is built using Symfony. To power the app's intelligent features, I integrated AI models from Hugging Face. The app employs various AI tasks to achieve its objectives, including:
- Text Generation
- Question Answering

I used the following AI's:
- mistralai/Mistral-7B-Instruct-v0.1
- deepset/roberta-base-squad2

The user answers a 5 questions random generated form and with this form the AI will return a response of the dianostics, (the AI answer based on the questions) and 0 or 1. 0 if the user has not anxiety 1, and if user has anxiety. With this "boolean" I can render  in the screen "You have anxiety" or "You don't have anxiety".

This project has no intention to replace or provocate specialized professionals, actually it is just a "extraction" of the power of AI.

Thanks. 😁
