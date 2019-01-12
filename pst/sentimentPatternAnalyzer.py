from textblob import Textblob
from textblob.classifiers import NaiveBayesClassifier
from textblob import classifiers 

import xlrd
import pandas as pd
import numpy as np 
import math


def getWordList():

    df = pd.read_excel('../../../word_classifier.xlsx')

    df = df.drop(['Unnamed: 2','Unnamed: 3'], axis=1)
    wordList = df.as_matrix()

    wordTraining = list(map(tuple, wordList))
    
    print(wordTraining)

    classifier = NaiveBayesClassifier(wordTraining)

    dt_classifier = classifiers.DecisionTreeClasifier(wordTraining)

    runSentimentClassifier(classifier)

    runSentimentDtClassifier(dt_classifier)

def getTestData():
    return 'I hate everyone and that bitch'

def runSentimentClassifier(classifier): 
    test = Textblob(getTestData(), classifier=classifier)
    print(test, test.classify(), test.sentiment)

def runSentimentDtClassifier(dt_classifier): 
    test = Textblob(getTestData(), classifier=dt_classifier)
    print(test, test.classify(), test.sentiment)

if __name__ == "__main__":
    getWordList()    
