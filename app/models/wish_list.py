from .db import db

class Wishlist(db.Model):
  __tablename__ = 'wish_list'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.Text)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  service_id = db.Column(db.Integer, db.ForeignKey("aircrafts.id"), nullable=False)

  user = db.relationship("User", back_populates="wish_list")
  service = db.relationship("Aircraft", back_populates="wish_list")

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "user_id": self.user_id,
      "service_id": self.service_id,
    }
