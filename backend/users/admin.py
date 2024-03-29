from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin 
from django.utils.translation import ugettext_lazy as _

from .models import User, Profile


@admin.register(User)
class UserAdmin(DjangoUserAdmin):

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('facility_code', 'first_name', 'last_name', 'title', 'phone', 'profile_picture', 'joined_on')
    search_fields = ('facility_code',)

admin.site.register(Profile, ProfileAdmin)