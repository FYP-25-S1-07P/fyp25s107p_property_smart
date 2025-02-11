from app.init import create_app  # ✅ Correct import

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)