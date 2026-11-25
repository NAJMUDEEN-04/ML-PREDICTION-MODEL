from django.db import models

class product_category(models.Model):
    name = models.CharField(max_length = 50)

class product_sub_category(models.Model):
    name = models.CharField(max_length = 50)
    category = models.ForeignKey(product_category, on_delete = models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields = ["name", "category"],
                name = "unique_product_sub_category"
            )
        ]


