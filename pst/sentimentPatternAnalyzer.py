from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier
from textblob.classifiers import DecisionTreeClassifier
from textblob import classifiers 
from textblob.sentiments import NaiveBayesAnalyzer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nltk
import pandas as pd
import numpy as np 
import math

import re 

def getWordList():

    df = pd.read_excel('../../../word_classifier.xlsx')

    df = df.drop(['Unnamed: 2','Unnamed: 3'], axis=1)
    wordList = df.as_matrix()

    wordTraining = list(map(tuple, wordList))

    # nltk.download('movie_reviews')
    # nltk.download('punkt')

    classifier = NaiveBayesClassifier(wordTraining)
    #classifier = NaiveBayesAnalyzer

    print(classifier)

    dt_classifier = DecisionTreeClassifier(wordTraining)

    runSentimentClassifier(classifier)

    runSentimentDtClassifier(dt_classifier)

def getTestData():
    df = pd.read_excel('../../../tweet_sample.xlsx')
    
    tweetList = df.as_matrix()

    tweetTraining = list(map(tuple, tweetList))
    tweetTraining = tweetTraining

    #print(tweetTraining)

    return tweetTraining

def getAccuracy():
    testing = [
        ('fuck that stupid woman cunt', 'neg'),
        ('I am going to set that girly bitch on fire', 'neg'),
        ('everything about her is amazing', 'pos'),
        ('bitch on fire', 'neg'),
        ('bitch', 'neg'),
        ('dumb bitch', 'neg'),
        ('old bitch', 'neg'),
        ("she's a bad bitch", 'pos'),
        ('what a boss', 'pos'),
        ('rape', 'neg'),
        ('i will rape that bitch', 'neg'),
        ('revenge porn', 'neg'),
        ('that bitch is delusional', 'neg'),
        ]
    return testing    

def runSentimentClassifier(classifier): 
    for test in getTestData():
        testStr = "".join(test)
        print(testStr)
        cleanStr=clean_tweet(testStr)
        print(cleanStr)
        cleanStr = TextBlob(cleanStr, classifier=classifier)
        #cleanStr.classify(), cleanStr.sentiment
        classifier.accuracy(getAccuracy())
        classifier.update(getAccuracy())
        print(classifier.accuracy(getAccuracy()))
    print(classifier.show_informative_features(5))

def runSentimentClassifierTest(classifier, text): 
        print(text)
        cleanStr=clean_tweet(text)
        print(cleanStr)
        cleanStr = TextBlob(cleanStr, classifier=classifier)
        print(cleanStr.classify(), cleanStr.sentiment)
        classifier.accuracy(getAccuracy())
        classifier.update(getAccuracy())
        print(classifier.accuracy(getAccuracy()))
        print(classifier.show_informative_features(5))   

def runSentimentClassifierTweets():
    getWordList()  

def runSentimentDtClassifier(dt_classifier):
    for test in getTestData(): 
        print(test)
        testStr = "".join(test)
        cleanStr=clean_tweet(testStr)
        print(cleanStr)
        cleanStr = TextBlob(cleanStr, classifier=dt_classifier)
        print(cleanStr.classify(), cleanStr.sentiment)

def clean_tweet(test):
    '''
    Utility function to clean the text in a tweet by removing 
    links and special characters using regex.
    '''
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", test).split())

if __name__ == "__main__":
    # from textblob import TextBlob
    # from textblob.classifiers import NaiveBayesClassifier
    # from textblob.classifiers import DecisionTreeClassifier
    # from textblob import classifiers 
    # import nltk
    # from textblob.sentiments import NaiveBayesAnalyzer
    # from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    getWordList()
 
