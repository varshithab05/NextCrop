import pandas as pd
import pickle
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

df = pd.read_csv('Crop_Recommendation.csv')
df['Crop'] = df['Crop'].apply(lambda x:0 if x == 'Rice' else 1 if x == 'Maize' else 2 if x == 'Jute' else 3 if x == 'Cotton' else 4 if x == 'Coconut' else 5 if x=='Papaya' else 6 if x=='Orange' else 7 if x == 'Apple' else 8 if x == 'Muskmelon' else 9 if x == 'Watermelon' else 10 if x == 'Grapes' else 11 if x == 'Mango' else 12 if x == 'Banana' else 13 if x == 'Pomegranate' else 14 if x == 'Lentil' else 15 if x == 'Blackgram' else 16 if x == 'MungBean' else 17 if x == 'MothBeans' else 18 if x == 'PigeonPeas' else 19 if x == 'KidneyBeans' else 20 if x == 'ChickPea' else 21 if x == 'Coffee' else 'NULL')

X = df.drop(columns = 'Crop',axis = 1)
Y = df['Crop']

X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size=0.2,random_state=7)

model = XGBClassifier()
model.fit(X_train,Y_train)

pickle.dump(model,open('ml_model.pkl','wb'))