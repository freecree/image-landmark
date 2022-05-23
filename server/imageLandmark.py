import sys
from unittest import result
#sys.path.append("./python_modules/Python38/site_packages")
sys.path.append('C:\Program Files (x86)\studywork\KPI\diploma\myproject\server\python_modules\Python38\site_packages')


import mediapipe as mp
import cv2
import time

img = cv2.imread("images/hand.jpg")

mpHands = mp.solutions.hands
hands = mpHands.Hands()
myResults = []

# while True:
#     imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = hands.process(imgRGB)
#     print(results.multi_hand_landmark)

#     cv2.imshow("Image", img)
#     cv2.waitKey(1)

imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
results = hands.process(imgRGB)
if results.multi_hand_landmarks:
    for handLms in results.multi_hand_landmarks:
        for id, lm in enumerate(handLms.landmark):
            myResults.append({"x": lm.x, "y": lm.y})
            #print(id, lm.x, lm.y)
#print(results.multi_hand_landmarks)
print(myResults)
sys.stdout.flush()

