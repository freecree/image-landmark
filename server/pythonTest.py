import sys
import os
sys.path.append('C:\Program Files (x86)\studywork\KPI\diploma\myproject\server\python_modules\Python38\site_packages')
#import datatime from datetime
from datetime import datetime
start_time = datetime.now()
print("Start...")
#import mediapipe as mp
import cv2
import time
print('myPy.n')
print(datetime.now() - start_time)
mypath = './files\\628e3c52f213273edf912e12'
dirname = os.path.dirname(__file__)
filesdir = os.path.join(dirname, 'files\\628e3c52f213273edf912e12')
print('dir:', filesdir)
#filename = os.path.join(dirname, 'relative/path/to/file/you/want')

images = [f for f in os.listdir(filesdir) if os.path.isfile(os.path.join(filesdir, f))]
#img = cv2.imread("images/image7.png")
#os.chdir(filesdir)
handpath = r'C:\Program Files (x86)\studywork\KPI\diploma\myproject\server\files\hand.jpg'

img = cv2.imread(handpath, 0)
cv2.imshow('image', img)
time.sleep(10)
# for img in images:
#     cvimg = cv2.imread(img)
#     print(cvimg)
#     cv2.imshow('image', cvimg)