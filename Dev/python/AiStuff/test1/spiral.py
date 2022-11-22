import matplotlib.pyplot as plt
from nnfs.datasets import spiral_data

X, y = spiral_data(samples=100, classes=5)
plt.scatter(X[:, 0], X[:, 1], c=y, cmap="brg")
plt.show()
