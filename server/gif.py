# @format
"""
Handles GIF making
"""
from flask import Blueprint, request, jsonify
import ssl
from urllib.request import urlretrieve
from PIL import Image
import tempfile
import base64
import shutil

# prevent any ssl issues
ssl._create_default_https_context = ssl._create_unverified_context

Gif = Blueprint('gif', __name__)

def make_frames(images, dirpath):
  # An array of Image objects is returned. 

  # make an empty array of frames:
  frames = []
  # loop through array of urls:
  for i in range(len(images)):
    # get the filename and extension from url
    file_name = images[i][:4]

    # create image filename
    original_image = dirpath + '/' + file_name

    # download image to temp_image location
    urlretrieve(images[i], original_image)
    
    # make image object 
    img = Image.open(original_image)
    
    # resize the image to 300x300 px
    img = img.resize((300, 300), Image.ANTIALIAS)

    # append to array of frames. 
    frames.append(img)
  return frames



@Gif.route("/", methods=["POST"])
def make_gif():
  req_data = request.get_json()
  url = req_data['url']

  # create temporary directory and gif
  dirpath = tempfile.mkdtemp()
  gif_created =  'gif_created.gif'
  frames = make_frames(url, dirpath)

  # we can use Pillow to make a GIF 
  # used code from here: https://stackoverflow.com/questions/753190/programmatically-generate-video-or-animated-gif-in-python
  frames[0].save(gif_created, save_all = True, append_images=frames[1:], duration=500, loop=0)
  prefix = f'data:image/png;base64,'
  with open(gif_created, 'rb') as imageFile:
    url = base64.b64encode(imageFile.read()).decode('utf-8')
    url = prefix + url
  # remove the temp directory / files
  shutil.rmtree(dirpath)

  # return the uploaded gif url back to client
  return jsonify({'gif' : url})
