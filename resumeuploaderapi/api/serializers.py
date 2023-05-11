from rest_framework import serializers
from api.models import Profile

class ProfileSerialer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'email', 'dob', 'state', 'gender', 'location', 'pimage', 'rdoc']