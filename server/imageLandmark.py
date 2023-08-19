try:
    import sys
    import traceback
    #!!!toChange on deployment
#    sys.path.append('C:/Program Files (x86)/studywork/KPI/diploma/myproject/server/python_modules/Python38/site_packages')
    import os
    import mediapipe as mp
    import cv2
    import time
    import json

    files = sys.argv[1]
    files = json.loads(files)
    dirName = os.path.dirname(__file__)
    filesDir = os.path.join(dirName, 'files') 

    mpHands = mp.solutions.hands
    hands = mpHands.Hands()

    myResults = [[] for _ in range(len(files))]
    for idx, file in enumerate(files):
        imgPath = os.path.join(filesDir, file['path'], file['name'])
        image = cv2.imread(imgPath)

        imgRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(imgRGB)
        if results.multi_hand_landmarks:
            for handLms in results.multi_hand_landmarks:
                for id, lm in enumerate(handLms.landmark):
                    myResults[idx].append({"x": lm.x, "y": lm.y})

    print(myResults)

except Exception as e:
    #custexc: uses to handle only custom exceptions (not change!)
    sys.stderr.write("custexc: "+traceback.format_exc())
