"""
Omnikon / Raksha AI — Train Baseline Phishing Classifier
Trains TF-IDF + Logistic Regression on multilingual phishing samples.

Usage:
    cd backend
    python -m ml.train_baseline
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# Add parent directory to path so imports work
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from config import DATA_DIR, MODELS_DIR, PHISHING_MODEL_PATH
from ml.indic_processor import normalize_indic_text


def load_training_data() -> tuple[list[str], list[str]]:
    """Load and preprocess training samples from JSON."""
    data_path = DATA_DIR / "training_samples.json"
    if not data_path.exists():
        raise FileNotFoundError(f"Training data not found at {data_path}")

    with open(data_path, "r", encoding="utf-8") as f:
        samples = json.load(f)

    texts = [normalize_indic_text(s["text"]) for s in samples]
    labels = [s["label"] for s in samples]

    print(f"Loaded {len(texts)} training samples")

    # Print class distribution
    from collections import Counter
    dist = Counter(labels)
    print("\nClass distribution:")
    for label, count in sorted(dist.items(), key=lambda x: -x[1]):
        print(f"  {label:30s} {count:4d}  ({100*count/len(labels):.1f}%)")

    return texts, labels


def build_pipeline() -> Pipeline:
    """Build TF-IDF + Logistic Regression pipeline."""
    return Pipeline([
        ("tfidf", TfidfVectorizer(
            # Character n-grams capture Indic script patterns
            analyzer="char_wb",
            ngram_range=(2, 5),
            max_features=15000,
            min_df=1,
            max_df=0.95,
            sublinear_tf=True,
            strip_accents=None,     # Preserve Indic characters
            lowercase=False,        # Already handled by normalize_indic_text
        )),
        ("clf", LogisticRegression(
            solver="lbfgs",
            max_iter=1000,
            C=1.0,
            class_weight="balanced",  # Handle class imbalance
            random_state=42,
        )),
    ])


def train():
    """Train the model, evaluate, and save."""
    print("=" * 60)
    print("RAKSHA AI — Training Phishing Baseline Classifier")
    print("Model: TF-IDF (char n-grams) + Logistic Regression")
    print("=" * 60)

    texts, labels = load_training_data()
    pipeline = build_pipeline()

    # Cross-validation
    print("\n-- Cross-Validation (5-fold Stratified) --")
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    try:
        accuracy_scores = cross_val_score(pipeline, texts, labels, cv=cv, scoring="accuracy")
        f1_scores = cross_val_score(pipeline, texts, labels, cv=cv, scoring="f1_macro")
        print(f"  Accuracy: {accuracy_scores.mean():.3f} +/- {accuracy_scores.std():.3f}")
        print(f"  F1 Macro: {f1_scores.mean():.3f} +/- {f1_scores.std():.3f}")
    except Exception as e:
        print(f"  Cross-validation skipped (small dataset): {e}")

    # Train on full dataset
    print("\n-- Training on Full Dataset --")
    pipeline.fit(texts, labels)

    # Classification report on training data
    predictions = pipeline.predict(texts)
    print("\nTraining Set Classification Report:")
    print(classification_report(labels, predictions, zero_division=0))

    # Save model
    MODELS_DIR.mkdir(exist_ok=True)
    joblib.dump(pipeline, PHISHING_MODEL_PATH)
    print(f"\n[OK] Model saved to: {PHISHING_MODEL_PATH}")
    print(f"   Model size: {PHISHING_MODEL_PATH.stat().st_size / 1024:.1f} KB")

    # Quick test
    print("\n-- Quick Inference Tests --")
    test_samples = [
        "Dear Customer, Your BESCOM electricity bill is overdue. Pay now or power will be cut.",
        "Your Flipkart order has been shipped. Track at flipkart.com.",
        "ನಿಮ್ಮ SBI YONO KYC ಅವಧಿ ಮೀರಿದೆ. ತಕ್ಷಣ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ: sbi-update.xyz",
        "Earn ₹5000 daily by liking YouTube videos. Join Telegram @earn_money",
        "I am Inspector from CBI. Your Aadhaar linked to drug case. Digital arrest.",
    ]
    for sample in test_samples:
        normalized = normalize_indic_text(sample)
        pred = pipeline.predict([normalized])[0]
        proba = pipeline.predict_proba([normalized])[0]
        conf = max(proba)
        safe_sample = sample[:70].encode('ascii', errors='replace').decode('ascii')
        print(f"  [{pred:28s}] (conf={conf:.2f}) {safe_sample}...")

    print("\n[OK] Training complete!")


if __name__ == "__main__":
    train()
