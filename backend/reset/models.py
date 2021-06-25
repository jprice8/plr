from django.db import models
from django.db.models.aggregates import Max
from django.conf import settings


class Par(models.Model):
    # Facility
    facility_code = models.CharField(null=False, max_length=10)

    # Location
    location_id = models.CharField(null=False, max_length=50)
    location_name = models.CharField(null=False, max_length=150)

    # Item
    description = models.CharField(null=False, max_length=250)
    imms = models.CharField(null=False, max_length=50)
    uom_conv_factor = models.IntegerField(null=False)
    uom = models.CharField(null=False, max_length=50)
    wt_avg_cost = models.FloatField(null=False)
    unit_cost = models.FloatField(null=False)
    dept_id = models.CharField(null=False, max_length=50)
    mfr = models.CharField(null=False, max_length=250, default='Medline')

    # Par 
    current_par_qty = models.IntegerField(null=False)
    recommended_par_qty = models.IntegerField(null=False)
    qty_delta = models.IntegerField(null=False)
    ext_delta = models.FloatField(null=False)

    # adjustments_52_weeks = models.IntegerField(null=False)
    # issues_52_weeks = models.IntegerField(null=False)
    expense_account_no = models.CharField(null=False, max_length=100)

    # awa = models.IntegerField(null=False)
    # awi = models.IntegerField(null=False)
    # safety = models.IntegerField(null=False)

    # Meta
    review_date = models.DateField(null=False)

    class Meta:
        ordering = ['-review_date', '-ext_delta', 'id']

    def __str__(self):
        return f'Par # {self.id}, cur: {self.current_par_qty}, rec: {self.recommended_par_qty}'
					

class Itemreset(models.Model):
    par = models.OneToOneField(Par, related_name='itemresets', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    last_updated = models.DateField(auto_now=True)
    reset_level = models.IntegerField(null=False)

    week = models.IntegerField(null=False)
    month = models.IntegerField(null=False)
    year = models.IntegerField(null=False)

    class Meta:
        ordering = ['-week', 'id']

    def __str__(self):
        return f'Itemreset ID {self.id} for Par ID {self.par.id}, week {self.week}'

    def calc_reduction_qty(self):
        reduction_qty = self.par.current_par_qty - self.reset_level
        return reduction_qty

    def calc_ext_reduction(self):
        reduction_qty = self.par.current_par_qty - self.reset_level
        ext = self.par.unit_cost * reduction_qty
        return ext
