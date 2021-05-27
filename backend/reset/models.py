from django.db import models


class Par(models.Model):
    # Facility
    facility_code = models.CharField(null=False, max_length=10)

    # Par 
    current_par_qty = models.IntegerField(null=False)
    recommended_par_qty = models.IntegerField(null=False)

    # Meta
    review_date = models.DateField(null=False)

    def __str__(self):
        return f'Par # {self.id}'


class Submission(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateField()
    itemresets = models.ManyToManyField(Par, through='Itemreset')

    week = models.IntegerField(null=False)
    month = models.IntegerField(null=False)
    year = models.IntegerField(null=False)

    def __str__(self):
        return f'Submission # {self.id}'


class Itemreset(models.Model):
    par = models.ForeignKey(Par, on_delete=models.CASCADE)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    last_updated = models.DateField()
    reset_level = models.IntegerField(null=False)
