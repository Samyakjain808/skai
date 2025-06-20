from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os

model_path = os.path.join(os.path.dirname(__file__), 'bert_model.pt')

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()
