def preprocess_text(text, tokenizer):
    return tokenizer(text, return_tensors="pt", truncation=True, padding=True)
