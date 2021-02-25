from .db import db

class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  about = db.Column(db.String(500))
  first_name = db.Column(db.String(40))
  last_name = db.Column(db.String(40))
  phone_number = db.Column(db.String(12))
  location = db.Column(db.String(200))
  work = db.Column(db.String(200))
  language = db.Column(db.String(200))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

  user = db.relationship("User", back_populates="profile")

  def to_dict(self):
    return {
      "id": self.id,
      "about": self.about,
      "firstName": self.first_name,
      "lastName": self.last_name,
      "phoneNumber": self.phone_number,
      "location": self.location,
      "work": self.work,
      "language": self.language,
      "userId": self.user_id
    }
