try:
    import sys
    sys.path.append('C:\Program Files (x86)\studywork\KPI\diploma\myproject\server\python_modules\Python38\site_packages')
    import os
    import mediapipe as mp
    import cv2
    import time

    imagesFolder = sys.argv[1]
    images = sys.argv[2].split(',') #images' names

    dirName = os.path.dirname(__file__)
    filesDir = os.path.join(dirName, 'files\\' + imagesFolder) #files\\628e3c52f213273edf912e12

    mpHands = mp.solutions.hands
    hands = mpHands.Hands()

    myResults = []
    for imgName in images:
        # myResults.append({"image": imgName, "markings": []})
        imgPath = os.path.join(filesDir, imgName)
        image = cv2.imread(imgPath)

        imgRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(imgRGB)
        if results.multi_hand_landmarks:
            for handLms in results.multi_hand_landmarks:
                for id, lm in enumerate(handLms.landmark):
                    myResults.append({"x": lm.x, "y": lm.y})
                    # myResults[-1]['markings'].append({"x": lm.x, "y": lm.y})
                    
    print(myResults)
    sys.stderr.flush()

except Exception as exception:
    print(-1)
    #sys.stderr.write("Error")    



