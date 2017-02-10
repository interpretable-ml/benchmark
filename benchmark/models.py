import iml
import sklearn
from sklearn import linear_model
from sklearn import tree
from sklearn import svm
from .datasets import TextData


class TreeClassifierModel(iml.Model):
    def __init__(self):
        self.model = tree.DecisionTreeClassifier(random_state=1)
        self.outNames = None

    def fit(self, data):
        self.model.fit(data.vector_data, data.labels)

    def f(self, instances):
        return self.model.predict_proba(instances)[:,0]

    def support(self, instance):
        #print(instance)
        t = self.model.tree_
        #print("instance", instance.shape)
        nonzero = instance.nonzero()[1]
        #print("nonzero", nonzero, instance.nonzero())
        current = 0
        left_child = t.children_left[current]
        exp = set()
        while left_child != sklearn.tree._tree.TREE_LEAF:
            left_child = t.children_left[current]
            right_child = t.children_right[current]
            f = t.feature[current]
            #print("f", f, instance[0,f])
            if f in nonzero:
                exp.add(f)
            if instance[0,f] < t.threshold[current]:
                current = left_child
            else:
                current = right_child
        return exp

    def full_support(self, instance, current=0, history=[]):

        if self.model.tree_.children_left[current] == sklearn.tree._tree.TREE_LEAF:
            print("current", current, "\t", self.model.tree_.value[current], "\t", history)
            return [float(self.model.tree_.value[current][0][0] > 0)]
        nonzero = instance.nonzero()[1]
        f = self.model.tree_.feature[current]

        left_child = self.model.tree_.children_left[current]
        right_child = self.model.tree_.children_right[current]

        # go down both leaves if this feature is nonzero
        left_values = []
        right_values = []
        if f in nonzero:
            left_values = self.full_support(instance, left_child, history+[(f, 0)])
            right_values = self.full_support(instance, right_child, history+[(f, 1)])
        else:
            if instance[0,f] < self.model.tree_.threshold[current]:
                left_values = self.full_support(instance, left_child, history)
            else:
                right_values = self.full_support(instance, right_child, history)

        return left_values + right_values


def train(benchmark, train_data):
    """ Return a trained model for the given benchmark and training data.
    """
    model_name = benchmark.split('__')[1]

    if model_name == 'tree':
        model = TreeClassifierModel()
        model.fit(train_data)
        return model
