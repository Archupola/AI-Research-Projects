import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import ast

# load dataset
data = pd.read_csv("knowledge_graph_generator/data/arxiv_data.csv")

# create graph
G = nx.Graph()

# process first 200 papers (to keep it fast)
for terms in data["terms"].head(200):

    topics = ast.literal_eval(terms)

    # connect each topic with others
    for i in range(len(topics)):
        for j in range(i + 1, len(topics)):
            G.add_edge(topics[i], topics[j])

# draw graph
plt.figure(figsize=(10,8))

nx.draw(
    G,
    with_labels=True,
    node_size=2000,
    node_color="lightblue",
    font_size=10
)

plt.title("AI Research Knowledge Graph")

plt.savefig("knowledge_graph_generator/results/knowledge_graph.png")

plt.show()