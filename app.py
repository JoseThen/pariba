from flask import Flask, render_template, flash, request, redirect, url_for
import os
import subprocess
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = '/app/artifacts'
ALLOWED_EXTENSIONS = {'mp4', 'mkv', 'mov', }
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def hello():
  return render_template('index.html')
# https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/

@app.route('/movie', methods=['GET', 'POST'])
def upload_file():
  if request.method == 'POST':
    # check f the post request has the file part
    if 'file' not in request.files:
      return redirect(request.url)
    file = requests.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
      flash('No selected file')
      return redirect(request.url)
    if file and allowed_file(file.filename):
      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      return redirect(url_for('uploaded_file', filename=filename))
  return render_template('index.html')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'], filename)