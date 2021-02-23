from flask_wtf import FlaskForm
from wtforms import StringField

class ProfileForm(FlaskForm):
    about = StringField('About')
    location = StringField('Location')
    work = StringField('Work')
    language = StringField('Language')
