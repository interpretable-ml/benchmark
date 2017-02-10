import numpy as np
import copy


def evaluate(benchmark, explainers, model, test_data):
    task_name = benchmark.split('__')[0]

    if task_name == 'sparse_recover':



        # compute the average overlap of support between the explaination and the true model
        average_overlap = np.zeros(len(explainers))
        n = 12
        for i in range(11,n): # test_data.nsamples
            print("\n",i)
            instance = test_data.vector_data[i:i+1,:].toarray()
            true_support = model.support(instance)
            full_support = model.full_support(instance)
            if np.var(full_support) < 1e-8:
                print("no variance")
            instance2 = copy.deepcopy(instance)
            instance2[0,list(true_support)] = 0
            # instance2[0,1723] = 0
            # instance2[0,12067] = 0
            # instance3 = copy.deepcopy(instance)
            # instance3[0,1923] = 1
            # #print("a")
            # model.support(instance2)
            print("\ntrue_support", true_support, model.f(instance), model.f(instance2))
            if len(true_support) == 0 or len(true_support) > 10: continue
            for j,explainer in enumerate(explainers):
                #print(type(instance))
                #print("instance.shape", instance.shape, instance.size)
                #print(instance)
                e = explainer.explain(instance)
                #print("len(instance.nonzero()[1]) = ", len(instance.nonzero()[1]))
                #e.effects[instance.nonzero()[1]] += 0.0001
                print("nonzero = ", len(instance.nonzero()[1]))
                sorted_effects = np.argsort(np.abs(e.effects))
                print(np.argsort(np.abs(e.effects))[-6:], e.effects[np.argsort(np.abs(e.effects))][-6:])

                for i in range(100):
                    print(sorted_effects[-i-1], e.effects[sorted_effects[-i-1]])

                for i in range(6):
                    instance3 = copy.deepcopy(instance)
                    instance3[0,np.argsort(np.abs(e.effects))[-i-1]] = 0
                    print(i, " = ", model.f(instance3))

                estimated_support = np.argsort(np.abs(e.effects))[-10:]
                #print("estimated_support", estimated_support)
                overlap = float(len(set(estimated_support).intersection(true_support))) / len(true_support)
                print(overlap)
                average_overlap[j] += overlap
        for j,explainer in enumerate(explainers):
            average_overlap[j] /= n

        # print out the results
        print("benchmark "+benchmark)
        for i,explainer in enumerate(explainers):
            print("{ename} has a mean support accuracy of {overlap}".format(ename=explainer.name, overlap=average_overlap[i]))
