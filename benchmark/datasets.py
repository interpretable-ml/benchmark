import os
import random
import re
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer


class TextData():
    def __init__(self, strings, labels, vectorizer):
        self.vectorizer = vectorizer
        self.strings = strings
        self.labels = labels
        self.vector_data = vectorizer.transform(strings)
        self.nsamples = len(self.strings)

def load(task_id):
    """ Takes a task id string and returns the dataset for that task.
    """
    name = task_id.split("__")[2]
    if name == "multi_polarity_books":
        return load_multi_domain_dataset(os.path.join("datasets", "mdredze_sentiment", "books"))


def load_multi_domain_dataset(data_path, remove_bigrams=True):
    """ Adapted from lime-experiments
    """
    random.seed(1)
    pos = []
    neg = []
    def get_words(line, remove_bigrams=True):
        z = [tuple(x.split(':')) for x in re.findall('\w*?:\d', line)]
        if remove_bigrams:
            z = ' '.join([' '.join([x[0]] * int(x[1])) for x in z if '_' not in x[0]])
        else:
            z = ' '.join([' '.join([x[0]] * int(x[1])) for x in z])
        return z
    for line in open(os.path.join(data_path, 'negative.review')):
        neg.append(get_words(line, remove_bigrams))
    for line in open(os.path.join(data_path, 'positive.review')):
        pos.append(get_words(line, remove_bigrams))
    random.shuffle(pos)
    random.shuffle(neg)
    split_pos = int(len(pos) * .8)
    split_neg = int(len(neg) * .8)
    train_data = pos[:split_pos] + neg[:split_neg]
    test_data = pos[split_pos:] + neg[split_neg:]
    train_labels = [1] * len(pos[:split_pos]) + [0] * len(neg[:split_neg])
    test_labels = [1] * len(pos[split_pos:]) + [0] * len(neg[split_neg:])

    vectorizer = CountVectorizer(lowercase=False, binary=True)
    vectorizer.fit(train_data)

    return TextData(train_data, train_labels, vectorizer), TextData(test_data, test_labels, vectorizer)
    #return train_data, np.array(train_labels), test_data, np.array(test_labels), ['neg', 'pos']
