from .db import db

class Aircraft(db.Model):
  __tablename__ = 'aircrafts'

  id = db.Column(db.Integer, primary_key=True)
  business_name = db.Column(db.String(100), nullable=False)
  biz_image = db.Column(db.String, nullable=False)
  description = db.Column(db.String(500))
  aircraft = db.Column(db.String(25), nullable=False)
  address = db.Column(db.String(75), nullable=False)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(2), nullable=False)
  zip_code = db.Column(db.Integer, nullable=False)
  phone_number = db.Column(db.String(12), nullable=False, unique=True)
  lng = db.Column(db.Float, nullable=False)
  lat = db.Column(db.Float, nullable=False)

  booking = db.relationship("Booking", back_populates="service")
  review = db.relationship("Review", back_populates="service")
  wish_list = db.relationship("Wishlist", back_populates="service")

  def to_dict(self):
    return {
      "id": self.id,
    }
