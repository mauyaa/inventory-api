
---

### 📄 `update.md`
```markdown
# Update Operation

```python
from bookshelf.models import Book

# Retrieve an existing book
book = Book.objects.get(title="1984")

# Update its title
book.title = "Nineteen Eighty-Four"
book.save()

print(book.title)  # Expected output: Nineteen Eighty-Four
