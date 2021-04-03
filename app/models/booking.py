from .db import db

class Booking(db.Model):
  __tablename__ = 'bookings'

  id = db.Column(db.Integer, primary_key=True)
  book_date = db.Column(db.Date, nullable=False)
  book_start_time = db.Column(db.DateTime)
  book_end_time = db.Column(db.DateTime)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  service_id = db.Column(db.Integer, db.ForeignKey("aircrafts.id"), nullable=False)

  user = db.relationship("User", back_populates="booking")
  service = db.relationship("Aircraft", back_populates="booking")

  def to_dict(self):
    return {
      "id": self.id,
      "book_date": self.book_date,
      "book_start_time": self.book_start_time,
      "book_end_time": self.book_end_time,
      "user_id": self.user_id,
      "service_id": self.service_id,
    }

  def to_date_search(self):
    return {
      "id": self.service.id,
      "business_name": self.service.business_name,
      "biz_image": self.service.biz_image,
      "description": self.service.description,
      "aircraft": self.service.aircraft,
      "address": self.service.address,
      "city": self.service.city,
      "state": self.service.state,
      "zip_code": self.service.zip_code,
      "phone_number": self.service.phone_number,
      "lng": self.service.lng,
      "lat": self.service.lat,
    }

  def total_time(self):
    return self.book_end_time - self.book_start_time
