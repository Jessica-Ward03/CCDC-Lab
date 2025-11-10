from __future__ import print_function

import threading

from flask import Flask, render_template, redirect, url_for
import itertools
import os.path
import time
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from tabulate import tabulate
from googleapiclient.http import MediaIoBaseDownload
import io

#Permissions reads all files can only write to files it creates
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
app = Flask(__name__)

def getGoogleDrive():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('drive', 'v3', credentials=creds)
    return service


#Outputs the files in the folder
def getFolder():
    #Goes to folder CCDCLabInjects
    folder_id = '1Tn5I5gEcYWZQNGN1R_geOsJkj3vdPvL-'
    query = f"'{folder_id}' in parents and trashed = false"

    results = service.files().list(
        q=query,
        fields="files(id, name, mimeType)",
        pageSize=5
    ).execute()

    items = results.get('files', [])

    if not items:
        print("No files found in this folder.")
    else:
        print("Files inside folder:")
        for item in items:
            print(f"{item['name']}  (ID: {item['id']})")


def StartTimer():
    def runTimer():
        start = time.time()
        last_minute = -1
        while True:
            elapsed = time.time() - start
            minute = int(elapsed // 60)
            second = int(elapsed % 60)
            if minute != last_minute & minute != 0:
                print(f"{minute} minutes")
                last_minute = minute

    #How the timer runs in the background
    thread = threading.Thread(target=runTimer, daemon=True)
    thread.start()
    return "Timer Started"


@app.route('/')
def index():
    return render_template('Welcome.html')

@app.route('/startTimer')
def start_timer():
    result = StartTimer()

    return redirect('/Injects')

app = Flask(__name__)
start_time = None

@app.route('/')
def index():
    return render_template('Injects.html', start_time=start_time)

@app.route('/start')
def start_timer():
    global start_time
    start_time = time.time()
    return redirect(url_for('Injects'))


@app.route('/Injects')
def next_page():
    return "<h1>Timer Started!</h1><p>Check your console for updates.</p>"

if __name__ == '__main__':
    app.run(debug=True)




    ##cookies keep timer local time
    ##timer not showing
    ##
