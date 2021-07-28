from django.contrib import admin
from .models import Par, Itemreset


class ParAdmin(admin.ModelAdmin):
    list_display = ('id', 'facility_code', 'location_id', 'location_name', 'mfr', 'imms', 'description', 'ext_delta', 'review_date')
    list_filter = ('review_date', 'facility_code')


class ItemresetAdmin(admin.ModelAdmin):
    list_display = ('id', 'par', 'user', 'reset_level', 'send_back_confirmed', 'week', 'year', 'last_updated')
    list_filter = ('user', 'week')

admin.site.register(Par, ParAdmin)
admin.site.register(Itemreset, ItemresetAdmin)
