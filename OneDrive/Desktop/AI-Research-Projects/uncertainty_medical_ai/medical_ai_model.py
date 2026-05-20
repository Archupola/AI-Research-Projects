import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# load dataset
data = pd.read_csv("uncertainty_medical_ai/data/diabetes.csv")

# features and target
X = data.drop("Outcome", axis=1)
y = data["Outcome"]

# split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# predictions
predictions = model.predict(X_test)

# accuracy
accuracy = accuracy_score(y_test, predictions)
print("Model Accuracy:", accuracy)

# prediction probabilities (confidence)
probabilities = model.predict_proba(X_test)

print("\nSample Predictions with Confidence:\n")

for i in range(5):
    print(
        "Prediction:", predictions[i],
        "Confidence:", max(probabilities[i])
    )