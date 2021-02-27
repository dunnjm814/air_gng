from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField

class ReviewForm(FlaskForm):
    rate = StringField('About')
    title = StringField('First Name')
    comment = StringField('Last Name')
    user_id = StringField('Phone Number')
    service_id = StringField('Location')
