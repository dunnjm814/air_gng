from .db import db

class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  about = db.Column(db.String(500))
  location = db.Column(db.String(200))
  work = db.Column(db.String(200))
  language = db.Column(db.String(200))
  user_id = db.Colum(db.Integer, db.ForeignKey("User.id"))

  user = db.relationshop("User", back_populates="profile")
