from django.db import models

STATE_CHOICE = ((
    ('Andhra Pradesh' , 'Andhra Pradesh'),
    ('Arunachal Pradesh' , 'Arunachal Pradesh'),
    ('Assam' , 'Assam'),
    ('Bihar' , 'Bihar'),
    ('Chhattisgarh' , 'Chhattisgarh'),
    ('Goa' , 'Goa'),
    ('Gujarat' , 'Gujarat'),
    ('Jharkhand' , 'Jharkhand'),
    ('Karnataka' , 'Karnataka'),
    ('Kerala' , 'Kerala'),
    ('Madhya Pradesh' , 'Madhya Pradesh'),
    ('Maharashtra' , 'Maharashtra'),
    ('Manipur' , 'Manipur'),
    ('Meghalaya' , 'Meghalaya'),
    ('Mizoram' , 'Mizoram'),
    ('Nagaland' , 'Nagaland'),
    ('Odisha' , 'Odisha'),
    ('Punjab' , 'Punjab'),
    ('Rajasthan' , 'Rajasthan'),
    ('Sikkim' , 'Sikkim'),
    ('Tamil Nadu' , 'Tamil Nadu'),
    ('Telangana' , 'Telangana'),
    ('Tripura' , 'Tripura'),
    ('Uttarakhand' , 'Uttarakhand'),
    ('Uttar Pradesh' , 'Uttar Pradesh'),
    ('West Bengal' , 'West Bengal'),
    ))

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    dob = models.DateField(auto_now=False,auto_now_add=False)
    state = models.CharField(choices=STATE_CHOICE, max_length=50)
    gender = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    pimage = models.ImageField(upload_to='pimages', blank=True)
    rdoc = models.FileField(upload_to='rdocs', blank=True)
