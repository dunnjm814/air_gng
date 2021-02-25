from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class ProfileForm(FlaskForm):
    about = StringField('About')
    first_name = StringField('First Name')
    last_name = StringField('Last Name')
    phone_number = StringField('Phone Number')
    location = StringField('Location')
    work = StringField('Work')
    language = StringField('Language')
    submit = SubmitField('Submit')
