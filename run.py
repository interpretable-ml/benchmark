"""
Based on the evaluator from https://github.com/marcotcr/lime-experiments

Must be run from the current directory.
"""


import argparse
from benchmark import datasets
from benchmark import models
from benchmark import explainers
from benchmark import tasks
import numpy as np
from sklearn import tree

parser = argparse.ArgumentParser(description='Benchmark interpretable machine learning algorithms.')
all_benchmarks = [
    'sparse_recover__tree__multi_polarity_books'
]
parser.add_argument('--benchmarks', type=str, nargs='*', default=all_benchmarks, help='benchmarks:\n'+'\n'.join(all_benchmarks))
all_explainers = [
    'esvalues'
]
parser.add_argument('--explainers', type=str, nargs='*', default=all_explainers, help='explainer methods:\n'+'\n'.join(all_explainers))
args = parser.parse_args()

for benchmark in args.benchmarks:
    print('\n\nRunning benchmark {benchmark}...'.format(benchmark=benchmark))
    train_data,test_data = datasets.load(benchmark)
    model = models.train(benchmark, train_data)
    print(train_data.labels[0:10])
    print("train_data.shape = ",train_data.vector_data.shape)
    print(model.f(train_data.vector_data.toarray()[0:100,:]))

    if False:
        import pydotplus
        dot_data = tree.export_graphviz(model.model, out_file="test.dot", class_names=['a', 'b'])
        with open('test.dot', 'r') as myfile:
            dot_data=myfile.read()
        graph = pydotplus.graph_from_dot_data(dot_data)
        graph.write_pdf("iris.pdf")

    def get_object(explainer_name):
        if explainer_name == "esvalues":
            ex = explainers.ESExplainer(model, np.zeros((1, train_data.vector_data.shape[1])), nsamples=77*2+2+10) # , nsamples=15000
            ex.name = "esvalues"
            return ex
        elif explainer_name == "linear_lime":
            return explainers.LinearLimeExplainer(model, train_data)

    explainers = list(map(get_object, args.explainers))

    tasks.evaluate(benchmark, explainers, model, test_data)
