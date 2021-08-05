from django.contrib import admin

from shipments.models import Shipping


class ShippingAdmin(admin.ModelAdmin):
    list_display = ('id', 'reset_ids', 'week', 'year', 'facility_code', 'sender', 'tracking_number', 'created_at')
    list_filter = ('week', 'year', 'facility_code')


admin.site.register(Shipping, ShippingAdmin)