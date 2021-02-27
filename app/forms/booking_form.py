from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField

class BookingForm(FlaskForm):
    book_date = StringField('Book Date')
    book_start_time = StringField('Book Start Time')
    book_end_time = StringField('Book End Time')
    user_id = IntegerField('UserId')
    service_id = IntegerField('ServiceId')
