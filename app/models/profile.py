from .db import db

class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  about = db.Column(db.String(500))
  location = db.Column(db.String(200))
  work = db.Column(db.String(200))
  language = db.Column(db.String(200))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

  user = db.relationship("User", back_populates="profile")
