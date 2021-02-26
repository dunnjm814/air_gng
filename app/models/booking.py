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

  def total_time(self):
    return self.book_end_time - self.book_start_time
