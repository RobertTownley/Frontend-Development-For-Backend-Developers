from django.db import models


class Quote(models.Model):
    attribution = models.CharField(max_length=127, default='Will Rogers')
    text = models.TextField()

    def __str__(self):
        return self.text[:50] + ("..." if len(self.text) > 50 else "")
