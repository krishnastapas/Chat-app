from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai
import os
import sys
import messages
from googletrans import Translator,LANGUAGES
try:
  openai.api_key ="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"


except KeyError:
  sys.stderr.write("""
  You haven't set up your API key yet.
  
  If you don't have an API key yet, visit:
  
  https://platform.openai.com/signup

  1. Make an account or sign in
  2. Click "View API Keys" from the top right menu.
  3. Click "Create new secret key"

  Then, open the Secrets Tool and add OPENAI_API_KEY as a secret.
  """)
  exit(1)

# response = openai.ChatCompletion.create(
#   model="gpt-3.5-turbo",
#   messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": "Who won the world series in 2020?"},
#         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
#         {"role": "user", "content": "Where was it played?"}
#     ]
# )

# print(response)


app = Flask(__name__)
cors = CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})



@app.route('/')
def index():
  # response = openai.ChatCompletion.create(
  # model="gpt-3.5-turbo",
  # messages=[
  #     {"role": "system", "content": "You are a helpful assistant."},
  #     {"role": "user", "content": "Who won the world series in 2020?"},
  #     {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
  #     {"role": "user", "content": "Where was it played?"}
  #  ]
  # )
  # print(response)
  # return(response.choices[0].message["content"])
  return "Welcome to devdasz api powered by chatGPT"


@app.route('/infer-review', methods=['POST'])
def getSummaryFromReview():
  # messages=[
  #     {"role": "system", "content": "You are a helpful assistant."},
  #  ]
  response = jsonify(role="assistant", content='Why did the chicken cross the road')
  # Enable Access-Control-Allow-Origin
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response
  # return {'role': 'assistant', 'content': 'Why did the chicken cross the road'}



@app.route('/chatbot', methods=['POST'])
def getChatReply():

  # messages.append(request.json);
  # print(messages)
  print(request.json)
  # messageArray=messages.friendly_bot+request.json
  messageArray=request.json

  print(messageArray)


  response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=messageArray
  )



  print(response)
 


  content = response.choices[0].message["content"]
  response = jsonify(role="assistant",
                     content= content)
  # messages.append({'role':'assistant', 'content':content});
  # print(messages);
  # Enable Access-Control-Allow-Origin
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response
  # return {'role': 'assistant', 'content': 'Why did the chicken cross the road'}

app.secret_key="sldfnaskldflksfkljsl"
@app.route('/text-translate',methods=['POST'])
def translateText():
 req=request.json
 print(req)
 text=req['text']
 language=req['language']
 print(text)
 print(language)
 trans = Translator()
 translation = trans.translate(text, dest=language)
 print(translation)
 response = jsonify(translation.text)
 response.headers.add("Access-Control-Allow-Origin", "*")
 return response
 


@app.route('/post_json', methods=['POST'])

def process_json():
  content_type = request.headers.get('Content-Type')
  if (content_type == 'application/json'):
    json = request.json
    return json
  else:
    return 'Content-Type not supported!'


app.run(host='0.0.0.0', port=81)