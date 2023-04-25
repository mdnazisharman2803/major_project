import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import re
from sklearn.feature_extraction.text import CountVectorizer
import pytesseract
from PIL import Image
import numpy as np
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework import viewsets, status


stemmer = PorterStemmer()
nltk.download('stopwords')
filename = 'media/finalized_model.sav'


class ImageView(viewsets.ViewSet):

    def create(self, request: HttpRequest) -> Response:
        try:

            image = request.data.get("image")
            if not image:
                return Response(
                    {"message": "Image not found ", "success": False},
                    status=status.HTTP_404_NOT_FOUND,
                )
            image = Image.open(image)
            text = pytesseract.image_to_string(image)
            text = text.encode("ascii", "ignore")
            text = text.decode()
            text = text.strip()
            if not text or len(text)<3:
                return Response(
                    {"message": "Result Found Successfully","result":"random", "success": True},
                    status=status.HTTP_200_OK,
                )
            predtext=[]
            sentence = re.sub('[^a-zA-Z123456789]', ' ', text)
            sentence = sentence.lower()
            sentence = sentence.split()
            sentence = [stemmer.stem(word) for word in sentence if not word in stopwords.words('english')]
            sentence = ' '.join(sentence)
            predtext.append(sentence)
            cv = CountVectorizer(max_features=5000,ngram_range=(1,3))
            Xpredict = cv.fit_transform(predtext).toarray()
            current_shape = Xpredict.shape[1]
            dest_shape = 5000-current_shape
            Xpredict = Xpredict.reshape(current_shape,)
            Xpredict = np.pad(Xpredict, (0, dest_shape), 'constant', constant_values=(0))
            Xpredict = Xpredict.reshape(1,5000)            
            loaded_model = pickle.load(open(filename, 'rb'))
            predtest = loaded_model.predict(Xpredict)
            predict = "positive"
            if not predtest[0]:
                predict="negative"
            print("result")
            print(predict)
            return Response(
                {"message": "Result Found Successfully","result":predict, "success": True},
                status=status.HTTP_200_OK,
            )
        
        except Exception as error:
            return Response(
                {"message": "Something Went Wrong " + str(error), "success": False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
